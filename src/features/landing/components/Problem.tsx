import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { reveal } from '../../../styles/motion.ts'
import styles from './Problem.module.css'

const RIDGE = 'M0 210 L120 150 L170 175 L260 60 L330 130 L400 100 L470 160 L560 30 L640 120 L700 90 L780 150 L850 70 L920 140 L1000 120'
const WIDTH = 1000

/** Peaks on the ridge: summit point, top of its marker line, and label baseline. */
const PEAKS = [
  { name: 'CLAUDE', x: 260, y: 60, top: 20, labelY: 22 },
  { name: 'GEMINI', x: 400, y: 100, top: 70, labelY: 74 },
  { name: 'GPT', x: 560, y: 30, top: 0, labelY: 10 },
  { name: 'FABLE', x: 850, y: 70, top: 35, labelY: 38 },
]

/**
 * A peak pops in as the ridge line reaches it. The ridge only ever moves right,
 * so "how far it has been drawn" is roughly x / width.
 */
function Peak({ peak, drawn }: { peak: (typeof PEAKS)[number]; drawn: MotionValue<number> }) {
  const at = peak.x / WIDTH
  const shown = useTransform(drawn, [at - 0.02, at + 0.04], [0, 1])
  const rise = useTransform(shown, [0, 1], [8, 0])
  return (
    <motion.g style={{ opacity: shown, y: rise }}>
      <line className={styles.dash} x1={peak.x} y1={peak.y} x2={peak.x} y2={peak.top} />
      <circle cx={peak.x} cy={peak.y} r="4" />
      <text x={peak.x + 8} y={peak.labelY}>{peak.name}</text>
    </motion.g>
  )
}

export function Problem() {
  const ridgeRef = useRef<HTMLDivElement>(null)
  // drawn from when the ridge enters the bottom of the screen until it reaches the middle
  const { scrollYProgress: drawn } = useScroll({ target: ridgeRef, offset: ['start 0.95', 'end 0.55'] })
  const here = useTransform(drawn, [0, 0.08], [0, 1])

  return (
    <section id="problem" data-stage="The problem">
      <motion.p className="eyebrow mono" {...reveal}>The problem · adoption</motion.p>
      <motion.h2 {...reveal}>AI is everywhere. Making it work? That takes people.</motion.h2>
      <motion.p className="lead" {...reveal}>
        Claude, GPT, Fable, Gemini: the most powerful tools ever built are one login away, and everyone can see the
        summit. Almost no one knows the route. Another subscription won’t connect the dots. You need people who
        learn your business, build the right workflows, and help your team use them.
      </motion.p>
      <div ref={ridgeRef} className={styles.ridgeWrap}>
        <svg
          className={styles.ridge}
          viewBox="0 0 1000 220"
          role="img"
          aria-label="A ridge of AI peaks (Claude, GPT, Fable, Gemini) and you at the bottom, 0 m, with no route."
        >
          <path className={styles.ghost} d={RIDGE} />
          <motion.path className={styles.line} d={RIDGE} style={{ pathLength: drawn }} />
          {PEAKS.map((p) => <Peak key={p.name} peak={p} drawn={drawn} />)}
          <motion.text x="20" y="200" style={{ opacity: here }}>▲ you are here · 0 m, no route</motion.text>
        </svg>
      </div>
    </section>
  )
}
