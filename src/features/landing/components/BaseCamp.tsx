import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { Crowd } from './Crowd.tsx'
import styles from './BaseCamp.module.css'

export function BaseCamp() {
  return (
    <section id="base-camp" className={styles.hero}>
      <motion.p className="eyebrow mono" {...reveal}>Base camp · 0 m</motion.p>
      <motion.h1 {...reveal}>AI is here.<br /><em>Adoption</em> isn’t.</motion.h1>
      <motion.p className="lead" {...reveal}>
        Everyone’s talking about AI. Most are walking in circles at base camp. Eigi is the team of sherpas
        that walks you up the mountain — so a two-person company climbs like twenty.
      </motion.p>
      <Crowd />
      <div className={cx(styles.scrollHint, 'mono')} aria-hidden="true">SCROLL TO CLIMB</div>
    </section>
  )
}
