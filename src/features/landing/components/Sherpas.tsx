import { motion } from 'motion/react'
import type { Ref } from 'react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import styles from './Sherpas.module.css'

const POINTS = [
  ['Embedded, not outsourced', 'A sherpa joins your Slack, your standups, your chaos.'],
  ['Ship at AI speed', 'Days to first agent. Weeks to a new operating model.'],
  ['Capital-light', 'Built for teams of two, not enterprises of two thousand.'],
]

export function Sherpas({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <section id="sherpas" ref={ref}>
      <motion.p className="eyebrow mono" {...reveal}>A taste of sherpas</motion.p>
      <motion.h2 {...reveal}>You never climb alone.</motion.h2>
      <motion.p className="lead" {...reveal}>
        Notice the little figure next to your cursor? That’s the point. Our forward-deployed engineers stay
        roped to you — moving at AI speed, on a solopreneur’s budget.
      </motion.p>
      <motion.ol className={styles.grid} {...reveal}>
        {POINTS.map(([title, body], i) => (
          <li key={title}>
            <div className={cx(styles.index, 'mono')}>{String(i + 1).padStart(2, '0')}</div>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </motion.ol>
    </section>
  )
}
