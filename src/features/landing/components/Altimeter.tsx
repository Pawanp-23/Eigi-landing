import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useState, type RefObject } from 'react'
import { cx } from '../../../utils/cx.ts'
import { altitude as toAltitude } from '../utils/altitude.ts'
import { readStage } from '../utils/climb.ts'
import styles from './Altimeter.module.css'


/** Fixed scroll-progress gauge: climb progress shown as altitude on Everest. */
export function Altimeter({ climb }: { climb: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target: climb, offset: ['start start', 'end end'] })
  const altitude = useTransform(scrollYProgress, toAltitude)
  const [stage, setStage] = useState('Base camp') // page loads at the top; any scroll (incl. restored position) updates it
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', () => setStage(readStage()))
  // past the summit the footer takes over: fade the gauge out so it never sits on the contact form
  const { scrollYProgress: pastSummit } = useScroll({ target: climb, offset: ['end end', 'end 0.6'] })
  const opacity = useTransform(pastSummit, [0, 1], [1, 0])

  return (
    <motion.div className={styles.altimeter} style={{ opacity }} aria-hidden="true">
      <div className={styles.readout}>
        <motion.div className={cx(styles.altitude, 'mono')}>{altitude}</motion.div>
        <div className={cx(styles.stage, 'mono')}>{stage}</div>
      </div>
      <div className={styles.bar}>
        <motion.div className={styles.fill} style={{ scaleY: scrollYProgress }} />
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} className={styles.tick} style={{ bottom: `${i * 10}%` }} />
        ))}
      </div>
    </motion.div>
  )
}
