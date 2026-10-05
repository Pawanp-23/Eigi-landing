/**
 * Copy for the Success stories page (/stories/): real client and community work only.
 * Add a story only once the client has cleared it for publishing.
 */
export type StoryArt = 'connect' | 'chat'

export interface StoryCard {
  /** where the work happens */
  label: string
  /** e.g. "Live on WhatsApp" */
  status: string
  title: string
  challenge: string
  withEigi: string
  agent: string
  art: StoryArt
  color: string
  tags?: string[]
  small?: string
  /** a real next step, e.g. talking to the Eigi in the story */
  cta?: { label: string; text: string; ref: string }
}

export const STORIES_PAGE = {
  title: 'Eigi · Success stories',
  description: 'Real businesses with Eigis and our engineers at work.',
  eyebrow: 'Success stories',
  heading: ['They started where you are.', 'A sherpa walked them up.'],
  lede: 'Teams like yours, with more work than hours, finding their first job for an Eigi. Then find yours.',
  flip: { challenge: 'The challenge', withEigi: 'With Eigi' },
  outro: ['Yours could be', 'the next story.'],
}

/** Real client and community work. */
export const STORIES: StoryCard[] = [
  {
    label: 'Financial learning', status: 'Ongoing', art: 'connect', color: 'var(--blue)',
    title: 'One founder. A lot happening behind the app.',
    challenge: 'Its founder was juggling customer support, Discord, day-to-day operations and mock interviews across separate systems.',
    withEigi: 'We’re connecting that work: customer support, Discord bots and day-to-day operations, plus voice and video agents for mock interviews.',
    tags: ['Customer support', 'Discord bots', 'Mock interviews', 'Operations'],
    agent: 'Eigi engineers, voice and video agents',
    small: 'Ongoing client work with Eigi engineers. Client name withheld.',
  },
  {
    label: 'Gondia, India', status: 'Live on WhatsApp', art: 'chat', color: 'var(--green)',
    title: 'Meet Buddy. Already helping in Gondia.',
    challenge: 'People in Gondia need help with everyday work, from filing applications to finding information about loans.',
    withEigi: 'They turn to Buddy, an Eigi, on WhatsApp. Buddy is also the first Eigi you’ll meet on eigi.ai.',
    tags: ['Applications', 'Loan information', 'WhatsApp'],
    agent: 'Buddy, an Eigi on WhatsApp',
    small: 'Community work in Gondia.',
    cta: { label: 'Meet Buddy on WhatsApp ↗', text: 'I would like to learn how Eigi can help with my everyday work.', ref: 'gondia-story' },
  },
]
