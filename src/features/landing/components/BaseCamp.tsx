import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { Crowd } from './Crowd.tsx'
import styles from './BaseCamp.module.css'

export function BaseCamp() {
  return (
    <section id="base-camp" className={styles.hero} data-stage="Base camp">
      <motion.p className="eyebrow mono" {...reveal}>Base camp · 0 m · AI is here. Adoption isn’t.</motion.p>
      <motion.h1 {...reveal}>Small team.<br /><em>Extraordinary</em> reach.</motion.h1>
      <motion.p className="lead" {...reveal}>
        Everyone’s talking about AI. Most are walking in circles at base camp. Eigi brings the engineers and AI
        workflows that walk you up the mountain, so a two-person company climbs like twenty.
      </motion.p>
      <Crowd />
      <div className={cx(styles.scrollHint, 'mono')} aria-hidden="true">SCROLL TO CLIMB</div>
    </section>
  )
}
