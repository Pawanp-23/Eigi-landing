import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'
import { Crowd } from './Crowd.tsx'
import styles from './CrowdBand.module.css'

/**
 * Back at base camp, at the very bottom of the page: the wandering crowd from the old hero, drawn in white
 * on the black footer. Everyone still carrying everything themselves; tap one to give them a sherpa.
 */
export function CrowdBand() {
  return (
    <div className={styles.band} data-stage="Back at base camp">
      <motion.h2 className={styles.line} {...reveal}>
        They’re still carrying everything themselves. <i>You don’t have to.</i>
      </motion.h2>
      <div className={styles.crowd}>
        <Crowd />
      </div>
    </div>
  )
}
