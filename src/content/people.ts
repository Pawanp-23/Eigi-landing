import aman from '../assets/founders/aman-khandelwal.webp'
import mrunmay from '../assets/founders/mrunmay-chichkhede.webp'
import type { CrewId } from '../lib/crew.ts'

export const SHERPAS = {
  eyebrow: 'The human half',
  title: 'Meet your',
  titleSerif: 'AI sherpas.',
  lede: 'Forward-deployed engineers who work alongside your team, from “where do we start?” to “how did we work without this?”',
  principles: [
    { crew: 'sherpa', title: 'Embedded, not outsourced', text: 'Your sherpa joins your Slack, your standups and your chaos.' },
    { crew: 'ops', title: 'Moves at AI speed', text: 'Working steps every week, not a quarter-long project.' },
    { crew: 'cos', title: 'Built for small teams', text: 'Made for teams of two to ten, not enterprises of two thousand.' },
  ] satisfies { crew: CrewId; title: string; text: string }[],
  camps: [
    { name: 'Camp I', color: 'var(--blue)', title: 'Find the right starting point.', text: 'We sit with you, learn the business, and find the repetitive work worth solving first.', output: 'A clear opportunity map' },
    { name: 'Camp II', color: 'var(--green)', title: 'Build around your business.', text: 'We choose the tools, connect your systems, and build your first working AI workflow.', output: 'A workflow in your real tools' },
    { name: 'Camp III', color: 'var(--red)', title: 'Make it second nature.', text: 'We test it with your team, handle the edge cases, and show everyone how to use it.', output: 'A team ready to take the reins' },
    { name: 'Camp IV', color: 'var(--yellow)', title: 'Keep moving forward.', text: 'We stay close, improve what’s working, and help you take on the next opportunity.', output: 'Support as your business grows' },
  ],
} as const

export const STORIES = {
  eyebrow: 'Field notes',
  title: 'A business to run.',
  titleSerif: 'Someone to help.',
  lede: 'Eigi at work right now: inside a founder’s company, and for a community in Khundia, India.',
  founder: {
    meta: 'Log 01 · Financial learning',
    status: 'Ongoing',
    title: 'One founder. A lot happening behind',
    titleSerif: 'the app.',
    body: [
      'For a financial learning business, we’re connecting the work its founder used to manage across separate systems: customer support, Discord bots, and day-to-day operations.',
      'We’re also building voice and video agents for mock interviews, alongside automation for supply-chain and warehouse processes.',
    ],
    tags: ['Customer support', 'Discord bots', 'Mock interviews', 'Business operations'],
    cta: 'Talk about my business',
    fine: 'Ongoing client work with Eigi engineers. Client name withheld.',
  },
  amit: {
    meta: 'Log 02 · Khundia, India',
    status: 'Live on WhatsApp',
    title: 'Meet Amit. Already helping',
    titleSerif: 'in Khundia.',
    body: [
      'People in Khundia turn to Amit on WhatsApp for help with everyday work, from filing applications to finding information about loans.',
      'Amit is also the first Eigi you’ll meet here. Tell him about your business and the job you’d like help with.',
    ],
    startLabel: 'A conversation can start with',
    start: '“I have an application to fill in. Can you help me work through it?”',
    cta: 'Meet Amit on WhatsApp',
    fine: 'Community work in Khundia. Message shown is illustrative.',
  },
} as const

export const PEOPLE = {
  eyebrow: 'Our people',
  title: 'The people',
  titleSerif: 'on your rope.',
  lede: 'Making AI useful for the people building something of their own.',
  cta: 'Say hello to the team',
  founders: [
    { name: 'Aman Khandelwal', role: 'Founder & CEO', img: aman, line: 'Making AI useful for the people building something of their own.' },
    { name: 'Mrunmay Chichkhede', role: 'Co-Founder', img: mrunmay, line: 'Building the real-time systems that turn that possibility into practice.' },
  ],
} as const

export const FINAL = {
  eyebrow: 'Your next chapter starts here.',
  title: 'Keep the ambition.',
  titleSerif: 'Lose the busywork.',
  lede: 'Tell Amit what’s taking up your week. He’ll find the first job we can take off your plate, then introduce you to your sherpa.',
  primary: 'Talk to Amit on WhatsApp',
  secondary: 'Go to Studio',
  email: 'Or email the team:',
  brief: {
    label: 'Your brief for Amit',
    note: 'Built from what you told us on this page.',
    hours: (h: number) => `about ${h} hours a week`,
    send: 'Send my brief to Amit',
  },
} as const
