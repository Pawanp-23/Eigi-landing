import { AnimatePresence, motion } from 'motion/react'
import { cx } from '../../../utils/cx.ts'
import { useCompanion } from '../hooks/useCompanion.ts'
import { Sherpie } from '../sherpie/Sherpie.tsx'
import type { Pose } from '../sherpie/draw.ts'
import styles from './Companion.module.css'

/**
 * Sherpie walking beside you, bottom-left: strides while you scroll, turns round when you scroll back,
 * looks over its shoulder when you stop, and says one short thing at each part of the climb.
 * Decorative (the page says everything it says), so it is hidden from assistive tech.
 */
export function Companion() {
  const { visible, beat, stride, facingBack, talking, dark } = useCompanion()
  const walking = stride !== null
  const pose: Pose = {
    ...beat.pose,
    ...(walking && { legs: stride ? 'walkA' : 'walkB', ...(beat.pose.arms ? {} : { arms: stride ? 'swingA' : 'swingB' }) }),
    shadow: true,
    dark,
  }

  return (
    <motion.div
      className={styles.companion}
      aria-hidden="true"
      initial={false}
      animate={{ y: visible ? 0 : 140, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <AnimatePresence mode="wait">
        {visible && talking && (
          <motion.p
            key={beat.line}
            className={cx(styles.bubble)}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {beat.line}
          </motion.p>
        )}
      </AnimatePresence>
      <div className={cx(styles.figure, facingBack && styles.back, walking && styles.walking)}>
        <Sherpie {...pose} />
      </div>
    </motion.div>
  )
}
