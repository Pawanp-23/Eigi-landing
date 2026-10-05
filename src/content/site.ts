/** Links and contacts used across the page. */
export const LINKS = {
  studio: 'https://studio.eigi.ai/',
  docs: 'https://docs.eigi.ai/',
  email: 'buddy@eigi.ai',
} as const

export const NAV = [
  { href: '#computer', label: 'Meet your Eigi' },
  { href: '#how', label: 'How it works' },
  { href: '#stories', label: 'Stories' },
  { href: '#people', label: 'Our people' },
] as const

export const FOOTER_LINKS = [
  { href: LINKS.docs, label: 'Documentation', external: true },
  { href: LINKS.studio, label: 'Studio', external: false },
  { href: '#top', label: 'Privacy', external: false },
  { href: '#top', label: 'Terms', external: false },
  { href: '#top', label: 'Data deletion', external: false },
] as const
