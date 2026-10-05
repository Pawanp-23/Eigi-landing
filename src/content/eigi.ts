import type { CrewId } from '../lib/crew.ts'

/** How your Eigi works: four chapters, each with a small live example. */
export const CHAPTERS = [
  { n: '01', color: 'blue', title: 'Ask where you', titleSerif: 'already talk.', lede: 'Send a message in WhatsApp, Slack or the web app. No prompts to perfect.', caption: 'A message to start.' },
  { n: '02', color: 'green', title: 'It works on its', titleSerif: 'own computer.', lede: 'Your Eigi opens a browser, does the research and fills a sheet. Watch it, or get on with your day.', caption: 'Room to do the work.' },
  { n: '03', color: 'yellow', title: 'It remembers', titleSerif: 'your business.', lede: 'Tell it once. It keeps your prices, your tone and your rules, and gets better every week.', caption: 'Your business, remembered.' },
  { n: '04', color: 'red', title: 'It asks before', titleSerif: 'it acts.', lede: 'Anything with your name or money on it waits for one tap. Every step is logged.', caption: 'The final say is yours.' },
] as const

export const EXAMPLE = {
  ask: 'Find 20 dental clinics in Austin with no online booking. Draft a short intro for each.',
  ack: 'On it. A clear starting point.',
  channels: ['WhatsApp', 'Slack', 'Web app'],
  browserBar: 'maps · clinic websites · intro-drafts.sheet',
  steps: [
    { text: 'Searched maps', detail: 'Austin, TX' },
    { text: 'Checked 34 websites', detail: 'for online booking' },
    { text: '20 match', detail: 'saved to files' },
    { text: 'Drafted 20 intros', detail: 'in your tone' },
  ],
  memory: [
    { label: 'Tone', text: 'Warm, short, no jargon.' },
    { label: 'Promises', text: 'Never promise a start date.' },
    { label: 'Offer', text: 'Offer the free 30-minute audit.' },
    { label: 'Access', text: 'Your founders and your AI team work from the same picture of the business, within the access you set.' },
  ],
  approval: {
    status: 'Waiting for your approval',
    question: 'Send 20 intro emails from you@yourstudio.com?',
    draft: 'Hi there, I noticed your clinic doesn’t offer online booking. Would a free 30-minute audit be useful?',
    yes: 'Approve',
    no: 'Save as draft',
    tryIt: 'Try the example. Nothing will be sent.',
    approved: 'Approved ✓ Example approved. No emails were sent.',
    saved: 'Example draft saved. Still waiting for your approval.',
    trail: ['20 matches saved to files', '20 intro drafts prepared'],
    trailApproved: 'Example approval recorded',
  },
} as const

export const SUITE = {
  eyebrow: 'Hire your Eigis',
  title: 'Small team.',
  titleSerif: 'Full C-suite.',
  lede: 'Hire AI executives and keep your founding team as small as it is today.',
  roster: [
    { id: 'cos', label: 'Staff' },
    { id: 'sales', label: 'Sales' },
    { id: 'mkt', label: 'Marketing' },
    { id: 'ops', label: 'Operations' },
  ] satisfies { id: CrewId; label: string }[],
  primary: 'Meet your AI team',
  secondary: 'Have our engineers integrate it',
} as const

export const CONTROL = {
  eyebrow: 'You’re in charge.',
  title: 'AI pace.',
  titleSerif: 'Your call.',
  lede: 'Your AI team doesn’t wait for a standup. They look things up and write drafts on their own. Anything that goes out in your name waits for your OK.',
  rules: [
    { text: 'Look things up in memory', allowed: true },
    { text: 'Write a draft', allowed: true },
    { text: 'Submit a form in the browser', allowed: false },
    { text: 'Email a customer', allowed: false },
  ],
  note: 'Example rules. You choose what needs approval.',
  docs: 'Explore the documentation',
} as const

/* ---------- before you hire for it ---------- */

export const FIRST_JOBS = {
  eyebrow: 'Picture it in your week',
  title: 'Before you hire for it,',
  titleSerif: 'hand it to an Eigi.',
  lede: 'A first ops or support hire usually starts as a pile of repeat work. Start with the pile.',
  rolesLabel: 'The hire you’re putting off',
  startLabel: 'How we’d start',
  start: ['Map how this job runs today, on a 30-minute call.', 'Connect the tools it touches.', 'Check the first results with you.'],
  noApproval: 'Not needed. Drafts only, so your rules allow it.',
  /** shown when the visitor told us which pain is theirs */
  yours: (pain: string) => `You said “${pain}” is eating your week. Here’s where an Eigi would start.`,
  approved: 'Approved by you',
  kept: 'Kept as a draft for you to edit. Nothing was sent.',
} as const

