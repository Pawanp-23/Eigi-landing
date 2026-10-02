import { useRef } from 'react'
import { cx } from '../../../utils/cx.ts'
import { useSherpaCompanion } from '../hooks/useSherpaCompanion.ts'
import styles from './SherpaCompanion.module.css'

/**
 * A little sherpa roped to your normal cursor. It only joins you while `shown` (the sherpas section is
 * on screen), where the copy points it out: you never climb alone.
 */
export function SherpaCompanion({ shown }: { shown: boolean }) {
  const sherpaRef = useRef<HTMLDivElement>(null)
  const ropeRef = useRef<SVGPathElement>(null)
  useSherpaCompanion(sherpaRef, ropeRef)

  return (
    <div className={cx(shown && styles.shown)} aria-hidden="true">
      <svg className={styles.rope}><path ref={ropeRef} /></svg>
      <div ref={sherpaRef} className={styles.sherpa}>
        <svg width="18" height="26" viewBox="0 0 18 26">
          <circle cx="9" cy="5" r="4" />
          <path d="M9 10 L9 18 M9 18 L4 25 M9 18 L14 25 M3 13 L15 13" />
        </svg>
        <span className={cx(styles.tip, 'mono')}>sherpa · right here with you</span>
      </div>
    </div>
  )
}
