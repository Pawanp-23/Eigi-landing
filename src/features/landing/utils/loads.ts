/*
 * "What's heaviest this week?": the loads a founder can hand to Sherpie in the hero.
 * Each one personalises the rest of the climb: which field test opens, which crew member is on air,
 * what Sherpie's pack says, and how Amit's first message reads. Pure data, no DOM.
 */
import type { CrewId } from './crew.ts'

export type LoadId = 'support' | 'sales' | 'hiring' | 'admin' | 'content'

export type Load = {
  id: LoadId
  /** The chip in the hero. */
  chip: string
  /** Printed on Sherpie's pack. */
  tag: string
  /** How the visitor says it: "the heaviest thing this week is ___". */
  phrase: string
  /** How Sherpie says it back to them. */
  yours: string
  /** Which field-test tab and crew member to open with. */
  fieldTest: number
  crew: CrewId
}

export const LOADS: Load[] = [
  { id: 'support', chip: 'Support inbox', tag: 'SUPPORT', phrase: 'my support inbox', yours: 'your support inbox', fieldTest: 0, crew: 'staff' },
  { id: 'sales', chip: 'Sales follow-ups', tag: 'FOLLOW-UPS', phrase: 'sales follow-ups', yours: 'your sales follow-ups', fieldTest: 1, crew: 'sales' },
  { id: 'hiring', chip: 'Hiring my first ops person', tag: 'FIRST HIRE', phrase: 'hiring my first ops person', yours: 'the hunt for your first ops hire', fieldTest: 2, crew: 'ops' },
  { id: 'admin', chip: 'Invoices & admin', tag: 'ADMIN', phrase: 'invoices and admin', yours: 'your invoices and admin', fieldTest: 2, crew: 'ops' },
  { id: 'content', chip: 'Content & socials', tag: 'CONTENT', phrase: 'content and socials', yours: 'your content and socials', fieldTest: 1, crew: 'marketing' },
]

export const loadById = (id: LoadId | null | undefined) => LOADS.find((l) => l.id === id) ?? null

/** The sentence added to Amit's first message once a load is chosen. */
export const loadLine = (load: Load | null) => (load ? `The heaviest thing this week is ${load.phrase}.` : '')
