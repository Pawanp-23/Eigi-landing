/*
 * Amit: Eigi's AI onboarding agent on WhatsApp.
 * Each link opens a chat with a first message already written for where the visitor clicked,
 * and a closing ref tag says which part of the page the conversation came from. Pure: no DOM here.
 */

export const AMIT_NUMBER = '919225299611'
export const AMIT_DISPLAY = '+91 92252 99611'

/** What a visitor clicking from each part of the page most likely wants, in their own words. */
const INTENT: Record<string, string> = {
  hero: 'I want to start using AI in my business.',
  computer: 'I would like to meet my Eigi and hand over a first job.',
  familiar: 'I can see what AI can do, but not where it fits in my business.',
  jobs: 'I would like an Eigi to take a first job off my plate.',
  sherpas: 'I would like a sherpa roped to my team.',
  stories: 'I run a business and want help connecting customer support and day-to-day operations.',
  khundia: 'I would like to learn how Eigi can help with my everyday work.',
  final: 'I would like help finding the first AI workflow for my business.',
}
const FALLBACK = 'I would like to talk to Eigi about bringing AI into my business.'

/** "First jobs" → "first-jobs": a short tag for the ref line. */
export const tagFor = (place: string) => place.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** The visitor's first message to Amit. `extra` adds a detail, such as which jobs they picked. */
export function messageFor(place: string, extra = '') {
  const intent = INTENT[place] ?? FALLBACK
  return `Hi Amit, ${intent}${extra ? ` ${extra}` : ''}\n\nref: ${tagFor(place) || 'site'}`
}

/** A wa.me link that opens a chat with Amit, message already typed. */
export const whatsappLink = (text: string) => `https://wa.me/${AMIT_NUMBER}?text=${encodeURIComponent(text)}`

/** Shorthand: the WhatsApp link for a part of the page. */
export const amitLink = (place: string, extra = '') => whatsappLink(messageFor(place, extra))

/** What the visitor told us on the way down the page. */
export interface Brief {
  /** typed into the hero: what's eating their week */
  task: string
  /** the pains they recognised in "Sound familiar", in the order they tapped them */
  pains: readonly string[]
  /** hours a week those pains take */
  hours: number
}

export const hasBrief = (b: Brief) => b.task.trim().length > 0 || b.pains.length > 0

/** The first message to Amit, written from everything the visitor told us. */
export function briefMessage({ task, pains, hours }: Brief) {
  const lines = ['Hi Amit, I run a small team.']
  const t = task.trim().replace(/[.!?]+$/, '')
  if (t) lines.push(`What’s eating my week: ${t}.`)
  if (pains.length) lines.push(`These sound familiar: ${pains.join(', ')}${hours ? ` (about ${hours} hours a week)` : ''}.`)
  lines.push('Where should we start?')
  return `${lines.join(' ')}\n\nref: brief`
}
