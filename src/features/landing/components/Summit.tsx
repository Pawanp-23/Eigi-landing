import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { peepStyle } from '../utils/peeps.ts'
import styles from './Summit.module.css'

/** Two people from the base-camp crowd, now at the top. `peep` is their sprite cell. */
const FOUNDERS = [
  { name: 'You', peep: 23 },
  { name: 'Co-founder', peep: 51 },
]
const AGENTS = [
  'Voice', 'Chat', 'Instinct', 'Context', 'Inbox', 'Sales', 'Support', 'Ops', 'Research',
  'Finance', 'Hiring', 'QA', 'Analytics', 'Outreach', 'Docs', 'Billing', 'Scheduling', 'Content',
]
const TEAM_SIZE = FOUNDERS.length + AGENTS.length

/** The founders are always there; agents rope in one by one as the section scrolls up. */
export function Summit() {
  const ref = useRef<HTMLElement>(null)
  const [team, setTeam] = useState(FOUNDERS.length)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', '0.6 0.7'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => setTeam(Math.max(FOUNDERS.length, Math.round(p * TEAM_SIZE))))

  return (
    <section id="summit" ref={ref} data-stage="Summit">
      <motion.p className="eyebrow mono" {...reveal}>Summit · 8,848 m · Our mission</motion.p>
      <motion.h2 {...reveal}>Make every small team AI-first.</motion.h2>
      <p className={cx(styles.count, 'mono')}>
        {team}
        <small>{team === TEAM_SIZE ? ' · a 2-person team, working like 20' : ' on the team'}</small>
      </p>
      <ul className={styles.team}>
        {FOUNDERS.map((f) => (
          <li key={f.name} className={cx(styles.member, styles.in)}>
            <span className={styles.peep}><span style={peepStyle(f.peep)} /></span>
            <span>{f.name}</span>
          </li>
        ))}
        {AGENTS.map((name, i) => (
          <li key={name} className={cx(styles.member, FOUNDERS.length + i < team && styles.in)}>
            <svg viewBox="0 0 34 46" aria-hidden="true"><circle cx="17" cy="9" r="7" /><path d="M5 44 Q5 20 17 20 Q29 20 29 44 Z" /></svg>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
