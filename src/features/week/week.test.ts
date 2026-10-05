import { describe, expect, it } from 'vitest'
import { PAINS, WEEK } from '../../content/story.ts'
import { WEEK_HOURS, hoursTaken, layWeek } from './week.ts'

const total = (days: ReturnType<typeof layWeek>) => days.flat().reduce((s, b) => s + b.hours, 0)

describe('your week', () => {
  it('is all build time when nothing is picked', () => {
    const days = layWeek([])
    expect(days).toHaveLength(WEEK.days.length)
    expect(days.every((d) => d.length === 1 && d[0].area === null && d[0].hours === WEEK.hoursPerDay)).toBe(true)
    expect(hoursTaken([])).toBe(0)
  })

  it('always adds up to exactly one week', () => {
    for (let n = 0; n <= PAINS.length; n++) {
      const picked = PAINS.slice(0, n).map((p) => p.area)
      expect(total(layWeek(picked))).toBe(WEEK_HOURS)
    }
  })

  it('spills a pain into the next day like a calendar', () => {
    // Your week (9h) fills Monday and takes the first hour of Tuesday
    const [mon, tue] = layWeek(['Your week'])
    expect(mon).toEqual([{ area: 'Your week', hours: 8 }])
    expect(tue[0]).toEqual({ area: 'Your week', hours: 1 })
    expect(hoursTaken(['Your week'])).toBe(9)
  })

  it('keeps the order things were picked in', () => {
    const [mon] = layWeek(['Tools', 'Hiring'])
    expect(mon.map((b) => b.area)).toEqual(['Tools', 'Hiring'])
  })

  it('never takes more than the week', () => {
    expect(hoursTaken(PAINS.map((p) => p.area))).toBeLessThanOrEqual(WEEK_HOURS)
  })
})
