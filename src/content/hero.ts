import type { CrewId } from '../lib/crew.ts'

export const HERO = {
  eyebrow: 'For founders doing ten jobs at once',
  line1: 'Everyone sold you AI.',
  line2: 'Nobody',
  line2Serif: 'showed you how.',
  lede: 'Eigi gives your business AI teammates that do real work, and a sherpa, a real engineer, who sets them up with you and stays until it sticks.',
  askLabel: 'What’s eating your week?',
  askPlaceholders: [
    'Chasing unpaid invoices',
    'Following up after demo calls',
    'Answering the same support questions',
    'Confirming tomorrow’s bookings',
  ],
  primary: 'Ask Amit',
  secondary: 'See how it works',
  amitNote: 'Amit is an Eigi too. Talking to him is the demo.',
  whereLabel: 'Works where you already talk',
} as const

export type Channel = 'slack' | 'teams' | 'email' | 'whatsapp' | 'assistants'
export const CHANNELS: { id: Channel; label: string }[] = [
  { id: 'slack', label: 'Slack' },
  { id: 'teams', label: 'Teams' },
  { id: 'email', label: 'Email' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'assistants', label: 'Claude & ChatGPT' },
]

/** Finished work floating around the headline. Positions are % of the hero; `side` picks the anchor edge. */
export interface FloatCard {
  crew: CrewId
  tag: string
  title: string
  note: string
  side: 'left' | 'right'
  x: number
  y: number
  tilt: number
}

export const FLOATS: FloatCard[] = [
  { crew: 'cos', tag: 'Sorted', title: '38 new emails', note: 'Two things need you', side: 'left', x: 6, y: 18, tilt: -3 },
  { crew: 'sales', tag: 'Ready', title: 'Five follow-ups, in your voice', note: 'Waiting for your OK', side: 'right', x: 6, y: 14, tilt: 2 },
  { crew: 'mkt', tag: 'Drafted', title: 'Thursday’s launch kit', note: 'From company memory', side: 'left', x: 4, y: 62, tilt: 2 },
  { crew: 'ops', tag: 'Nudged', title: '3 invoices, $4,850', note: 'Checked with you first', side: 'right', x: 4, y: 58, tilt: -2 },
  { crew: 'sales', tag: 'Replied', title: 'Sarah’s kitchen quote', note: 'Two times you’re free', side: 'left', x: 2, y: 90, tilt: -1 },
  { crew: 'ops', tag: 'Confirmed', title: 'Tomorrow’s bookings', note: 'Waitlist offered', side: 'right', x: 2, y: 90, tilt: 3 },
]
