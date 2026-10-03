import { AnimatePresence, motion } from 'motion/react'
import { cx } from '../../../utils/cx.ts'
import { Sherpie } from '../sherpie/Sherpie.tsx'
import type { Pose } from '../sherpie/draw.ts'
import type { Load } from '../utils/loads.ts'
import styles from './SherpiePeek.module.css'

export type PeekState = 'hidden' | 'peek' | 'out'

type Props = {
  state: PeekState
  role: string
  nextRole: string
  load: Load | null
  onShow: () => void
  onNext: () => void
  onAmit: () => void
}

/* how far Sherpie rises above the console's top edge (it hides behind the console) */
const RISE: Record<PeekState, string> = { hidden: '8%', peek: '-34%', out: '-84%' }
const POSE: Record<PeekState, Pose> = {
  hidden: { eyes: 'closed', mouth: 'small', dark: true, shadow: false },
  peek: { eyes: 'big', mouth: 'small', dark: true, shadow: false },
  out: { arms: 'wave', eyes: 'happy', mouth: 'open', blush: true, dark: true, shadow: false },
}

/**
 * Hide-and-seek in Eigi Computer: Sherpie ducks behind the console while the crew works, peeks over the
 * edge (tap to bring it out), and pops up when the transmission ends to talk to you about your own crew.
 */
export function SherpiePeek({ state, role, nextRole, load, onShow, onNext, onAmit }: Props) {
  return (
    <div className={styles.peek}>
      <motion.button
        type="button"
        className={styles.sherpie}
        animate={{ y: RISE[state], opacity: state === 'hidden' ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: state === 'out' ? 11 : 18 }}
        onClick={onShow}
        aria-label="Sherpie is hiding behind the console. Bring it out."
        tabIndex={state === 'peek' ? 0 : -1}
      >
        <Sherpie {...POSE[state]} />
      </motion.button>

      <AnimatePresence>
        {state === 'out' && (
          <motion.div
            className={styles.bubble}
            role="status"
            initial={{ opacity: 0, x: 16, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.35, delay: 0.25 }}
          >
            <p className={cx(styles.who, 'mono')}>Sherpie</p>
            <p>
              Psst. That was your <b>{role}</b>.{' '}
              {load ? <>A crew like this could take <b>{load.yours}</b> off your hands.</> : <>Want a crew like this for your team?</>}
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.primary} onClick={onAmit}>Set it up with Amit →</button>
              <button type="button" className={cx(styles.secondary, 'mono')} onClick={onNext}>Meet the {nextRole}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
