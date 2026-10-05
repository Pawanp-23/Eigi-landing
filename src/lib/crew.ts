/** The AI team (four roles) plus the human on the rope. Colour always means "who is doing this job". */
export type CrewId = 'cos' | 'sales' | 'mkt' | 'ops' | 'sherpa'

export interface CrewMember {
  name: string
  /** CSS custom properties for the role's colour and its soft tint */
  color: string
  tint: string
  /** raw hex for SVG fills, which can't read CSS variables in every browser */
  hex: string
}

export const CREW: Record<CrewId, CrewMember> = {
  cos: { name: 'Chief of Staff', color: 'var(--blue)', tint: 'var(--blue-t)', hex: '#3a62c2' },
  sales: { name: 'Chief of Sales', color: 'var(--red)', tint: 'var(--red-t)', hex: '#d45b42' },
  mkt: { name: 'Chief of Marketing', color: 'var(--yellow)', tint: 'var(--yellow-t)', hex: '#e2a630' },
  ops: { name: 'Chief of Operations', color: 'var(--green)', tint: 'var(--green-t)', hex: '#2e855c' },
  sherpa: { name: 'Your sherpa', color: 'var(--ink)', tint: '#eeeee8', hex: '#ffffff' },
}

/** The four AI roles, in the order the page lists them. */
export const AI_TEAM = ['cos', 'sales', 'mkt', 'ops'] as const satisfies readonly CrewId[]

export const INK = '#17211f'
