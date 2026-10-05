import { describe, expect, it } from 'vitest'
import { AMIT_NUMBER, amitLink, briefMessage, hasBrief, messageFor, tagFor, whatsappLink } from './amit.ts'

describe('amit', () => {
  it('writes the first message for where the visitor clicked', () => {
    const msg = messageFor('jobs')
    expect(msg).toMatch(/^Hi Amit, /)
    expect(msg).toContain('take a first job off my plate')
    expect(msg).toMatch(/ref: jobs$/)
  })

  it('falls back to a general message for unknown places', () => {
    const msg = messageFor('')
    expect(msg).toContain('talk to Eigi')
    expect(msg).toMatch(/ref: site$/)
  })

  it('adds an extra detail after the intent', () => {
    const msg = messageFor('familiar', 'The one that hurts most: Follow-ups.')
    expect(msg).toContain('fits in my business. The one that hurts most: Follow-ups.')
  })

  it('makes short ref tags', () => {
    expect(tagFor('First jobs')).toBe('first-jobs')
    expect(tagFor('  Camp II! ')).toBe('camp-ii')
  })

  it('builds a wa.me link with the message encoded', () => {
    const url = whatsappLink('Hi Amit & team')
    expect(url).toBe(`https://wa.me/${AMIT_NUMBER}?text=Hi%20Amit%20%26%20team`)
    expect(amitLink('hero')).toContain(encodeURIComponent('ref: hero'))
  })
})

describe('brief for Amit', () => {
  it('writes everything the visitor told us into one message', () => {
    const msg = briefMessage({ task: 'Chasing unpaid invoices.', pains: ['Follow-ups', 'Your week'], hours: 17 })
    expect(msg).toContain('What’s eating my week: Chasing unpaid invoices.')
    expect(msg).toContain('These sound familiar: Follow-ups, Your week (about 17 hours a week).')
    expect(msg).toMatch(/Where should we start\?\n\nref: brief$/)
  })

  it('leaves out what the visitor didn’t tell us', () => {
    const msg = briefMessage({ task: '  ', pains: ['Tools'], hours: 5 })
    expect(msg).not.toContain('eating my week')
    expect(hasBrief({ task: ' ', pains: [], hours: 0 })).toBe(false)
    expect(hasBrief({ task: 'x', pains: [], hours: 0 })).toBe(true)
  })
})
