import type { CrewId } from '../lib/crew.ts'

export const COMPUTER = {
  eyebrow: 'Meet your Eigi',
  title: 'A teammate with its own',
  titleSerif: 'computer.',
  lede: 'Your Eigi has its own browser, files and memory. You message it like a person. It does the work on its computer, and checks with you before anything goes out in your name.',
  filmLabel: 'Your AI team, working in Slack',
  filmTag: 'Illustrative example',
  hint: 'Click a channel to watch another teammate work.',
  elsewhere: 'Also in Microsoft Teams, email and WhatsApp, or call them from Claude or ChatGPT.',
  workspace: 'Your Studio',
} as const

export type TrustIcon = 'shield' | 'log' | 'memory' | 'people'
export const TRUST: { icon: TrustIcon; color: string; title: string; body: string }[] = [
  { icon: 'shield', color: 'var(--yellow)', title: 'Nothing goes out without you.', body: 'Anything with your name or money on it waits for one tap.' },
  { icon: 'log', color: 'var(--blue)', title: 'Every step is logged.', body: 'Check their work the way you’d check a new hire’s.' },
  { icon: 'memory', color: 'var(--green)', title: 'It remembers your business.', body: 'Tell it once. It keeps your prices, your tone and your rules.' },
  { icon: 'people', color: 'var(--red)', title: 'A real person stays.', body: 'Your sherpa sets it up with you and stays until it sticks.' },
]

/* ---------- the Slack demo ---------- */

export type Speaker = 'you' | CrewId

export interface WorkStep {
  text: string
  tool: string
  result: string
}

export interface Ask {
  /** what the approval is about */
  quote: string
  yes: string
  no: string
  /** the teammate's reply once approved */
  done: string
}

export interface SceneMessage {
  from: Speaker
  time: string
  /** `**bold**` and `@mention` are styled when rendered */
  text: string
  work?: { title: string; label?: string; steps: WorkStep[] }
  ask?: Ask
  note?: string
}

export interface Scene {
  id: string
  /** sidebar label; channels start with # */
  title: string
  divider: string
  unread?: number
  dm?: boolean
  messages: SceneMessage[]
}

export const SCENES: Scene[] = [
  {
    id: 'general', title: '# general', divider: 'Morning brief',
    messages: [
      { from: 'you', time: '8:02 AM', text: '@Chief of Staff Morning. What actually needs me today?' },
      {
        from: 'cos', time: '8:02 AM', text: 'Going through your inbox and calendar now.',
        work: { title: 'Worked in the browser', steps: [
          { text: 'Sorted 38 new emails', tool: 'Inbox', result: 'Done' },
          { text: 'Checked today’s calendar', tool: 'Calendar', result: 'Done' },
          { text: 'Drafted the replies you owe', tool: 'Drafts', result: '3 drafts' },
        ] },
      },
      {
        from: 'cos', time: '8:06 AM',
        text: 'Two things need you. **Globex wants a quote by Friday**, and your **2 PM clashes with the investor call**. I sorted the rest and drafted three replies for you to check.',
        note: 'Every step is in the audit trail.',
      },
    ],
  },
  {
    id: 'sales', title: '# sales', divider: 'Follow-ups', unread: 5,
    messages: [
      { from: 'you', time: '4:40 PM', text: '@Chief of Sales follow up with everyone from this week’s demo calls. Sam ran two of them.' },
      {
        from: 'sales', time: '4:40 PM', text: 'On it. Pulling up the call notes.',
        work: { title: 'Worked in the browser', steps: [
          { text: 'Found five demo calls, two of them Sam’s', tool: 'Calls', result: '5 found' },
          { text: 'Wrote a follow-up for each, in your voice', tool: 'Drafts', result: '5 drafts' },
          { text: 'Logged all five in the CRM', tool: 'CRM', result: 'Done' },
        ] },
      },
      {
        from: 'sales', time: '4:47 PM',
        text: 'Five follow-ups are ready, two of them from Sam. Each one picks up on what that person asked about on the call. Want me to send them?',
        ask: { quote: 'Sending needs your approval.', yes: 'Send all five', no: 'I’ll read them first', done: 'Sent. All five are logged in the CRM.' },
      },
    ],
  },
  {
    id: 'launch', title: '# launch', divider: 'Launch', unread: 1,
    messages: [
      { from: 'you', time: '11:15 AM', text: '@Chief of Marketing the new pricing page goes live Thursday. Can you get the launch ready?' },
      {
        from: 'mkt', time: '11:15 AM', text: 'Yes. Starting with what changed and who it’s for.',
        work: { title: 'Used company memory', steps: [
          { text: 'Read the pricing changes', tool: 'Docs', result: 'Done' },
          { text: 'Checked what customers asked about on recent calls', tool: 'Calls', result: 'Done' },
          { text: 'Wrote the announcement, a blog post, and four social posts', tool: 'Drafts', result: '6 drafts' },
        ] },
      },
      {
        from: 'mkt', time: '11:31 AM',
        text: 'The launch kit is in your drafts. I led with **dropping per-seat pricing**, since that’s what customers asked about most.',
        note: 'Drafted from company memory.',
      },
    ],
  },
  {
    id: 'ops', title: '# bookings', divider: 'Tomorrow', unread: 2,
    messages: [
      { from: 'you', time: '5:55 PM', text: '@Chief of Operations confirm tomorrow’s bookings, and offer any cancelled slots to the waitlist.' },
      {
        from: 'ops', time: '5:55 PM', text: 'On it.',
        work: { title: 'Worked in the browser', steps: [
          { text: 'Read tomorrow’s calendar', tool: 'Calendar', result: '18 bookings' },
          { text: 'Texted tomorrow’s customers', tool: 'Texts', result: '18 sent' },
          { text: 'Offered a cancelled 2:30 to the waitlist', tool: 'Waitlist', result: 'Taken' },
        ] },
      },
      {
        from: 'ops', time: '6:20 PM',
        text: 'Tomorrow is set. **16 confirmed** and the 2:30 is filled. Two customers haven’t replied, so I’ve flagged them for you.',
        ask: { quote: 'Text the two again at 8am?', yes: 'Yes, at 8am', no: 'I’ll call them', done: 'Scheduled for 8am. I’ll post who replies.' },
      },
    ],
  },
  {
    id: 'sherpa', title: 'Your sherpa', divider: 'Camp I', dm: true,
    messages: [
      { from: 'sherpa', time: '10:00 AM', text: 'Hi, I’m your sherpa. I’ve joined your Slack and Thursday’s standup. This week we find the repetitive work worth solving first.' },
      {
        from: 'sherpa', time: '10:01 AM', text: 'Here’s our plan:',
        work: { title: 'Your first job', label: 'Sherpa', steps: [
          { text: 'Map how follow-ups run today, on a 30-minute call', tool: 'Call', result: 'Booked' },
          { text: 'Connect the tools they touch', tool: 'Setup', result: 'Next' },
          { text: 'Check the first results with you', tool: 'Review', result: 'Friday' },
        ] },
      },
      {
        from: 'sherpa', time: '10:02 AM', text: 'Which job would you hand over first?',
        ask: { quote: 'Most teams start with the one that eats their evenings.', yes: 'Follow-ups', no: 'Something else', done: 'Great. I’ll bring a map to our call.' },
      },
    ],
  },
]
