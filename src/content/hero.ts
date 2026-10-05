import type { Role } from './site.ts'

export const HERO = {
  eyebrow: 'For founders doing ten jobs at once',
  title: ['Everyone sold you AI.', 'Nobody', 'showed you how.'],
  sub: 'AI teammates that do the real work, and a real engineer who sets them up and stays.',
  proof: 'Buddy is our Eigi.',
  note: 'Your real Eigi checks with you before anything goes out in your name.',
}

/** The four beats of how an Eigi works (Meet your Eigi). The hero card lights them up in order. */
export const BEATS = [
  { id: 'ask', short: 'Ask', title: 'Ask where you already talk.' },
  { id: 'computer', short: 'Computer', title: 'It works on its own computer.' },
  { id: 'memory', short: 'Memory', title: 'It remembers your business.' },
  { id: 'approval', short: 'Approval', title: 'It asks before it acts.' },
] as const

export interface Script {
  ask: string
  role: Role
  steps: string[]
  approval: string
  draft: string
}

/** Ready-made jobs for the hero walkthrough; real jobs go to Buddy. */
export const SCRIPTS: Script[] = [
  {
    ask: 'Find 20 dental clinics in Austin with no online booking. Draft a short intro for each.',
    role: 'sales',
    steps: ['Searched maps', 'Checked 34 websites', '20 match', 'Drafted 20 intros'],
    approval: 'Send 20 intro emails from you@yourstudio.com?',
    draft: 'Hi there, I noticed your clinic doesn’t offer online booking. Would a free 30-minute audit be useful?',
  },
  {
    ask: 'Chase every unpaid invoice from last month.',
    role: 'finance',
    steps: ['Opened your invoices', 'Found 6 overdue', 'Matched each to its client', 'Drafted 6 friendly nudges'],
    approval: 'Send 6 payment reminders in your name?',
    draft: 'Hi Sam, a quick nudge on invoice #1042 from September. Happy to resend it if that helps.',
  },
  {
    ask: 'Confirm tomorrow’s bookings and fill any cancelled slots from the waitlist.',
    role: 'ops',
    steps: ['Read tomorrow’s calendar', '14 bookings, 2 cancelled', 'Checked the waitlist', 'Drafted 16 texts'],
    approval: 'Text 14 customers and offer 2 slots to the waitlist?',
    draft: 'Hi Priya, see you tomorrow at 10:30. Reply C to cancel or R to reschedule.',
  },
  {
    ask: 'Answer the repeat questions in our Discord from yesterday.',
    role: 'support',
    steps: ['Read 41 new messages', '9 unanswered', 'Checked your help docs', 'Drafted 7, flagged 2 for you'],
    approval: 'Post 7 answers in #help as Eigi?',
    draft: 'Good question! Exports live under Settings, then Data. Here’s a 20-second clip showing where.',
  },
]

export const MEMORIES = ['Tone: warm, short, no jargon', 'Never promise a start date', 'Offer the free 30-minute audit']

/** Free-text tasks get a role by keyword, then a generic walkthrough script. */
const KEYWORDS: Record<Role, RegExp> = {
  sales: /lead|sales|prospect|crm|deal|proposal|outreach|intro|pitch|client list/i,
  finance: /invoice|pay|bill|finance|expense|tax|receipt|account|budget|refund/i,
  support: /support|customer|question|ticket|discord|faq|complain|reply to|help desk|review/i,
  ops: /book|schedule|calendar|supplier|order|stock|inventory|ops|meeting|hire|onboard|report|update/i,
}

export function roleFor(task: string): Role {
  for (const role of ['finance', 'sales', 'support', 'ops'] as const) if (KEYWORDS[role].test(task)) return role
  return 'ops'
}

export function scriptFor(task: string): Script {
  const known = SCRIPTS.find(s => s.ask === task)
  if (known) return known
  const role = roleFor(task)
  const short = task.length > 44 ? `${task.slice(0, 42).trim()}…` : task
  return {
    ask: task,
    role,
    steps: ['Opened the browser', `Worked on “${short}”`, 'Checked your rules in memory', 'Prepared a draft'],
    approval: 'Send this out in your name?',
    draft: 'Here is a first draft, written in your tone. Nothing goes out until you tap approve.',
  }
}
