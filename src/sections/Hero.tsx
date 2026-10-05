import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react'
import mark from '../assets/brand/eigi-mark.jpg'
import { Sherpie } from '../components/brand/Sherpie.tsx'
import { BEATS, HERO, MEMORIES, roleFor, SCRIPTS, scriptFor, type Script } from '../content/hero.ts'
import { amit, ROLES } from '../content/site.ts'
import styles from './Hero.module.css'
import { track } from '../lib/analytics.ts'

type Tab = 'Browser' | 'Memory' | 'Files'
const TABS: Tab[] = ['Browser', 'Memory', 'Files']
const STEP_MS = 650

const SHERPIE_SAYS = ['Hand me something boring.', 'I set them up. They do the work.', 'Psst. Try the invoices one.', 'I don’t send anything without you.']

/** The hero is the demo: type a job, watch an Eigi do it on its computer, then approve it yourself. */
export function Hero() {
  const [draft, setDraft] = useState('')
  const [script, setScript] = useState<Script | null>(null)
  const [tick, setTick] = useState(0)
  const [decision, setDecision] = useState<'pending' | 'editing' | 'sent'>('pending')
  const [message, setMessage] = useState('')
  const [tab, setTab] = useState<Tab | null>(null)

  const steps = script?.steps.length ?? 0
  const total = steps + MEMORIES.length
  const beat = !script ? 0 : tick < steps ? 1 : tick < total ? 2 : 3
  const shownTab: Tab = tab ?? (beat === 2 ? 'Memory' : beat === 3 ? 'Files' : 'Browser')
  const role = ROLES[script?.role ?? roleFor(draft)]

  useEffect(() => {
    if (!script || tick >= total) return
    const t = setTimeout(() => setTick(v => v + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [script, tick, total])

  const run = (task: string) => {
    const s = scriptFor(task.trim())
    track('hand_over_job', { role: s.role, example: SCRIPTS.some(x => x.ask === s.ask) ? 1 : 0 })
    setScript(s); setTick(0); setDecision('pending'); setMessage(s.draft); setTab(null); setDraft('')
  }
  const reset = () => { setScript(null); setTick(0); setDecision('pending'); setTab(null) }
  const submit = (e: FormEvent) => { e.preventDefault(); if (draft.trim()) run(draft) }

  const confetti = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 37) % 100}%`, delay: `${(i % 7) * 40}ms`, rot: `${(i * 53) % 360}deg`, dx: `${((i * 29) % 80) - 40}px`,
  })), [])

  return (
    <section id="try" className={styles.hero} aria-labelledby="hero-title">
      <svg className={styles.contours} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6].map(i => <path key={i} transform={`translate(${-i * 26} ${i * 24})`} d="M-150 640C80 700 175 510 110 370S75 180 220 150 305-50 240-100M1180 980C1080 740 1430 770 1340 500S1330 275 1520 205" />)}
      </svg>

      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow dot">{HERO.eyebrow}</p>
          <h1 id="hero-title">{HERO.title[0]}<br />{HERO.title[1]} <span className="serif">{HERO.title[2]}</span></h1>
          <p className="lede">{HERO.sub}</p>
          <div className={styles.proof}>
            <p><img src={mark} alt="" width="28" height="28" />{HERO.proof}</p>
            <a className="btn ink" href={amit('I would like to meet my Eigi and hand over a first job.', 'hero')} target="_blank" rel="noopener noreferrer">Talk to Eigi ↗</a>
          </div>
        </div>

        <div className={styles.stage}>
          <Sherpie hands className={styles.peek} lines={SHERPIE_SAYS} cheek={script ? role.color : undefined} />
          <div className={styles.card} style={{ '--role': role.color, '--role-t': role.tint } as CSSProperties}>
            <div className={styles.chrome}>
              <span className={styles.lights} aria-hidden="true"><i /><i /><i /></span>
              <span>Your Eigi’s computer</span>
              <span className={styles.who}>{script ? role.name : 'Waiting for a job'}</span>
            </div>
            <ol className={styles.beats} aria-label="How an Eigi works">
              {BEATS.map((b, i) => <li key={b.id} title={b.title} data-state={i < beat || decision === 'sent' ? 'done' : i === beat ? 'now' : 'next'}>
                <i aria-hidden="true">{i < beat || decision === 'sent' ? '✓' : i + 1}</i>{b.short}<span className="sr-only">: {b.title}</span>
              </li>)}
            </ol>

            {!script ? (
              <form className={styles.ask} onSubmit={submit}>
                <label htmlFor="job">What would you hand over today?</label>
                <div className={styles.field}>
                  <input id="job" value={draft} onChange={e => setDraft(e.target.value)} placeholder="e.g. Chase every unpaid invoice" autoComplete="off" />
                  <button type="submit" className="btn ink" disabled={!draft.trim()}>Hand it over</button>
                </div>
                <p className={styles.route} aria-live="polite">
                  {draft.trim() ? <>Goes to <b style={{ color: role.color }}>● {role.name}</b></> : 'Or pick one:'}
                </p>
                <ul className={styles.chips}>
                  {SCRIPTS.map(s => <li key={s.ask}><button type="button" onClick={() => run(s.ask)} style={{ '--chip': ROLES[s.role].color } as CSSProperties}>{s.ask}</button></li>)}
                </ul>
              </form>
            ) : (
              <div className={styles.work}>
                <p className={styles.you}><span>You</span>{script.ask}</p>
                <div className={styles.tabs} role="tablist" aria-label="Eigi’s computer">
                  {TABS.map(t => <button key={t} role="tab" type="button" aria-selected={shownTab === t} onClick={() => setTab(t)}>{t}</button>)}
                </div>
                <div className={styles.panel} role="tabpanel" aria-live="polite">
                  {shownTab === 'Browser' && <ul className={styles.log}>
                    {script.steps.map((s, i) => <li key={s} data-on={i < tick}>{i < tick ? '✓' : '·'} {s}</li>)}
                  </ul>}
                  {shownTab === 'Memory' && <ul className={styles.log}>
                    {MEMORIES.map((m, i) => <li key={m} data-on={tick > steps + i}>{tick > steps + i ? '◆' : '◇'} {m}</li>)}
                  </ul>}
                  {shownTab === 'Files' && (beat < 3 ? <p className={styles.wait}>Drafts land here when the work is done…</p> : (
                    <div className={styles.approval}>
                      <p className={styles.ask2}>{decision === 'sent' ? 'Sent. Every step is logged.' : script.approval}</p>
                      {decision === 'editing'
                        ? <textarea aria-label="Edit the draft" value={message} onChange={e => setMessage(e.target.value)} rows={3} />
                        : <blockquote>{message}</blockquote>}
                      {decision !== 'sent' ? <div className={styles.buttons}>
                        <button type="button" className={styles.approve} onClick={() => { setDecision('sent'); track('approve_draft', { role: script.role }) }}>Approve</button>
                        <button type="button" onClick={() => setDecision(d => d === 'editing' ? 'pending' : 'editing')}>{decision === 'editing' ? 'Done editing' : 'Edit'}</button>
                        <button type="button" onClick={reset}>Not now</button>
                      </div> : <div className={styles.buttons}>
                        <button type="button" onClick={reset}>Hand over another</button>
                        <a href={amit(`I would like an Eigi to do this for real: ${script.ask}`, 'hero-try')} target="_blank" rel="noopener noreferrer">Do this for real with Amit ↗</a>
                      </div>}
                    </div>
                  ))}
                </div>
                {decision === 'sent' && <div className={styles.confetti} aria-hidden="true">
                  {confetti.map((c, i) => <i key={i} style={{ left: c.left, animationDelay: c.delay, '--rot': c.rot, '--dx': c.dx } as CSSProperties} />)}
                </div>}
              </div>
            )}
            <p className={styles.note}>Illustrative preview, not a live agent. Your real Eigi checks with you before anything goes out in your name.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
