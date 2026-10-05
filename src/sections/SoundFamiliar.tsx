import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Mascot } from '../components/brand/Mascot.tsx'
import { Heading } from '../components/ui/Heading.tsx'
import { FAMILIAR, PAINS } from '../content/story.ts'
import { amitLink } from '../lib/amit.ts'
import { INK } from '../lib/crew.ts'
import { cx } from '../lib/cx.ts'
import { pop } from '../lib/motion.ts'
import styles from './SoundFamiliar.module.css'

/** Box colours for what Sherpie ends up carrying, one per pain. */
const BOX: Record<string, [string, string]> = {
  'Hiring': ['var(--blue-t)', 'var(--blue)'],
  'Follow-ups': ['var(--red-t)', 'var(--red)'],
  'Your week': ['var(--yellow-t)', 'var(--yellow)'],
  'Tools': ['var(--green-t)', 'var(--green)'],
  'Growth': ['#eeeee8', 'var(--ink-3)'],
}

/** Sound familiar? Tap the pains that are yours and Sherpie's backpack fills up. */
export function SoundFamiliar() {
  const [mine, setMine] = useState<string[]>([])
  const toggle = (area: string) => setMine((m) => (m.includes(area) ? m.filter((a) => a !== area) : [...m, area]))
  const n = mine.length
  const hurts = n ? `The ones that are true for us: ${mine.join(', ')}.` : ''

  return (
    <section className="section" id="familiar" aria-labelledby="familiar-title" style={{ paddingTop: 'clamp(40px, 6vw, 80px)' }}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <Heading eyebrow={FAMILIAR.eyebrow} title={FAMILIAR.title} serif={FAMILIAR.titleSerif} id="familiar-title" />
          <ol className={styles.list}>
            {PAINS.map((p, i) => {
              const on = mine.includes(p.area)
              return (
                <li key={p.area} className={cx(on && styles.mine)}>
                  <span className={styles.area}>{String(i + 1).padStart(2, '0')} · {p.area}</span>
                  <p>{p.text}</p>
                  <button type="button" aria-pressed={on} onClick={() => toggle(p.area)}>{FAMILIAR.button}{on ? ' ✓' : ''}</button>
                </li>
              )
            })}
          </ol>
          <div className={styles.close}>
            <p>{FAMILIAR.closing} <span className="serif">{FAMILIAR.closingSerif}</span></p>
            {n ? (
              <a className="fine tlink" href={amitLink('familiar', hurts)} target="_blank" rel="noopener noreferrer">{n} of 5. Tell Amit which one hurts most ↗</a>
            ) : (
              <span className="fine">{FAMILIAR.prompt}</span>
            )}
          </div>
        </div>
        <Load items={mine} />
      </div>
    </section>
  )
}

function Load({ items }: { items: string[] }) {
  const reduced = useReducedMotion()
  const n = items.length
  return (
    <aside className={styles.load} aria-live="polite">
      <svg viewBox="0 0 260 336" aria-hidden="true">
        <ellipse cx="130" cy="331" rx="64" ry="6" fill={INK} opacity=".08" />
        {items.map((area, i) => {
          const w = 150 - ((i * 17) % 40)
          const x = 130 - w / 2 + (i % 2 ? 6 : -6)
          const y = 196 - i * 34
          const [fill, stroke] = BOX[area] ?? ['#fff', INK]
          return (
            <motion.g key={area} initial={reduced ? false : { y: -60 }} animate={{ y: 0 }} transition={pop}>
              <rect x={x} y={y} width={w} height="30" rx="7" fill={fill} stroke={stroke} strokeWidth="2" />
              <text x="130" y={y + 19.5} textAnchor="middle" fontFamily="Geist, sans-serif" fontSize="12.5" fontWeight="600" fill={INK}>{area}</text>
            </motion.g>
          )
        })}
        <svg x="78" y="206" width="104" height="125"><Mascot id="sherpa" /></svg>
        {n >= 3 && <path d="M166 236 q5 8 0 12 q-5-4 0-12z" fill="var(--blue)" opacity=".7" />}
      </svg>
      <b>{n ? `You’re carrying ${n} of 5.` : FAMILIAR.loadEmpty}</b>
      <span>{n === 0 ? FAMILIAR.loadEmptyNote : n >= 3 ? FAMILIAR.loadHeavy : FAMILIAR.loadSome}</span>
    </aside>
  )
}
