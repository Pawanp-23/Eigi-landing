import { describe, expect, it } from 'vitest'
import * as climb from './climb.ts'
import * as computer from './computer.ts'
import * as gateway from './gateway.ts'
import * as hero from './hero.ts'
import * as people from './people.ts'
import * as plate from './plate.ts'
import * as site from './site.ts'
import * as stories from './stories.ts'
import * as why from './why.ts'
import { roleFor, SCRIPTS, scriptFor } from './hero.ts'
import { JOBS } from './plate.ts'
import { buddy } from './site.ts'
import { CUSTOMER_STOPS, eigisFor, hiresFor } from './why.ts'

/** Every string in the page copy, wherever it's nested. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings)
  return []
}

const copy = [climb, computer, gateway, hero, people, plate, site, stories, why].flatMap(m => strings(Object.values(m)))

describe('page copy', () => {
  it('has copy to check', () => expect(copy.length).toBeGreaterThan(150))

  it('never uses em dashes (house style)', () => expect(copy.filter(s => s.includes('—'))).toEqual([]))

  it('has no leftover placeholders', () => expect(copy.filter(s => /lorem|TODO|TBD|xxx/i.test(s))).toEqual([]))

  it('names the community Gondia, never the old spelling', () => {
    expect(copy.filter(s => /khundia/i.test(s))).toEqual([])
    expect(copy.some(s => s.includes('Gondia'))).toBe(true)
  })
})

describe('the trap: one Eigi for every ten customers', () => {
  it('maps each slider stop to the right number of Eigis', () => {
    expect(CUSTOMER_STOPS.map(eigisFor)).toEqual([1, 2, 3, 4])
  })

  it('hiring grows faster than Eigis at every stop', () => {
    for (const c of CUSTOMER_STOPS) expect(hiresFor(c)).toBeGreaterThan(eigisFor(c))
  })
})

describe('handing a job to an Eigi', () => {
  it.each([
    ['Chase overdue invoices from Acme', 'finance'],
    ['Reply to every new lead today', 'sales'],
    ['Answer the customer questions in Discord', 'support'],
    ['Book the supplier meeting', 'ops'],
    ['Something nobody planned for', 'ops'],
  ])('routes “%s” to %s', (task, role) => expect(roleFor(task)).toBe(role))

  it('uses the written script for an example job', () => {
    for (const s of SCRIPTS) expect(scriptFor(s.ask)).toBe(s)
  })

  it('builds an illustrative script for anything typed', () => {
    const s = scriptFor('Chase overdue invoices from Acme')
    expect(s.role).toBe('finance')
    expect(s.steps).toHaveLength(4)
    expect(s.approval).toMatch(/your name/)
  })

  it('gives every Eigi exactly three first jobs on the plate', () => {
    const count = (r: string) => JOBS.filter(j => j.role === r).length
    expect(['ops', 'support', 'sales', 'finance'].map(count)).toEqual([3, 3, 3, 3])
  })
})

describe('Buddy links', () => {
  it('open WhatsApp with the message and a section tag already written', () => {
    const url = new URL(buddy('I want to start.', 'hero'))
    expect(url.origin).toBe('https://wa.me')
    expect(url.searchParams.get('text')).toBe('Hi Buddy, I want to start.\n\nref: hero')
  })
})
