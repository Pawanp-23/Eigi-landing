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
