/*
 * Amit: Eigi's AI onboarding agent on WhatsApp.
 * The first message is pre-written from where the visitor is on the climb, so Amit starts with context
 * and the closing ref tag shows which section the conversation came from. Pure: no DOM here.
 */

export const AMIT_NUMBER = '919225299611'
export const AMIT_DISPLAY = '+91 92252 99611'

/** What a visitor at each stage most likely wants, in their own words. */
const INTENT: Record<string, string> = {
  'Base camp': 'I want to start using AI in my business.',
  'The problem': 'I can see what AI can do, but not where it fits in my business.',
  'Where we stand': 'I have tried AI tools on my own. I would like a sherpa instead.',
  'Eigi stories': 'I read the Eigi stories and would like one like that for my business.',
  'The gateway': 'I am ready to step through the gateway.',
  'Camp I': 'I would like you to map where AI fits in my business.',
  'Camp II': 'I would like to wire agents into the tools I already use.',
  'Camp III': 'I would like to automate my workflows with agents.',
  'Camp IV': 'I would like to scale what we have automated.',
  'With your sherpa': 'I would like a sherpa roped to my team.',
  'Summit': 'I want to make my team AI-first.',
  'Eigi Computer': 'I would like to hire an AI crew for my team.',
  'Field test': 'I would like a workflow like the ones in your field test.',
  'Questions': 'I have a few questions before we start.',
  'Back at base camp': 'I would like a sherpa for my team.',
}
const FALLBACK = 'I would like to talk to Eigi about bringing AI into my business.'

/** Stages that are places on the mountain, as they read mid-sentence. Others just state the intent. */
const PLACES: Record<string, string> = {
  'Base camp': 'base camp', 'The gateway': 'the gateway', 'Summit': 'the summit',
  'Camp I': 'Camp I', 'Camp II': 'Camp II', 'Camp III': 'Camp III', 'Camp IV': 'Camp IV',
}

/** "Camp II" → "camp-ii": a short tag for the ref line. */
export const tagFor = (stage: string) => stage.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** The visitor's first message to Amit, written from where they are. */
export function messageFor(stage: string, altitude: string, extra = '') {
  const intent = INTENT[stage] ?? FALLBACK
  const where = PLACES[stage] ? `I'm at ${PLACES[stage]} (${altitude}) on eigi.ai. ` : ''
  return `Hi Amit, ${where}${intent}${extra ? ` ${extra}` : ''}\n\nref: ${tagFor(stage) || 'site'}`
}

/** The first message from a field-test card: names the workflow the visitor just watched. */
export const fieldTestMessage = (useCase: string) =>
  `Hi Amit, I watched the ${useCase.toLowerCase()} field test on eigi.ai. I would like something like that for my business.

ref: field-test-${tagFor(useCase)}`

/** A wa.me link that opens a chat with Amit, message already typed. */
export const whatsappLink = (text: string) => `https://wa.me/${AMIT_NUMBER}?text=${encodeURIComponent(text)}`
