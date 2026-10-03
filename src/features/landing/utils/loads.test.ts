import { describe, expect, it } from 'vitest'
import { CREW } from './crew.ts'
import { LOADS, loadById, loadLine } from './loads.ts'

describe('loads', () => {
  it('maps every load to a real crew member and field test', () => {
    const crew = new Set(CREW.map((c) => c.id))
    for (const l of LOADS) {
      expect(crew.has(l.crew)).toBe(true)
      expect(l.fieldTest).toBeGreaterThanOrEqual(0)
      expect(l.fieldTest).toBeLessThan(3)
      expect(l.tag.length).toBeLessThanOrEqual(10) // fits on the pack label
    }
  })

  it('finds a load by id, or nothing', () => {
    expect(loadById('sales')?.chip).toBe('Sales follow-ups')
    expect(loadById(null)).toBeNull()
  })

  it('lets Sherpie say it back in the second person', () => {
    for (const l of LOADS) expect(l.yours).not.toMatch(/\bmy\b/)
  })

  it('writes the line for Amit', () => {
    expect(loadLine(loadById('support'))).toBe('The heaviest thing this week is my support inbox.')
    expect(loadLine(null)).toBe('')
  })
})
