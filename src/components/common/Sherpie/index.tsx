import { useEffect, useState } from 'react'
import styles from './Sherpie.module.css'

const INK = '#17211f'

interface SherpieProps {
  /** two little hands gripping an edge */
  hands?: boolean
  /** cheek colour, so Sherpie can blush in a role's colour */
  cheek?: string
  className?: string
  /** something to say when poked */
  lines?: readonly string[]
}

/** Sherpie, our soft-toy sherpa: eyes follow the pointer (useLookAt), and a poke gets a word. */
export default function Sherpie({ hands = false, cheek = '#e2a630', className, lines }: SherpieProps) {
  const [said, setSaid] = useState<string | null>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!said) return
    const t = setTimeout(() => setSaid(null), 2600)
    return () => clearTimeout(t)
  }, [said, n])

  const face = (
    <svg viewBox="0 0 128 124" className={styles.svg} aria-hidden="true">
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
      <circle cx="38" cy="98" r="5" style={{ fill: cheek }} opacity=".5" className={styles.cheek} />
      <circle cx="90" cy="98" r="5" style={{ fill: cheek }} opacity=".5" className={styles.cheek} />
      {hands && <>
        <path d="M28 124 c0-10 6-14 12-14 s10 4 10 14" fill="#fff" stroke={INK} strokeWidth="3" />
        <path d="M78 124 c0-10 6-14 12-14 s10 4 10 14" fill="#fff" stroke={INK} strokeWidth="3" />
      </>}
    </svg>
  )

  if (!lines) return <span className={`${styles.root} ${className ?? ''}`}>{face}</span>

  return (
    <span className={`${styles.root} ${className ?? ''}`}>
      <button
        type="button"
        className={styles.poke}
        data-bounce={n % 2}
        aria-label="Poke Sherpie"
        onClick={() => { setN(v => v + 1); setSaid(lines[n % lines.length]) }}
      >{face}</button>
      {said && <span className={styles.bubble} role="status">{said}</span>}
    </span>
  )
}
