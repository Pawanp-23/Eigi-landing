import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { PositioningMap } from './PositioningMap.tsx'
import styles from './Stand.module.css'

const WHY = [
  ['AI subscriptions', 'The most powerful tools ever built — and a blank chat box. You’re on your own.'],
  ['AI coworker bots', 'One agent, one task. Nobody redesigns how your business runs.'],
  ['Agencies', 'Build it, hand it over, leave. It breaks the week after.'],
  ['Consultancies', 'Roped in — at enterprise prices and enterprise pace.'],
  ['Eigi', 'Forward-deployed sherpas who move at AI speed, stay until it sticks, and fit a two-person budget.'],
]

type Level = 'Yes' | 'Partly' | 'No'
const COLUMNS = ['AI tools', 'Agencies', 'Consultancies', 'Eigi']
const ROWS: [string, Level[]][] = [
  ['Moves at AI speed', ['Yes', 'No', 'No', 'Yes']],
  ['Embedded in your team', ['No', 'Partly', 'Yes', 'Yes']],
  ['Built for small-team budgets', ['Yes', 'Partly', 'No', 'Yes']],
  ['Stays until it actually sticks', ['No', 'No', 'Partly', 'Yes']],
]
const isEigi = (col: number) => col === COLUMNS.length - 1

export function Stand() {
  return (
    <section id="stand">
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

      <motion.table className={styles.compare} {...reveal}>
        <thead>
          <tr>
            <td />
            {COLUMNS.map((c, i) => <th key={c} scope="col" className={cx('mono', isEigi(i) && styles.us)}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([label, levels]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {levels.map((level, i) => (
                <td key={COLUMNS[i]} className={cx(isEigi(i) && styles.us)}>
                  <span className={cx(styles.dot, styles[level])} role="img" aria-label={level} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </motion.table>
    </section>
  )
}
