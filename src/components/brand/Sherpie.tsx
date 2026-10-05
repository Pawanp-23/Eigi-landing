import { CREW, INK } from '../../lib/crew.ts'
import styles from './Sherpie.module.css'

interface SherpieProps {
  /** two little hands gripping an edge, for climbing over things */
  hands?: boolean
  className?: string
}

/** Sherpie up close: big round face, black beanie, and eyes that follow the pointer (see useLookAt). */
export function Sherpie({ hands = false, className }: SherpieProps) {
  return (
    <svg viewBox="0 0 128 124" className={className} aria-hidden="true">
      <circle cx="64" cy="80" r="42" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d="M24 66 C24 18 104 18 104 66 Z" fill={INK} />
      <rect x="19" y="56" width="90" height="16" rx="7" fill={INK} />
      <path d="M26 64 H102" stroke="#fff" strokeWidth="1.6" strokeDasharray="4 4" />
      <circle cx="64" cy="20" r="9" fill={INK} />
      <g data-eyes className={styles.eyes}>
        <g className={styles.lid}>
          <ellipse cx="49" cy="86" rx="5.5" ry="7" fill={INK} />
          <ellipse cx="79" cy="86" rx="5.5" ry="7" fill={INK} />
          <circle cx="51" cy="83" r="1.8" fill="#fff" />
          <circle cx="81" cy="83" r="1.8" fill="#fff" />
        </g>
      </g>
      <circle cx="38" cy="98" r="5" fill={CREW.mkt.hex} opacity=".45" />
      <circle cx="90" cy="98" r="5" fill={CREW.mkt.hex} opacity=".45" />
      {hands && (
        <>
          <path d="M28 124 c0-10 6-14 12-14 s10 4 10 14" fill="#fff" stroke={INK} strokeWidth="3" />
          <path d="M78 124 c0-10 6-14 12-14 s10 4 10 14" fill="#fff" stroke={INK} strokeWidth="3" />
        </>
      )}
    </svg>
  )
}