/** The four stages every job moves through. A null approval means your rules let it run without asking. */
export interface Job {
  title: string
  detail: string
  understanding: string
  working: string
  approval: string | null
  done: string
  /** `**bold**` is styled */
  result: string
}

export interface HireRole {
  id: string
  label: string
  crew: CrewId
  jobs: Job[]
}

export const HIRE_ROLES: HireRole[] = [
  {
    id: 'sales', label: 'Sales', crew: 'sales',
    jobs: [
      {
        title: 'Follow up after demo calls',
        detail: 'Write a follow-up for every call this week, picking up on what each person asked.',
        understanding: 'Found 5 demo calls in your calendar and call notes',
        working: 'Wrote 5 follow-ups in your voice and logged them in the CRM',
        approval: 'Send all five?',
        done: '5 follow-ups sent',
        result: '**Two replies already.** One wants a call on Thursday.',
      },
      {
        title: 'Reply to new leads in minutes',
        detail: 'Answer every enquiry from your site while it’s still warm.',
        understanding: 'Watching your web form and inbox for new leads',
        working: 'Replied to 3 new leads and offered times you’re free',
        approval: 'Send replies like these on their own from now on?',
        done: 'Lead replies are on',
        result: '**First reply in 4 minutes**, every time. A summary lands at 6pm.',
      },
      {
        title: 'Chase quotes that went quiet',
        detail: 'Nudge every quote that hasn’t had an answer in a week.',
        understanding: 'Found 6 quotes with no reply for 7 days or more',
        working: 'Drafted a short, friendly nudge for each',
        approval: 'Send the 6 nudges?',
        done: '6 nudges sent',
        result: '**$12,400 back in play.** Two asked for revised quotes.',
      },
    ],
  },
  {
    id: 'ops', label: 'Operations', crew: 'ops',
    jobs: [
      {
        title: 'Confirm tomorrow’s bookings',
        detail: 'Text tomorrow’s customers, offer cancelled slots to the waitlist, and flag anyone who hasn’t replied.',
        understanding: 'Found 18 bookings on tomorrow’s calendar',
        working: 'Texted each customer and offered a cancelled 2:30 to the waitlist',
        approval: 'Send the 18 reminder texts?',
        done: '16 confirmed, 2:30 refilled',
        result: '**Two customers haven’t replied.** They’re flagged for you.',
      },
      {
        title: 'Chase a supplier update',
        detail: 'Read the purchase order and draft a request for the delivery date.',
        understanding: 'Read purchase order #2291 and the last three emails',
        working: 'Drafted a short, friendly request for a firm delivery date',
        approval: 'Send it to the supplier?',
        done: 'Request sent',
        result: '**Waiting on the supplier.** I’ll tell you the moment they reply.',
      },
      {
        title: 'Prepare for the morning',
        detail: 'Review the inbox and calendar, then list what needs a decision from you.',
        understanding: 'Read 38 new emails and today’s calendar',
        working: 'Sorted the rest and drafted the replies you owe',
        approval: null,
        done: 'Your morning list is ready',
        result: '**Two things need you.** Globex wants a quote by Friday, and your 2 PM clashes with the investor call.',
      },
    ],
  },
  {
    id: 'support', label: 'Customer support', crew: 'cos',
    jobs: [
      {
        title: 'Answer repeat questions',
        detail: 'Draft answers from your help docs and past replies. The tricky ones come to you.',
        understanding: 'Found 12 new questions in the support inbox',
        working: 'Drafted 9 answers from your help docs and past replies',
        approval: 'Send the 9 answers?',
        done: '9 answers sent',
        result: '**3 tricky ones** are waiting for you, with notes.',
      },
      {
        title: 'Find a missing order',
        detail: 'Check the order history and prepare a useful reply for the customer.',
        understanding: 'Looked up order #4471 and its shipping history',
        working: 'Found it held at the local depot and drafted a reply with tracking',
        approval: 'Send the reply to the customer?',
        done: 'Reply sent',
        result: '**The customer has the tracking link** and a pickup option.',
      },
      {
        title: 'Catch up on Discord',
        detail: 'Gather unanswered questions and flag the ones that need you.',
        understanding: 'Read 140 new messages across 4 channels',
        working: 'Gathered 11 unanswered questions and drafted replies',
        approval: null,
        done: 'Your digest is ready',
        result: '**4 questions need you.** The rest have drafts waiting.',
      },
    ],
  },
]

/** Which first job to open on, for the pain the visitor recognised first in "Sound familiar". */
export const JOB_FOR_PAIN: Record<string, { role: string; job: number }> = {
  'Hiring': { role: 'ops', job: 0 },
  'Follow-ups': { role: 'sales', job: 0 },
  'Your week': { role: 'ops', job: 2 },
  'Tools': { role: 'ops', job: 1 },
  'Growth': { role: 'support', job: 0 },
}
