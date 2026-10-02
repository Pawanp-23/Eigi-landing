import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { PositioningMap } from './PositioningMap.tsx'
import styles from './Stand.module.css'

const WHY = [
  ['AI subscriptions', 'The most powerful tools ever built, and a blank chat box. You’re on your own.'],
  ['AI coworker bots', 'One agent, one task. Nobody redesigns how your business runs.'],
  ['Agencies', 'Build it, hand it over, leave. It breaks the week after.'],
  ['Consultancies', 'Roped in, but at enterprise prices and enterprise pace.'],
  ['Eigi', 'Forward-deployed sherpas who move at AI speed, stay until it sticks, and fit a two-person budget.'],
]

export function Stand() {
  return (
    <section id="stand" data-stage="Where we stand">
      <motion.p className="eyebrow mono" {...reveal}>Where Eigi stands</motion.p>
      <motion.h2 {...reveal}>Everyone else gives you tools. We get you to the top.</motion.h2>
      <div className={styles.grid}>
        <PositioningMap />
        <ul className={styles.why}>
          {WHY.map(([who, why]) => (
            <motion.li key={who} className={cx(who === 'Eigi' && styles.us)} {...reveal}>
              <span className="mono">{who}</span>
              {why}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
