/*
 * Eigi Computer: the AI crew (an AI C-suite) and the illustrative missions they run, plus the belay
 * rules that decide what they may do alone. Pure data and logic; the playback lives in useTransmission.
 */

export type CrewId = 'staff' | 'sales' | 'marketing' | 'ops'

export const CREW: { id: CrewId; role: string; call: string; mission: string }[] = [
  { id: 'staff', role: 'Chief of Staff', call: 'CS', mission: 'Morning brief' },
  { id: 'sales', role: 'Chief of Sales', call: 'SL', mission: 'Follow-ups' },
  { id: 'marketing', role: 'Chief of Marketing', call: 'MK', mission: 'Launch' },
  { id: 'ops', role: 'Chief of Operations', call: 'OP', mission: 'Month-end' },
]

/** One radio exchange: you ask, the crew member works (steps), then reports back. */
export type Transmission = { time: string; ask: string; steps: string[]; replyTime: string; reply: string }

export const MISSIONS: Record<CrewId, Transmission> = {
  staff: {
    time: '09:41', ask: 'Morning. What actually needs me today?',
    steps: ['Sorted 38 new emails', 'Checked today’s calendar', 'Drafted the replies you owe'],
    replyTime: '09:44',
    reply: 'Two things need you. Globex wants a quote by Friday, and your 2 PM clashes with the investor call. I sorted the rest and drafted three replies for you to check.',
  },
  sales: {
    time: '11:02', ask: 'Who has gone quiet this week?',
    steps: ['Checked the pipeline', 'Found 4 deals with no reply in 7 days', 'Drafted a follow-up for each, in your voice'],
    replyTime: '11:05',
    reply: 'Four deals went quiet. Initech looks warmest, so their follow-up is first. All four drafts are waiting for your OK.',
  },
  marketing: {
    time: '14:20', ask: 'We launch Thursday. Are we ready?',
    steps: ['Reviewed the launch brief', 'Wrote the announcement and three posts', 'Queued them for Thursday, 9 AM'],
    replyTime: '14:26',
    reply: 'Copy is drafted and the posts are queued. One gap: the pricing page still shows last year’s plans. Want me to flag it to Operations?',
  },
  ops: {
    time: '17:30', ask: 'Can we close the month by Friday?',
    steps: ['Matched 112 invoices to orders', 'Chased 3 missing receipts', 'Prepared the close checklist'],
    replyTime: '17:34',
    reply: 'We are on track for Friday. Three receipts are still missing, so I emailed the owners and set reminders. Everything else is reconciled and logged.',
  },
}

/**
 * Playback timeline for one transmission, in ms from the start: when each part appears.
 * The reply is typed out at `typeMs` per character.
 */
export function timeline(t: Transmission, typeMs = 14) {
  const ask = 0
  const working = 900
  const steps = t.steps.map((_, i) => working + 700 + i * 650)
  const reply = steps[steps.length - 1] + 900
  const done = reply + t.reply.length * typeMs
  return { ask, working, steps, reply, typeMs, done }
}

/* ---------- belay rules: what the crew may do alone ---------- */

export type Mode = 'free' | 'belay'

export const RULES: { id: string; action: string; who: string; did: string; drafted: string; defaultMode: Mode }[] = [
  { id: 'lookup', action: 'Look things up in memory', who: 'Chief of Staff', did: 'looked up last quarter’s numbers', drafted: 'wants to look up last quarter’s numbers', defaultMode: 'free' },
  { id: 'draft', action: 'Write a draft', who: 'Chief of Marketing', did: 'wrote a draft of the launch post', drafted: 'wants to write a draft of the launch post', defaultMode: 'free' },
  { id: 'form', action: 'Submit a form in the browser', who: 'Chief of Operations', did: 'submitted the supplier form', drafted: 'filled in the supplier form', defaultMode: 'belay' },
  { id: 'email', action: 'Email a customer', who: 'Chief of Sales', did: 'emailed Initech', drafted: 'drafted an email to Initech', defaultMode: 'belay' },
  { id: 'spend', action: 'Spend money', who: 'Chief of Operations', did: 'renewed the design tool plan', drafted: 'found the design tool plan up for renewal', defaultMode: 'belay' },
]

/** The climb-log line for a rule in a given mode: done and logged, or held for your OK. */
export function logLine(rule: (typeof RULES)[number], mode: Mode) {
  return mode === 'free'
    ? `${rule.who} ${rule.did}. Logged.`
    : `${rule.who} ${rule.drafted}. Waiting for your OK.`
}
