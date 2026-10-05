import type { Role } from './site.ts'

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
