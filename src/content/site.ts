/*
 * Site-wide facts: the Eigi roles and their colours, outside links, and the WhatsApp link to Buddy.
 * All copy comes from Rashmin's Eigi landing (rashcasm/Eigi-landing). No em dashes, by house rule.
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

export const LINKS = {
  studio: 'https://studio.eigi.ai/',
  docs: 'https://docs.eigi.ai/',
  email: 'mailto:buddy@eigi.ai',
}

const BUDDY_NUMBER = '919225299611'
/** A wa.me link that opens a chat with Buddy, first message already typed. */
export const buddy = (text: string, ref = 'play') =>
  `https://wa.me/${BUDDY_NUMBER}?text=${encodeURIComponent(`Hi Buddy, ${text}\n\nref: ${ref}`)}`
