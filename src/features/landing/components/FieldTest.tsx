import { motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { useLoad } from '../state/useLoad.ts'
import { fieldTestMessage, whatsappLink } from '../utils/amit.ts'
import styles from './FieldTest.module.css'

/** One request, three checkpoints, one flag. Illustrative workflows we build with teams. */
const TESTS = [
  {
    name: 'Customer care', from: 'A customer gets in touch', ask: '“Can I move my appointment to Friday?”',
    checkpoints: ['Understand the request', 'Check your calendar and policies', 'Confirm the change, or ask your team'],
    flag: 'Customer helped. Your focus intact.', tools: ['Your inbox', 'Your calendar'],
  },
  {
    name: 'Sales & growth', from: 'A new lead fills in your form', ask: '“We’re a 12-person agency. Can you help us with onboarding?”',
    checkpoints: ['Research the company', 'Score the fit against your best customers', 'Reply and book a call'],
    flag: 'Lead answered in minutes. Pipeline moving.', tools: ['Your website', 'Your CRM'],
  },
  {
    name: 'Operations', from: 'An invoice lands in your inbox', ask: '“Invoice #4471 from your supplier, due in 14 days.”',
    checkpoints: ['Read the invoice', 'Match it to the order', 'File it, or flag what doesn’t match'],
    flag: 'Books up to date. Busywork gone.', tools: ['Your inbox', 'Your accounting'],
  },
]

/** Field test: pick a kind of work and watch a request walk the trail to a planted flag. */
export function FieldTest() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4, once: true })
  const still = useReducedMotion()
  const { load } = useLoad()
  // open on the kind of work the visitor said is heaviest
  const [tab, setTab] = useState(load?.fieldTest ?? 0)
  const [run, setRun] = useState(0)
  const [step, setStep] = useState(0) // 0 start · 1-3 checkpoints reached · 4 flag planted
  const test = TESTS[tab]

  useEffect(() => {
    if (!inView || still) return
    const timers = [0, 1, 2, 3, 4].map((n) => window.setTimeout(() => setStep(n), n === 0 ? 0 : 500 + n * 750))
    return () => timers.forEach(window.clearTimeout)
  }, [inView, still, tab, run])

  const shown = still ? 4 : step
  const choose = (i: number) => { setTab(i); setRun((n) => n + 1) }

  return (
    <section id="field-test" className={styles.field} data-stage="Field test">
      <div className={styles.head}>
        <div>
          <motion.p className="eyebrow mono" {...reveal}>Field test · less busywork, more business</motion.p>
          <motion.h2 {...reveal}>Make room for your next big thing.</motion.h2>
        </div>
        <motion.p className="lead" {...reveal}>
          Start with the work that slows you down. We’ll help you find a better way to do it.
        </motion.p>
      </div>

      <motion.div className={styles.tabs} role="tablist" aria-label="Kinds of work" {...reveal}>
        {TESTS.map((t, i) => (
          <button key={t.name} type="button" role="tab" aria-selected={i === tab} className={cx('mono', i === tab && styles.on)} onClick={() => choose(i)}>
            {t.name}
          </button>
        ))}
      </motion.div>

      <motion.div ref={ref} className={styles.card} role="tabpanel" aria-label={`${test.name} field test`} {...reveal}>
        <div className={styles.request}>
          <p className={cx(styles.from, 'mono')}>{test.from}</p>
          <p className={styles.ask}>{test.ask}</p>
        </div>

        {/* the trail: a dashed path that fills as the request reaches each checkpoint */}
        <ol className={styles.trail} style={{ ['--fill' as string]: `${(Math.min(shown, 3) / 3) * 100}%` }}>
          {test.checkpoints.map((c, i) => (
            <li key={c} className={cx(shown >= i + 1 && styles.reached)}>
              <span className={styles.camp} aria-hidden="true">{shown >= i + 1 ? '✓' : ''}</span>
              <span className={cx(styles.num, 'mono')}>Checkpoint {['I', 'II', 'III'][i]}</span>
              <span className={styles.what}>{c}</span>
            </li>
          ))}
        </ol>

        <div className={cx(styles.flag, shown >= 4 && styles.planted)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 22V3M5 4h12l-3 4 3 4H5" /></svg>
          <span>{test.flag}</span>
        </div>

        <div className={styles.foot}>
          <span className={cx(styles.tools, 'mono')}>
            {test.tools[0]} <i>↔</i> Eigi <i>↔</i> {test.tools[1]}
          </span>
          <span className={styles.links}>
            <button type="button" className={cx(styles.replay, 'mono')} onClick={() => setRun((n) => n + 1)}>↻ Run again</button>
            <a className={styles.amit} href={whatsappLink(fieldTestMessage(test.name))} target="_blank" rel="noopener noreferrer">
              Try this with Amit <span aria-hidden="true">→</span>
            </a>
          </span>
        </div>
      </motion.div>

      <motion.p className={cx(styles.note, 'mono')} {...reveal}>
        Illustrative workflows · Already exploring Claude, GPT or agents? We make the right tools work together.
      </motion.p>
    </section>
  )
}
