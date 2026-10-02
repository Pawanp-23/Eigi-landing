import { motion, useScroll, useTransform } from 'motion/react'
import { cx } from '../../../utils/cx.ts'
import styles from './Altimeter.module.css'

const SUMMIT_M = 8848

/** Where on the page (0–1) each stage of the climb begins. */
const STAGES: [at: number, label: string][] = [
  [0, 'Base camp'],
  [0.08, 'The problem'],
  [0.17, 'Where we stand'],
  [0.38, 'Camp I'],
  [0.5, 'Camp II'],
  [0.61, 'Camp III'],
  [0.71, 'Camp IV'],
  [0.78, 'With your sherpa'],
  [0.87, 'Summit'],
]

/** Fixed scroll-progress gauge: page progress shown as altitude on Everest. */
export function Altimeter() {
  const { scrollYProgress } = useScroll()
  const altitude = useTransform(scrollYProgress, (p) => `${Math.round(p * SUMMIT_M).toLocaleString('en-US')} m`)
  const stage = useTransform(scrollYProgress, (p) => STAGES.findLast(([at]) => p >= at)![1])

  return (
    <div className={styles.altimeter} aria-hidden="true">
      <div className={styles.readout}>
        <motion.div className={cx(styles.altitude, 'mono')}>{altitude}</motion.div>
        <motion.div className={cx(styles.stage, 'mono')}>{stage}</motion.div>
      </div>
      <div className={styles.bar}>
        <motion.div className={styles.fill} style={{ scaleY: scrollYProgress }} />
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} className={styles.tick} style={{ bottom: `${i * 10}%` }} />
        ))}
      </div>
    </div>
  )
}
