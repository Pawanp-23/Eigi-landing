import { describe, expect, it } from 'vitest'
import { AMIT_NUMBER, messageFor, tagFor, whatsappLink } from './amit.ts'

describe('amit', () => {
  it('writes the first message from where the visitor is', () => {
    const msg = messageFor('Camp II', '3,400 m')
    expect(msg).toContain("I'm at Camp II (3,400 m)")
    expect(msg).toContain('wire agents into the tools')
    expect(msg).toMatch(/ref: camp-ii$/)
  })

  it('reads places naturally and skips the place for non-places', () => {
    expect(messageFor('Base camp', '0 m')).toContain("I'm at base camp (0 m)")
    expect(messageFor('Summit', '8,848 m')).toContain("I'm at the summit (8,848 m)")
    const stand = messageFor('Where we stand', '1,347 m')
    expect(stand).not.toContain("I'm at")
    expect(stand).toContain('I would like a sherpa instead')
  })

  it('falls back to a general message for unknown places', () => {
    const msg = messageFor('', '8,848 m')
    expect(msg).toContain('talk to Eigi')
    expect(msg).not.toContain("I'm at")
    expect(msg).toMatch(/ref: site$/)
  })

  it('makes short ref tags', () => {
    expect(tagFor('With your sherpa')).toBe('with-your-sherpa')
  })

  it('builds a wa.me link with the message encoded', () => {
    const link = whatsappLink('Hi Amit, ref: x')
    expect(link.startsWith(`https://wa.me/${AMIT_NUMBER}?text=`)).toBe(true)
    expect(decodeURIComponent(link.split('text=')[1])).toBe('Hi Amit, ref: x')
  })
})
