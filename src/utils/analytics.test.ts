import { describe, expect, it } from 'vitest'
import { buddy } from '../pages/LandingPage/content/site.ts'
import { refFrom } from './analytics.ts'

describe('which section a WhatsApp click came from', () => {
  it('reads the section tag from a Buddy link', () => {
    expect(refFrom(buddy('I want to start using AI in my business.', 'footer'))).toBe('footer')
  })

  it('survives messages with a % in them (visitors type these into the hero)', () => {
    expect(refFrom(buddy('I would like an Eigi to do this for real: Increase sales by 10%', 'hero-try'))).toBe('hero-try')
    expect(refFrom(buddy('Cut 100% of the busywork, 50 % faster', 'why'))).toBe('why')
  })

  it('falls back to "unknown" instead of failing', () => {
    expect(refFrom('https://wa.me/919225299611')).toBe('unknown')
    expect(refFrom('not a url')).toBe('unknown')
  })
})
