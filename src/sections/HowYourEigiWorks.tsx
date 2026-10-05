import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { Mascot } from '../components/brand/Mascot.tsx'
import { Heading } from '../components/ui/Heading.tsx'
import { CHAPTERS, EXAMPLE, HOW } from '../content/eigi.ts'
import { cx } from '../lib/cx.ts'
import { calm } from '../lib/motion.ts'
import styles from './HowYourEigiWorks.module.css'

const STEPS = CHAPTERS.length

const Check = () => (
  <span className={styles.ck}>
    <svg viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5.2l2 2L8 3" /></svg>
  </span>
)

/**
 * One job, start to finish. The section pins while you scroll; the step list on the left lights up
 * in turn and the single "Your Eigi" window on the right changes with it: the message, the work on
 * its own computer, the memory it uses, and the approval that waits for you.
 */
export function HowYourEigiWorks() {
  const reduced = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStep(Math.min(STEPS - 1, Math.floor(v * STEPS))))

  // clicking a step scrolls to the middle of its stretch, so scroll and clicks always agree
  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    const distance = el.offsetHeight - innerHeight
    scrollTo({ top: top + (distance * (i + 0.5)) / STEPS, behavior: reduced ? 'auto' : 'smooth' })
  }

  const c = CHAPTERS[step]
  const panels = [<AskPanel key="ask" />, <ComputerPanel key="computer" />, <MemoryPanel key="memory" />, <ApprovalPanel key="approval" />]

  return (
    <section className="section flushTop" id="how" aria-labelledby="how-title">
      <div className="wrap">
        <Heading eyebrow={HOW.eyebrow} title={HOW.title} serif={HOW.titleSerif} id="how-title" />
      </div>
      <div ref={track} className={styles.track}>
        <div className={`wrap ${styles.stage}`}>
          <ol className={styles.steps}>
            {CHAPTERS.map((ch, i) => (
              <li key={ch.n} className={cx(i === step && styles.on, i < step && styles.past)} style={{ ['--c' as string]: `var(--${ch.color})` }}>
                <button type="button" onClick={() => goTo(i)} aria-current={i === step ? 'step' : undefined}>
                  <span className={styles.n}>{ch.n}</span>
                  <span className={styles.title}>{ch.title} <span className="serif">{ch.titleSerif}</span></span>
                </button>
                <motion.div
                  className={styles.more}
                  initial={false}
                  animate={i === step ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={reduced ? { duration: 0 } : calm}
                >
                  <p>{ch.lede}</p>
                </motion.div>
              </li>
            ))}
          </ol>

          <div className={styles.frame} style={{ ['--c' as string]: `var(--${c.color})`, ['--ct' as string]: `var(--${c.color}-t)` }}>
            <div className={styles.window}>
              <div className={styles.bar}>
                <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
                <b>{HOW.window}</b>
                <span className={styles.chip}>{c.caption}</span>
              </div>
              <div className={styles.progress} aria-hidden="true">
                {CHAPTERS.map((ch, i) => <i key={ch.n} className={cx(i <= step && styles.filled)} />)}
              </div>
              <div className={styles.body}>
                {/* keyed per step: the new panel fades in at once, nothing waits on an exit */}
                <motion.div
                  key={step}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {panels[step]}
                </motion.div>
              </div>
            </div>
            <span className="fine">Illustrative example</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/** items that arrive one after another inside a panel */
const seq = (i: number, base = 0.15) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { ...calm, delay: base + i * 0.22 },
})

function AskPanel() {
  const [channel, setChannel] = useState(0)
  return (
    <div className={styles.ask}>
      <div className={styles.chans} role="group" aria-label="Where you message your Eigi">
        {EXAMPLE.channels.map((ch, i) => (
          <button key={ch} type="button" aria-pressed={i === channel} onClick={() => setChannel(i)}>{ch}</button>
        ))}
      </div>
      <motion.div className={styles.bubble} {...seq(0)}>{EXAMPLE.ask}</motion.div>
      <motion.div className={styles.reply} {...seq(1, 0.5)}>
        <span className={styles.h}><Mascot id="cos" head /></span>
        <span>{EXAMPLE.ack}</span>
      </motion.div>
    </div>
  )
}

function ComputerPanel() {
  return (
    <div>
      <div className={styles.browser}><i /><i /><i /><span>{EXAMPLE.browserBar}</span></div>
      <div className={styles.split}>
        <ul className={styles.ticks}>
          {EXAMPLE.steps.map((s, i) => (
            <motion.li key={s.text} {...seq(i)}><Check /><span>{s.text}<small>{s.detail}</small></span></motion.li>
          ))}
        </ul>
        <motion.div className={styles.sheet} {...seq(2)}>
          <div className={styles.sheetHead}><span>Clinic</span><span>Booking</span></div>
          {EXAMPLE.sheet.map((r, i) => (
            <motion.div key={r.name} className={styles.row} {...seq(i, 0.7)}>
              <span>{r.name}</span><span>{r.booking}</span>
            </motion.div>
          ))}
          <div className={styles.more2}>{EXAMPLE.sheetMore}</div>
        </motion.div>
      </div>
    </div>
  )
}

function MemoryPanel() {
  return (
    <div className={styles.memory}>
      <div className={styles.memHead}>Company memory <span>Shared with your founders</span></div>
      {EXAMPLE.memory.map((m, i) => (
        <motion.div key={m.label} className={styles.mem} {...seq(i)}>
          <span>{m.label}</span><span>{m.text}</span>
        </motion.div>
      ))}
    </div>
  )
}

function ApprovalPanel() {
  const a = EXAMPLE.approval
  const [state, setState] = useState<'waiting' | 'approved' | 'saved'>('waiting')
  return (
    <div>
      <motion.div className={styles.ok} {...seq(0)}>
        <span className={styles.okTag}>{a.status}</span>
        <p>{a.question}</p>
        <blockquote>{a.draft}</blockquote>
        {state === 'waiting' && (
          <div className={styles.acts}>
            <button type="button" className="sbtn primary" onClick={() => setState('approved')}>{a.yes}</button>
            <button type="button" className="sbtn" onClick={() => setState('saved')}>{a.no}</button>
          </div>
        )}
        {state === 'approved' && <div className={styles.okDone}>{a.approved}</div>}
        {state === 'saved' && <div className={cx(styles.okDone, styles.muted)}>{a.saved}</div>}
        <span className="fine">{a.tryIt}</span>
      </motion.div>
      <div className={styles.trail}>
        {a.trail.map((t, i) => <motion.div key={t} style={{ ['--dot' as string]: 'var(--green)' }} {...seq(i + 1)}><i />{t}</motion.div>)}
        <motion.div style={{ ['--dot' as string]: state === 'approved' ? 'var(--green)' : 'var(--yellow)' }} {...seq(3)}>
          <i />{state === 'approved' ? a.trailApproved : a.status}
        </motion.div>
      </div>
    </div>
  )
}
