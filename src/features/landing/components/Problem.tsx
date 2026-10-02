import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import styles from './Problem.module.css'

const RIDGE = 'M0 210 L120 150 L170 175 L260 60 L330 130 L400 100 L470 160 L560 30 L640 120 L700 90 L780 150 L850 70 L920 140 L1000 120'

/** Peaks on the ridge: summit point, top of its marker line, and label baseline. */
const PEAKS = [
  { name: 'CLAUDE', x: 260, y: 60, top: 20, labelY: 22 },
  { name: 'GPT', x: 560, y: 30, top: 0, labelY: 10 },
  { name: 'FABLE', x: 850, y: 70, top: 35, labelY: 38 },
  { name: 'GEMINI', x: 400, y: 100, top: 70, labelY: 74 },
]

export function Problem() {
  return (
    <section id="problem">
      <motion.p className="eyebrow mono" {...reveal}>The problem · adoption</motion.p>
      <motion.h2 {...reveal}>Everyone can see the summit. Almost no one knows the route.</motion.h2>
      <motion.p className="lead" {...reveal}>
        Claude, GPT, Fable, Gemini — the most powerful tools ever built are one login away. Yet most
        businesses stall at the foot of the mountain: where does it fit, what do we automate first, who sets it up?
      </motion.p>
      <motion.svg
        className={styles.ridge}
        viewBox="0 0 1000 220"
        role="img"
        aria-label="A ridge of AI peaks — Claude, GPT, Fable, Gemini — and you at the bottom, 0 m, with no route."
        {...reveal}
      >
        <path className={styles.line} d={RIDGE} />
        {PEAKS.map((p) => (
          <g key={p.name}>
            <line className={styles.dash} x1={p.x} y1={p.y} x2={p.x} y2={p.top} />
            <circle cx={p.x} cy={p.y} r="4" />
            <text x={p.x + 8} y={p.labelY}>{p.name}</text>
          </g>
        ))}
        <text x="20" y="200">▲ you are here — 0 m, no route</text>
      </motion.svg>
    </section>
  )
}
