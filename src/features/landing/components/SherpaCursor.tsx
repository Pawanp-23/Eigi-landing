import { useRef } from 'react'
import { cx } from '../../../utils/cx.ts'
import { useCursorFollower } from '../hooks/useCursorFollower.ts'
import styles from './SherpaCursor.module.css'

/** A little sherpa that trails the mouse, roped to it. Speaks up while `talking`. */
export function SherpaCursor({ talking }: { talking: boolean }) {
  const sherpaRef = useRef<HTMLDivElement>(null)
  const ropeRef = useRef<SVGPathElement>(null)
  useCursorFollower(sherpaRef, ropeRef)

  return (
    <div aria-hidden="true">
      <svg className={styles.rope}><path ref={ropeRef} /></svg>
      <div ref={sherpaRef} className={cx(styles.sherpa, talking && styles.talking)}>
        <svg width="18" height="26" viewBox="0 0 18 26">
          <circle cx="9" cy="5" r="4" fill="var(--accent)" />
          <path d="M9 10 L9 18 M9 18 L4 25 M9 18 L14 25 M3 13 L15 13" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className={cx(styles.tip, 'mono')}>sherpa · right here with you</div>
      </div>
    </div>
  )
}
