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

/** The trap's numbers (illustrative): hiring adds a person every few customers; one Eigi covers ten. */
export const CUSTOMER_STOPS = [10, 20, 30, 40]
export const CUSTOMERS_PER_EIGI = 10
export const eigisFor = (customers: number) => Math.ceil(customers / CUSTOMERS_PER_EIGI)
export const hiresFor = (customers: number) => 1 + Math.ceil(customers / 4)
