import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { Mascot } from '../components/brand/Mascot.tsx'
import { CHAPTERS, EXAMPLE } from '../content/eigi.ts'
import { cx } from '../lib/cx.ts'
import { rise } from '../lib/motion.ts'
import styles from './HowYourEigiWorks.module.css'

const Check = () => (
  <span className={styles.ck}>
    <svg viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5.2l2 2L8 3" /></svg>
  </span>
)

/** Four short chapters, each with a live example of the same job: 20 clinic intros, start to finish. */
export function HowYourEigiWorks() {
  const demos: ReactNode[] = [<AskDemo key="ask" />, <ComputerDemo key="computer" />, <MemoryDemo key="memory" />, <ApprovalDemo key="approval" />]
  return (
    <section className="section flushTop" id="how" aria-label="How your Eigi works">
      <div className="wrap">
        {CHAPTERS.map((c, i) => (
          <div key={c.n} className={cx(styles.chap, i % 2 === 1 && styles.flip)} style={{ ['--c' as string]: `var(--${c.color})`, ['--ct' as string]: `var(--${c.color}-t)` }}>
            <div className={styles.copy}>
              <div className="eyebrow">{c.n} · Meet your Eigi</div>
              <h2>{c.title} <span className="serif">{c.titleSerif}</span></h2>
              <p className="lede">{c.lede}</p>
              <div className={styles.cap}>{c.caption}</div>
            </div>
            <div className={styles.demo}><motion.div {...rise}>{demos[i]}</motion.div></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function AskDemo() {
  const [channel, setChannel] = useState(0)
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}><b>Your Eigi</b><span>Illustrative example</span></div>
      <div className={styles.chans} role="group" aria-label="Where you message your Eigi">
        {EXAMPLE.channels.map((ch, i) => (
          <button key={ch} type="button" aria-pressed={i === channel} onClick={() => setChannel(i)}>{ch}</button>
        ))}
      </div>
      <div className={styles.bubble}>{EXAMPLE.ask}</div>
      <div className={styles.bubbleMeta}><span className={styles.h}><Mascot id="cos" head /></span>{EXAMPLE.ack}</div>
    </div>
  )
}

function ComputerDemo() {
  return (
    <div className={styles.card}>
      <div className={styles.browser}><i /><i /><i /><span>{EXAMPLE.browserBar}</span></div>
      {EXAMPLE.steps.map((s) => (
        <div key={s.text} className={styles.bstep}><Check /><span>{s.text}</span><small>{s.detail}</small></div>
      ))}
    </div>
  )
}

function MemoryDemo() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}><b>Company memory</b><span>Shared with your founders</span></div>
      {EXAMPLE.memory.map((m) => (
        <div key={m.label} className={styles.mem}><span>{m.label}</span><span>{m.text}</span></div>
      ))}
    </div>
  )
}

function ApprovalDemo() {
  const a = EXAMPLE.approval
  const [state, setState] = useState<'waiting' | 'approved' | 'saved'>('waiting')
  return (
    <div>
      <div className={styles.ok}>
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
      </div>
      <div className={styles.trail}>
        {a.trail.map((t) => <div key={t} style={{ ['--dot' as string]: 'var(--green)' }}><i />{t}</div>)}
        <div style={{ ['--dot' as string]: state === 'approved' ? 'var(--green)' : 'var(--yellow)' }}>
          <i />{state === 'approved' ? a.trailApproved : a.status}
        </div>
      </div>
    </div>
  )
}
