import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { cx } from '../../../utils/cx.ts'
import styles from './Route.module.css'

const TRAIL = 'M60 590 C 220 590, 200 470, 360 455 S 560 420, 470 330 S 560 230, 720 230 S 860 140, 940 40'

/** `at` is how far along the trail (0–1) the camp sits. */
const CAMPS = [
  {
    at: 0.16, numeral: 'I', altitude: '1,200 m', title: 'Discover',
    body: 'Sherpas sit with your team for a week and map every repetitive hour — inbox, sales follow-ups, ops, reporting.',
    chip: '→ AI opportunity map, ranked by hours saved',
  },
  {
    at: 0.42, numeral: 'II', altitude: '3,400 m', title: 'Integrate',
    body: 'We wire agents into the tools you already use. No rip-and-replace. Grokbot takes the inbox, Context learns your business.',
    chip: '→ First agents live in days, not quarters',
  },
  {
    at: 0.68, numeral: 'III', altitude: '5,900 m', title: 'Automate',
    body: 'Workflows chain the agents together. Muse drafts, Instinct decides, humans approve.',
    race: true,
  },
  {
    at: 0.93, numeral: 'IV', altitude: '7,800 m', title: 'Scale',
    body: 'Your team learns to run it themselves. We stay roped in — tuning, adding agents, pushing the ceiling higher.',
    chip: '→ AI-first, permanently',
  },
]

/** A camp lights up just before the hiker reaches it. */
const campAt = (p: number) => CAMPS.findLastIndex((c) => p >= c.at - 0.05)

/** Human vs. Eigi: the same job, six weeks against six hours. */
function SpeedRace({ progress }: { progress: MotionValue<number> }) {
  const human = useTransform(progress, [0.6, 0.75], [0, 0.14])
  const eigi = useTransform(progress, [0.6, 0.61875], [0, 1])
  return (
    <div className={cx(styles.race, 'mono')}>
      <div className={styles.lane}><span>Human</span><div className={styles.track}><motion.i style={{ scaleX: human }} /></div><span>6 weeks</span></div>
      <div className={styles.lane}><span>Eigi</span><div className={cx(styles.track, styles.ai)}><motion.i style={{ scaleX: eigi }} /></div><span>6 hours</span></div>
    </div>
  )
}

/** Pinned for 4 screens: scrolling walks the hiker up the trail, camp by camp. */
export function Route() {
  const sectionRef = useRef<HTMLElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const hikerRef = useRef<SVGGElement>(null)
  const [campPoints, setCampPoints] = useState<DOMPoint[]>([])
  const [active, setActive] = useState(-1)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  const climb = (p: number) => {
    const trail = trailRef.current!
    const { x, y } = trail.getPointAtLength(trail.getTotalLength() * p)
    hikerRef.current!.setAttribute('transform', `translate(${x},${y})`)
    setActive(campAt(p))
  }
  useMotionValueEvent(scrollYProgress, 'change', climb)
  useLayoutEffect(() => {
    const trail = trailRef.current!
    const length = trail.getTotalLength()
    setCampPoints(CAMPS.map((c) => trail.getPointAtLength(length * c.at)))
    climb(scrollYProgress.get())
  }, [scrollYProgress]) // measure once; later updates come from the scroll listener

  const shown = Math.max(0, active)

  return (
    <section ref={sectionRef} className={styles.route}>
      <div className={styles.sticky}>
        <svg className={styles.trail} viewBox="0 0 1000 620" aria-hidden="true">
          <path ref={trailRef} className={styles.ghost} d={TRAIL} />
          <motion.path className={styles.live} d={TRAIL} style={{ pathLength: scrollYProgress }} />
          {campPoints.map(({ x, y }, i) => (
            <g key={CAMPS[i].numeral}>
              <circle className={cx(styles.camp, i <= active && styles.reached)} r="8" cx={x} cy={y} />
              <text className={styles.campLabel} x={x + 16} y={y + 20}>{CAMPS[i].numeral} · {CAMPS[i].title}</text>
            </g>
          ))}
          <g ref={hikerRef}>
            <circle r="7" fill="var(--accent)" />
            <circle r="16" fill="none" stroke="var(--accent)" opacity=".35" />
          </g>
        </svg>
        <div className={styles.cards}>
          {CAMPS.map((c, i) => (
            <div key={c.numeral} className={cx(styles.card, i === shown && styles.shown)} aria-hidden={i !== shown}>
              <div className={cx(styles.cardLabel, 'mono')}>CAMP {c.numeral} · {c.altitude}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              {c.race ? <SpeedRace progress={scrollYProgress} /> : <span className={cx(styles.chip, 'mono')}>{c.chip}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
