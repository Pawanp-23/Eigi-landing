import { describe, expect, it } from 'vitest'
import * as computer from './computer.ts'
import * as eigi from './eigi.ts'
import * as faq from './faq.ts'
import * as hero from './hero.ts'
import * as people from './people.ts'
import * as site from './site.ts'
import * as story from './story.ts'

/** Every string in the page copy, wherever it's nested. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings)
  return []
}

const copy = [computer, eigi, faq, hero, people, site, story].flatMap((m) => strings(Object.values(m)))

describe('page copy', () => {
  it('has copy to check', () => {
    expect(copy.length).toBeGreaterThan(100)
  })

  it('never uses em dashes (house style)', () => {
    expect(copy.filter((s) => s.includes('—'))).toEqual([])
  })

  it('has no leftover placeholders', () => {
    expect(copy.filter((s) => /lorem|TODO|TBD|xxx/i.test(s))).toEqual([])
  })
})
