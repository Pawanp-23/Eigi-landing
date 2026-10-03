import { describe, expect, it } from 'vitest'
import { beatFor } from './companion.ts'
import { loadById } from './loads.ts'

describe('companion beats', () => {
  const support = loadById('support')

  it('carries the visitor’s pack once they have chosen a load', () => {
    expect(beatFor('Camp II', support).pose.pack).toBe('SUPPORT')
    expect(beatFor('Camp II', support).line).toContain('support pack')
    expect(beatFor('Camp II', null).pose.pack).toBeUndefined()
  })

  it('hands the pack over at the summit', () => {
    expect(beatFor('Summit', support).pose.give).toBe('SUPPORT')
    expect(beatFor('Summit', null).pose.arms).toBe('cheer')
  })

  it('sits down to rest back at base camp', () => {
    expect(beatFor('Back at base camp', null).pose.legs).toBe('sit')
  })

  it('has a line for every stage, falling back gracefully', () => {
    for (const s of ['The problem', 'Where we stand', 'Eigi stories', 'The gateway', 'Field test', 'With your sherpa', 'Questions', 'Somewhere new']) {
      expect(beatFor(s, null).line.length).toBeGreaterThan(0)
    }
  })
})
