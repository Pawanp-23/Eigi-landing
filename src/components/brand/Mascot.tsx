import { CREW, INK, type CrewId } from '../../lib/crew.ts'

const stroke = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: 'round', strokeLinecap: 'round' } as const

/** Each role is told apart by its hat: a cap, a headset, a beret, a hard hat, or Sherpie's beanie. */
function Hat({ id }: { id: CrewId }) {
  const col = CREW[id].hex
  switch (id) {
    case 'cos':
      return (
        <>
          <path d="M21 32 C21 13 59 13 59 32 Z" fill={col} {...stroke} />
          <path d="M57 31 L71 32.5 Q72.5 36 69 36 L57 35 Z" fill={col} {...stroke} />
          <circle cx="40" cy="15" r="2" fill={INK} />
        </>
      )
    case 'sales':
      return (
        <>
          <path d="M18 38 A22 22 0 0 1 62 38" fill="none" stroke={INK} strokeWidth="3.2" />
          <rect x="13" y="32" width="9" height="14" rx="4" fill={col} {...stroke} />
          <rect x="58" y="32" width="9" height="14" rx="4" fill={col} {...stroke} />
          <path d="M18 46 Q20 56 33 56" fill="none" {...stroke} />
          <circle cx="35" cy="56" r="3" fill={col} {...stroke} />
        </>
      )
    case 'mkt':
      return (
        <>
          <ellipse cx="38" cy="19" rx="20" ry="7.5" transform="rotate(-12 38 19)" fill={col} {...stroke} />
          <path d="M37 11.5 L38.5 6" fill="none" {...stroke} />
        </>
      )
    case 'ops':
      return (
        <>
          <path d="M22 31 C22 12 58 12 58 31 Z" fill={col} {...stroke} />
          <rect x="16" y="28.5" width="48" height="6" rx="3" fill={col} {...stroke} />
          <path d="M40 14 V28" fill="none" {...stroke} />
        </>
      )
    case 'sherpa':
      return (
        <>
          <path d="M21.5 30 C21.5 10 58.5 10 58.5 30 Z" fill={INK} />
          <rect x="19.5" y="25" width="41" height="9" rx="4" fill={INK} />
          <path d="M24 29.5 H56" stroke="#fff" strokeWidth="1.2" strokeDasharray="2.5 2.5" />
          <circle cx="40" cy="10" r="4.5" fill={INK} />
        </>
      )
  }
}

interface MascotProps {
  id: CrewId
  /** crop to the head, for avatars */
  head?: boolean
  className?: string
}

/** A crew member: a soft-toy body in the role's colour, Sherpie's round head and the role's hat. */
export function Mascot({ id, head = false, className }: MascotProps) {
  const col = CREW[id].hex
  const body = id === 'sherpa' ? '#fff' : col
  const cheek = id === 'sherpa' ? CREW.mkt.hex : col
  return (
    <svg viewBox={head ? '10 4 60 60' : '0 0 80 96'} className={className} aria-hidden="true">
      <path d="M13 94 V70 a27 27 0 0 1 54 0 V94 Z" fill={body} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="40" cy="78" r="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <circle cx="40" cy="78" r="2.2" fill={INK} />
      <circle cx="40" cy="38" r="19.5" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <circle cx="29.5" cy="44" r="3.3" fill={cheek} opacity=".4" />
      <circle cx="50.5" cy="44" r="3.3" fill={cheek} opacity=".4" />
      <circle cx="33.5" cy="39.5" r="2.3" fill={INK} />
      <circle cx="46.5" cy="39.5" r="2.3" fill={INK} />
      <path d="M35.5 46 Q40 50 44.5 46" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <Hat id={id} />
    </svg>
  )
}
