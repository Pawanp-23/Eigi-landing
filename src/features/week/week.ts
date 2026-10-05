import { PAINS, WEEK } from '../../content/story.ts'

/** A block on one day: a pain eating the hours, or (area null) time left to build. */
export interface Block {
  area: string | null
  hours: number
}

export const WEEK_HOURS = WEEK.days.length * WEEK.hoursPerDay

const hoursOf = (area: string) => PAINS.find((p) => p.area === area)?.hours ?? 0

/** Hours the picked pains take out of the week, capped at the week itself. */
export const hoursTaken = (picked: readonly string[]) => Math.min(WEEK_HOURS, picked.reduce((sum, a) => sum + hoursOf(a), 0))

/**
 * Lays the picked pains into the week like calendar events: in the order they were picked,
 * filling Monday from the top, spilling into Tuesday, and so on. Whatever is left is build time.
 */
export function layWeek(picked: readonly string[]): Block[][] {
  const days: Block[][] = WEEK.days.map(() => [])
  let day = 0
  let free = WEEK.hoursPerDay
  for (const area of picked) {
    let left = hoursOf(area)
    while (left > 0 && day < days.length) {
      const take = Math.min(left, free)
      days[day].push({ area, hours: take })
      left -= take
      free -= take
      if (free === 0) {
        day += 1
        free = WEEK.hoursPerDay
      }
    }
  }
  return days.map((blocks) => {
    const used = blocks.reduce((s, b) => s + b.hours, 0)
    return used < WEEK.hoursPerDay ? [...blocks, { area: null, hours: WEEK.hoursPerDay - used }] : blocks
  })
}
