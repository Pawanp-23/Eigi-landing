import { useInView } from 'motion/react'
import { useRef } from 'react'
import { cx } from '../../../utils/cx.ts'
import { contourPath } from '../../../utils/math.ts'
import styles from './PositioningMap.module.css'

/** Contour rings around the summit Eigi owns (top-right corner). */
const RINGS: string[] = []
for (let r = 30; r < 640; r += 38) RINGS.push(contourPath(690, 90, r, 0.75, 10, (rad) => Math.sin(rad * 4 + r * 0.03) * r * 0.07))

const ALTERNATIVES = [
  { name: 'DIY + tutorials', x: 130, y: 430 },
  { name: 'AI subscriptions', x: 170, y: 130 },
  { name: 'AI coworker bots', x: 310, y: 190 },
  { name: 'Automation agencies', x: 470, y: 330 },
  { name: 'Big consultancies', x: 600, y: 440, labelLeft: true },
]

/** Speed × support map: the alternatives plot in, then a route climbs to Eigi's flag. */
export function PositioningMap() {
  const ref = useRef<SVGSVGElement>(null)
  const go = useInView(ref, { once: true, amount: 0.35 })

  return (
    <svg
      ref={ref}
      className={cx(styles.map, go && styles.go)}
      viewBox="0 0 800 560"
      role="img"
      aria-label="Positioning map. DIY, AI subscriptions, coworker bots, agencies and consultancies each trade speed for support. Eigi sits alone at AI speed, roped in with you."
    >
      <g className={styles.rings}>{RINGS.map((d) => <path key={d} d={d} />)}</g>
      <line className={styles.axis} x1="60" y1="500" x2="770" y2="500" />
      <line className={styles.axis} x1="60" y1="500" x2="60" y2="30" />
      <text className={styles.axisLabel} x="770" y="530" textAnchor="end">ROPED IN WITH YOU →</text>
      <text className={styles.axisLabel} x="60" y="530">ON YOUR OWN</text>
      <text className={styles.axisLabel} x="-500" y="40" transform="rotate(-90)">HUMAN SPEED</text>
      <text className={styles.axisLabel} x="-30" y="40" transform="rotate(-90)" textAnchor="end">AI SPEED →</text>

      {ALTERNATIVES.map((a, i) => (
        <g key={a.name} className={styles.point} style={{ transitionDelay: `${0.1 + i * 0.2}s` }} transform={`translate(${a.x},${a.y})`}>
          <circle r="6" />
          <text x={a.labelLeft ? -14 : 14} y="4" textAnchor={a.labelLeft ? 'end' : undefined}>{a.name}</text>
        </g>
      ))}

      <path className={styles.climb} d="M600 440 C 640 360, 560 260, 640 200 S 690 120, 690 92" />
      <g className={styles.eigi} transform="translate(690,90)">
        <circle className={styles.pulse} r="10" />
        <circle className={styles.core} r="9" />
        <path className={styles.flag} d="M0 -9 L0 -48 L26 -40 L0 -32" />
        <text className={styles.name} x="-16" y="-56" textAnchor="end">EIGI</text>
        <text className={styles.tagline} x="-16" y="-38" textAnchor="end">AI speed · roped in</text>
      </g>
    </svg>
  )
}
