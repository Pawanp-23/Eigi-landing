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
