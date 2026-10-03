import { describe, expect, it } from 'vitest'
import { CREW, MISSIONS, RULES, logLine, timeline } from './crew.ts'

describe('crew', () => {
  it('has one mission per crew member', () => {
    for (const c of CREW) expect(MISSIONS[c.id].steps.length).toBeGreaterThan(0)
  })

  it('plays a transmission in order: ask, working, steps, reply, done', () => {
    const t = timeline(MISSIONS.staff)
    expect(t.ask).toBeLessThan(t.working)
    expect(t.working).toBeLessThan(t.steps[0])
    for (let i = 1; i < t.steps.length; i++) expect(t.steps[i]).toBeGreaterThan(t.steps[i - 1])
    expect(t.reply).toBeGreaterThan(t.steps[t.steps.length - 1])
    expect(t.done).toBe(t.reply + MISSIONS.staff.reply.length * t.typeMs)
  })

  it('logs free climbs as done and belayed actions as waiting', () => {
    const email = RULES.find((r) => r.id === 'email')!
    expect(logLine(email, 'free')).toBe('Chief of Sales emailed Initech. Logged.')
    expect(logLine(email, 'belay')).toBe('Chief of Sales drafted an email to Initech. Waiting for your OK.')
  })

  it('belays anything that goes out in your name by default', () => {
    const byId = Object.fromEntries(RULES.map((r) => [r.id, r.defaultMode]))
    expect(byId.email).toBe('belay')
    expect(byId.spend).toBe('belay')
    expect(byId.draft).toBe('free')
  })
})
