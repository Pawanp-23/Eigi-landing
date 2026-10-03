import { motion } from 'motion/react'
import { useState } from 'react'
import { DOCS_URL } from '../../../components/layout/Nav.tsx'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { RULES, logLine, type Mode } from '../utils/crew.ts'
import styles from './Belay.module.css'

/**
 * "AI pace. Your call.": the approval rules, as a climber's belay board. Each action is either a free
 * climb (the crew just does it) or belayed (it waits for your OK). Flip one and the climb log rewrites.
 */
export function Belay() {
  const [modes, setModes] = useState<Record<string, Mode>>(() => Object.fromEntries(RULES.map((r) => [r.id, r.defaultMode])))
  const set = (id: string, mode: Mode) => setModes((m) => ({ ...m, [id]: mode }))

  return (
    <div className={styles.belay}>
      <div className={styles.copy}>
        <motion.p className="eyebrow mono" {...reveal}>You’re in charge</motion.p>
        <motion.h3 {...reveal}>AI pace.<br />Your call.</motion.h3>
        <motion.p className={styles.lead} {...reveal}>
          Your crew doesn’t wait for a standup. They look things up and write drafts on their own. Anything that goes
          out in your name stays on belay until you say OK. Every move is logged, so you can check their work the way
          you’d check a new hire’s.
        </motion.p>
        <motion.a className={cx(styles.docs, 'mono')} href={DOCS_URL} target="_blank" rel="noopener noreferrer" {...reveal}>
          Explore the documentation ↗
        </motion.a>
      </div>

      <motion.div className={styles.board} {...reveal}>
        <p className={cx(styles.label, 'mono')}>Belay board · flip a rope</p>
        <ul className={styles.rules}>
          {RULES.map((r) => {
            const mode = modes[r.id]
            return (
              <li key={r.id}>
                <span className={styles.action}>{r.action}</span>
                <span className={styles.switch} role="radiogroup" aria-label={r.action}>
                  {(['free', 'belay'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="radio"
                      aria-checked={mode === m}
                      className={cx('mono', mode === m && styles.on)}
                      onClick={() => set(r.id, m)}
                    >
                      {m === 'free' ? 'Free climb' : 'Belay'}
                    </button>
                  ))}
                  <i className={cx(styles.thumb, mode === 'belay' && styles.right)} aria-hidden="true" />
                </span>
              </li>
            )
          })}
        </ul>

        <p className={cx(styles.label, 'mono')}>Climb log</p>
        <ol className={styles.log} aria-live="polite">
          {RULES.map((r) => {
            const mode = modes[r.id]
            return (
              <li key={r.id} className={cx('mono', mode === 'belay' && styles.held)}>
                <span aria-hidden="true">{mode === 'free' ? '✓' : '⏸'}</span>
                {/* keyed by mode: the new line swaps in at once and fades up, no waiting on the old one */}
                <span key={mode} className={styles.entry}>{logLine(r, mode)}</span>
              </li>
            )
          })}
        </ol>
        <p className={styles.note}>Example rules. You choose what needs your OK.</p>
      </motion.div>
    </div>
  )
}
