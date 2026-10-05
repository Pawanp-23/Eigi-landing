/*
 * Every word on the page, taken from Rashmin's Eigi landing (rashcasm/Eigi-landing) and
 * trimmed so each idea becomes something you can play with. No em dashes, by house rule.
 */

export type Role = 'ops' | 'support' | 'sales' | 'finance'

/** One colour per Eigi role, from the Summit palette. */
export const ROLES: Record<Role, { name: string; short: string; mark: string; color: string; tint: string }> = {
  ops: { name: 'Operations Eigi', short: 'Ops', mark: '⚙', color: 'var(--green)', tint: 'var(--green-t)' },
  support: { name: 'Support Eigi', short: 'Support', mark: '?', color: 'var(--blue)', tint: 'var(--blue-t)' },
  sales: { name: 'Sales Eigi', short: 'Sales', mark: '↗', color: 'var(--red)', tint: 'var(--red-t)' },
  finance: { name: 'Finance & admin Eigi', short: 'Finance', mark: '$', color: 'var(--yellow)', tint: 'var(--yellow-t)' },
}
export const ROLE_ORDER: readonly Role[] = ['ops', 'support', 'sales', 'finance']

export const HERO = {
  eyebrow: 'For founders doing ten jobs at once',
  title: ['Everyone sold you AI.', 'Nobody', 'showed you how.'],
  sub: 'AI teammates that do the real work, and a real engineer who sets them up and stays.',
  proof: 'Amit is our Eigi.',
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

/** Ready-made jobs for the hero. Illustrative, and labelled as such on the page. */
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

/** Free-text tasks get a role by keyword, then a generic, clearly illustrative script. */
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

/**
 * The narrative under the hero. Story first, tech later: the founder is the hero, Eigi is the guide.
 * 1. We get it (the founder's questions, asked back to them, each with how Eigi takes it).
 * 2. The trap (growing by headcount is linear, and every competitor can do it).
 * 3. The promise (speed, an AI team around the clock, you build while Eigi runs it).
 */
export const WHY = {
  eyebrow: 'Sound familiar?',
  title: ['You didn’t start a company to', 'run its operations.'],
  lede: 'We know your business, the work behind it, and what it’s quietly costing you. Tap the ones that sound like your week.',
  questions: [
    { area: 'Hiring', ask: 'Hiring for growth, or for a broken system?', answer: 'Fix the system first. Your Eigi takes the repeat work, so your next hire is for growth.' },
    { area: 'Follow-ups', ask: 'If you don’t follow up, nobody does.', answer: 'Your Eigi chases every lead, invoice and reply, every day, and brings you only what needs you.' },
    { area: 'Your week', ask: 'More operating than building lately?', answer: 'Hand the operating to Eigi. Keep the building for yourself.' },
    { area: 'Tools', ask: 'Five tools to avoid one hire. Now you manage all five.', answer: 'One teammate that works across your tools, so you stop being the glue between them.' },
    { area: 'Growth', ask: 'Customers double. Your team doesn’t. What breaks first: the team, or the customers?', answer: 'Neither. Eigi grows with the work, not with your headcount.' },
  ],
  tally: {
    none: 'Tap the ones that sound like your company.',
    some: 'You’re not behind. You’re carrying too much on your own.',
    all: 'You’re exactly who we built Eigi for.',
  },

  trap: {
    eyebrow: 'The trap',
    title: ['Growing by hiring?', 'So is everyone else.'],
    lede: 'Adding one person for every new pile of work is the slowest way to grow, and every competitor can do it too. It isn’t an edge. Speed is.',
    hire: { name: 'Grow by hiring', line: 'Hire, onboard, manage. Repeat. Your days fill with running the team.' },
    eigi: { name: 'Grow with Eigi', line: 'No new hires. Your Eigis take the extra work, and your days go back to building.' },
    note: 'Illustrative. Every business is different; your sherpa maps yours.',
  },

  promise: {
    title: ['You build the company.', 'Eigi runs it.'],
    points: [
      { title: 'Speed is the edge.', body: 'We know execution speed decides who wins. Work starts the moment you ask, not when someone frees up.' },
      { title: 'A team that never clocks off.', body: 'Your Eigis work around the clock, 24/7. Nothing sits waiting on operations.' },
      { title: 'A sherpa in your corner.', body: 'A real engineer sets it up with you and stays until it sticks. You’re never figuring out AI alone.' },
    ],
    close: 'You’re ambitious. We’re here so you can build, not just keep up.',
  },
}

/** The Eigi computer: one punchline, and a desktop the Eigi drives by itself. Illustrative. */
export type AppKind = 'browser' | 'sheet' | 'mail' | 'slack' | 'whatsapp' | 'voice' | 'board' | 'files'
export const COMPUTER = {
  eyebrow: 'The Eigi computer',
  title: ['A computer that works', 'anywhere, everywhere.'],
  /** "The platform to ___." The last word rotates. */
  platform: 'The platform to',
  verbs: ['build', 'ship', 'sell', 'work', 'scale'],
  lede: 'Your Eigi has its own computer: browser, inbox, sheets, Slack, WhatsApp, even the phone. It works wherever your business does, and checks with you before anything goes out.',
  hint: 'Tap an app to hand it a job',
  apps: [
    { kind: 'browser', name: 'Browser', color: 'var(--blue)', job: 'Found 20 clinics with no online booking', items: ['Smile Studio Austin', 'Riverside Dental', 'Eastside Family Dental', 'Bright Bay Dentistry', 'Lamar Dental Care'] },
    { kind: 'sheet', name: 'Sheets', color: 'var(--green)', job: 'Filled the lead sheet, 20 rows', items: ['Clinic', 'Owner', 'Email', 'Booking', 'Riverside', 'Dr. Patel', 'hello@…', 'None', 'Bright Bay', 'Dr. Chen', 'team@…', 'None', 'Lamar', 'Dr. Ruiz', 'info@…', 'None'] },
    { kind: 'mail', name: 'Mail', color: 'var(--red)', job: 'Drafted 20 intros in your tone', items: ['To: Riverside Dental', 'Subject: A free 30-minute booking audit', 'Hi Dr. Patel, I noticed patients can’t book online yet.', 'Would a free 30-minute audit be useful this week?'] },
    { kind: 'slack', name: 'Slack', color: '#611f69', job: 'Answered the team in #ops', items: ['Sam: did anyone confirm tomorrow’s bookings?', 'Eigi: Done. 14 confirmed, 2 slots offered to the waitlist.', 'Sam: legend 🙌'] },
    { kind: 'whatsapp', name: 'WhatsApp', color: '#25a244', job: 'Replied to a customer on WhatsApp', items: ['Priya: Hi! Has my order shipped yet?', 'Eigi: Yes, it left this morning. Here’s your tracking link 📦', 'Priya: Amazing, thank you!'] },
    { kind: 'voice', name: 'Voice', color: 'var(--yellow)', job: 'Took a call and rebooked it', items: ['Caller: Hi, can I move my appointment to Friday?', 'Eigi: Of course. Friday at 3:00 or 4:30?', 'Caller: 4:30, please.', 'Booked for Friday 4:30. Calendar updated.'] },
    { kind: 'board', name: 'CRM', color: 'var(--ink)', job: 'Moved 3 deals forward', items: ['Lead', 'Meeting', 'Won', 'Riverside Dental'] },
    { kind: 'files', name: 'Files', color: 'var(--ink-2)', job: 'Filed 6 invoices, flagged 1', items: ['inv_1042.pdf', 'inv_1043.pdf', 'inv_1044.pdf', 'inv_1045.pdf', 'inv_1046.pdf', 'inv_1047.pdf'] },
  ] as { kind: AppKind; name: string; color: string; job: string; items: string[] }[],
  approval: 'Anything with your name or money on it waits for your tap.',
}

/** First jobs: the founder's week, as cards on a plate that needs clearing. */
export const PLATE = {
  eyebrow: 'Picture it in your week',
  title: ['Before you hire for it,', 'hand it to an Eigi.'],
  lede: 'Your plate is full. Drag each job to the Eigi who should own it, or tap a job then tap an Eigi.',
  done: 'None of this means you need more people yet. It means the work needs a system that doesn’t run through',
}

export const JOBS: { task: string; role: Role }[] = [
  { task: 'Confirm tomorrow’s bookings', role: 'ops' },
  { task: 'Chase a supplier update', role: 'ops' },
  { task: 'Prepare for the morning', role: 'ops' },
  { task: 'Answer repeat questions', role: 'support' },
  { task: 'Find a missing order', role: 'support' },
  { task: 'Catch up on Discord', role: 'support' },
  { task: 'Reply to new leads in minutes', role: 'sales' },
  { task: 'Keep the CRM current', role: 'sales' },
  { task: 'Turn a brief into a proposal', role: 'sales' },
  { task: 'Chase unpaid invoices', role: 'finance' },
  { task: 'Check a supplier invoice', role: 'finance' },
  { task: 'Get the weekly update ready', role: 'finance' },
]

/** The founder's inner voice, one line shown per job still on the plate. */
export const PAINS = [
  'Nothing moves until you chase it.',
  'Five tools to avoid one hire. Now you manage five tools.',
  'Customers double. Team doesn’t. What breaks?',
  'Hiring for growth, or for broken systems?',
  'You ran the company this week. You didn’t build it.',
]

/** The trap's numbers (illustrative): hiring adds a person every few customers; one Eigi covers ten. */
export const CUSTOMER_STOPS = [10, 20, 30, 40]
export const CUSTOMERS_PER_EIGI = 10
export const eigisFor = (customers: number) => Math.ceil(customers / CUSTOMERS_PER_EIGI)
export const hiresFor = (customers: number) => 1 + Math.ceil(customers / 4)

/** What Eigi is: three parts, and what you get with only some of them (from "what you've probably tried"). */
export const GATEWAY = {
  eyebrow: 'What Eigi is',
  title: 'Your gateway to singularity.',
  lede: 'Three parts, working as one. Switch them on and see what opens.',
  parts: [
    { id: 'you', title: 'You', note: 'Your judgment. The final say.' },
    { id: 'sherpa', title: 'Forward-deployed engineers', note: 'Your sherpas. They set it up and stay.' },
    { id: 'eigi', title: 'Your Eigis', note: 'AI teammates that do the work.' },
  ],
  outcomes: {
    '': 'Pick the pieces. See what opens.',
    you: 'Just you, doing ten jobs. The door stays shut.',
    sherpa: 'Consultants. Thorough, at enterprise prices and enterprise pace.',
    eigi: 'An AI subscription. Powerful, and a blank chat box.',
    'you+eigi': 'Working out where AI fits is still your job.',
    'you+sherpa': 'Good advice. Still your hands doing the work.',
    'sherpa+eigi': 'An agency builds it and leaves. It breaks the week your process changes.',
    'you+sherpa+eigi': 'Gateway to singularity. Your business, AI-first.',
  } as Record<string, string>,
  vision: 'Our vision of singularity: the distance between an idea and making it happen gets smaller, every day.',
  stats: [
    { figure: '<20%', claim: 'of US businesses with four or fewer employees use AI.', source: 'US Census Bureau, BTOS, May 2026', href: 'https://www.census.gov/library/stories/2026/05/ai-use-businesses.html' },
    { figure: '67%', claim: 'of AI projects bought from specialist partners succeeded.', source: 'MIT NANDA, The GenAI Divide, 2025', href: 'https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/' },
  ],
}

/** Meet your AI sherpas: four camps on the way up. */
export const CLIMB = {
  eyebrow: 'The human half',
  title: ['Meet your', 'AI sherpas.'],
  lede: 'Forward-deployed engineers who work alongside your team, from “where do we start?” to “how did we work without this?”',
  camps: [
    { name: 'Camp I', title: 'Find the right starting point.', body: 'We sit with you, learn the business, and find the repetitive work worth solving first.', output: 'A clear opportunity map' },
    { name: 'Camp II', title: 'Build around your business.', body: 'We choose the tools, connect your systems, and build your first working AI workflow.', output: 'A workflow in your real tools' },
    { name: 'Camp III', title: 'Make it second nature.', body: 'We test it with your team, handle the edge cases, and show everyone how to use it.', output: 'A team ready to take the reins' },
    { name: 'Camp IV', title: 'Keep moving forward.', body: 'We stay close, improve what’s working, and help you take on the next opportunity.', output: 'Support as your business grows' },
  ],
  principles: ['Embedded, not outsourced', 'Moves at AI speed', 'Built for teams of two to ten'],
}

export const NOTES = [
  {
    log: 'Log 01 · Financial learning', status: 'Ongoing',
    title: 'One founder. A lot happening behind the app.',
    body: 'We’re connecting the work its founder used to juggle across separate systems: customer support, Discord bots, day-to-day operations, and voice and video agents for mock interviews.',
    tags: ['Customer support', 'Discord bots', 'Mock interviews', 'Operations'],
    small: 'Ongoing client work with Eigi engineers. Client name withheld.',
  },
  {
    log: 'Log 02 · Gondia, India', status: 'Live on WhatsApp',
    title: 'Meet Amit. Already helping in Gondia.',
    body: 'People in Gondia turn to Amit on WhatsApp for everyday work, from filing applications to finding information about loans. Amit is also the first Eigi you’ll meet here.',
    tags: ['Applications', 'Loan information', 'WhatsApp'],
    small: 'Community work in Gondia. Message shown is illustrative.',
  },
]

export const FOUNDERS = [
  { name: 'Aman Khandelwal', role: 'Founder & CEO', line: 'Making AI useful for the people building something of their own.' },
  { name: 'Mrunmay Chichkhede', role: 'Co-founder', line: 'Building the real-time systems that turn that possibility into practice.' },
]

export const LINKS = {
  studio: 'https://studio.eigi.ai/',
  docs: 'https://docs.eigi.ai/',
  email: 'mailto:buddy@eigi.ai',
}

const AMIT_NUMBER = '919225299611'
/** A wa.me link that opens a chat with Amit, first message already typed. */
export const amit = (text: string, ref = 'play') =>
  `https://wa.me/${AMIT_NUMBER}?text=${encodeURIComponent(`Hi Amit, ${text}\n\nref: ${ref}`)}`
