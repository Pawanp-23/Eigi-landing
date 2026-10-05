/** The empathy half of the page: sound familiar, the problem, and what Eigi is. */
import type { CrewId } from '../lib/crew.ts'

export const FAMILIAR = {
  eyebrow: 'Sound familiar?',
  title: 'You started a company. Somehow you became its',
  titleSerif: 'operations team.',
  button: 'That’s us',
  closing: 'None of this means you need more people yet. It means the work needs a system that doesn’t run through',
  closingSerif: 'you.',
  prompt: 'Tap the ones that are true for you',
} as const

/** The week card beside the pains: what each one costs you, and who takes it off your plate. */
export const WEEK = {
  eyebrow: 'Your week',
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  hoursPerDay: 8,
  left: 'left to build your product',
  back: 'back to build your product',
  empty: 'Tap “That’s us” and watch where your week goes.',
  hand: 'Hand it to your Eigis',
  handed: 'Handed off. Your Eigis do it, you check in.',
  takeBack: 'Take it back',
  fine: 'Illustrative hours for a founder of a small team.',
} as const

export const PAINS = [
  { area: 'Hiring', text: 'Hiring for growth, or for broken systems?', hours: 6, crew: 'cos' },
  { area: 'Follow-ups', text: 'Nothing moves until you chase it.', hours: 8, crew: 'sales' },
  { area: 'Your week', text: 'You ran the company this week. You didn’t build it.', hours: 9, crew: 'ops' },
  { area: 'Tools', text: 'Five tools to avoid one hire. Now you manage five tools.', hours: 5, crew: 'ops' },
  { area: 'Growth', text: 'Customers double. Team doesn’t. What breaks?', hours: 7, crew: 'mkt' },
] as const satisfies readonly { area: string; text: string; hours: number; crew: CrewId }[]

export const PROBLEM = {
  eyebrow: 'The missing piece is adoption.',
  title: 'AI is everywhere. Making it work?',
  titleSerif: 'That takes people.',
  lede: 'The tools are one login away. What’s missing is someone who learns how your company actually runs, wires AI into it, and stays until your team relies on it.',
  triedLabel: 'What you’ve probably tried',
  tried: [
    { name: 'AI subscriptions', text: 'Powerful, and a blank chat box. Working out where it fits is still your job.' },
    { name: 'Single-task AI bots', text: 'One bot, one job. Nobody rethinks how the work actually flows.' },
    { name: 'Automation agencies', text: 'Build it, hand it over, leave. It breaks the week your process changes.' },
    { name: 'Consultancies', text: 'Thorough, at enterprise prices and enterprise pace.' },
  ],
  us: { name: 'Eigi', text: 'AI teammates that do the work, and an engineer inside your company who sets them up and stays. Built for teams under ten.' },
  stats: [
    {
      prefix: '<', value: 20,
      text: 'of US businesses with four or fewer employees use AI. Among firms with 250 or more, it’s 37%.',
      source: 'US Census Bureau, Business Trends and Outlook Survey, May 2026', href: 'https://www.census.gov/hfp/btos',
    },
    {
      prefix: '', value: 67,
      text: 'of AI projects bought from specialist partners succeeded. Projects built in-house succeeded far less often.',
      source: 'MIT NANDA, “The GenAI Divide: State of AI in Business 2025”', href: 'https://nanda.media.mit.edu/',
    },
  ],
  punch: 'Big companies hire forward-deployed engineers to make AI stick. We built Eigi so a team of two gets the same.',
} as const

export const GATEWAY = {
  eyebrow: 'What Eigi is',
  title: 'Your gateway',
  titleSerif: 'to singularity.',
  lede: 'Three parts, working as one. You keep the judgment. The engineers make it stick. Your Eigis do the work.',
  parts: [
    { id: 'you', name: 'You', text: 'Your judgment. The final say.' },
    { id: 'engineers', name: 'Forward-deployed engineers', text: 'Your sherpas. They set it up and stay.' },
    { id: 'eigis', name: 'Your Eigis', text: 'AI teammates that do the work.' },
    { id: 'gateway', name: 'Gateway to singularity.', text: 'Your business, AI-first.' },
  ],
  vision: 'Our vision of singularity: the distance between an idea and making it happen gets smaller, every day.',
  replay: 'Replay the connection',
} as const
