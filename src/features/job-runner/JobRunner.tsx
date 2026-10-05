import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Mascot } from '../../components/brand/Mascot.tsx'
import { RichText } from '../../components/ui/RichText.tsx'
import { FIRST_JOBS, HIRE_ROLES } from '../../content/eigi.ts'
import { CREW } from '../../lib/crew.ts'
import { cx } from '../../lib/cx.ts'
import { calm, pop } from '../../lib/motion.ts'
import { stagesOf } from './stages.ts'
import styles from './JobRunner.module.css'

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** How far a job has got: stages before `stage` are done; `waitingOk` means the approve buttons show. */
interface Progress { stage: number; waitingOk: boolean; finished: boolean; kept?: boolean }
const FINISHED: Progress = { stage: 4, waitingOk: false, finished: true }

/** Pick the hire you're putting off, pick a job, and watch an Eigi do it, with your OK in the middle. */
export function JobRunner() {
  const reduced = useReducedMotion() ?? false
  const [roleId, setRoleId] = useState(HIRE_ROLES[0].id)
  const [jobIndex, setJobIndex] = useState(0)
  const [progress, setProgress] = useState<Progress>(FINISHED)
  const run = useRef(0)
  const started = useRef(false)
  const answer = useRef<(approved: boolean) => void>(() => {})

  const role = HIRE_ROLES.find((r) => r.id === roleId) ?? HIRE_ROLES[0]
  const job = role.jobs[jobIndex]
  const crew = CREW[role.crew]
  const stages = stagesOf(job)

  const start = useCallback(async (nextRole: string, nextJob: number) => {
    started.current = true
    const me = ++run.current
    setRoleId(nextRole)
    setJobIndex(nextJob)
    if (reduced) return setProgress(FINISHED)
    const steps = stagesOf((HIRE_ROLES.find((r) => r.id === nextRole) ?? HIRE_ROLES[0]).jobs[nextJob])
    for (let s = 0; s < steps.length; s++) {
      if (me !== run.current) return
      if (steps[s].needsOk) {
        setProgress({ stage: s, waitingOk: true, finished: false })
        // waits for a tap, or answers itself after a pause
        const approved = await new Promise<boolean>((resolve) => {
          const timer = setTimeout(() => resolve(true), 2200)
          answer.current = (yes) => { clearTimeout(timer); resolve(yes) }
        })
        if (!approved) {
          if (me === run.current) setProgress({ stage: s, waitingOk: false, finished: false, kept: true })
          return
        }
      } else {
        setProgress({ stage: s, waitingOk: false, finished: false })
        await wait(1100)
      }
    }
    if (me === run.current) setProgress(FINISHED)
  }, [reduced])

  useEffect(() => () => { run.current += 1 }, [])

  return (
    <div className={styles.grid}>
      <div>
        <div className="eyebrow" id="hire-roles">{FIRST_JOBS.rolesLabel}</div>
        <div className={styles.roles} role="group" aria-labelledby="hire-roles">
          {HIRE_ROLES.map((r) => (
            <button key={r.id} type="button" aria-pressed={r.id === roleId} onClick={() => start(r.id, 0)}>{r.label}</button>
          ))}
        </div>
        <div className={styles.jobs} role="group" aria-label="First jobs">
          {role.jobs.map((j, i) => (
            <button
              key={j.title} type="button" className={styles.job} aria-pressed={i === jobIndex}
              style={{ ['--c' as string]: crew.color, ['--ct' as string]: crew.tint }}
              onClick={() => start(role.id, i)}
            >
              <span className={styles.h}><Mascot id={role.crew} head /></span>
              <span><b>{j.title}</b><small>{j.detail}</small></span>
              <span className={styles.ar} aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className={styles.run}
        viewport={{ once: true, amount: 0.5 }}
        onViewportEnter={() => {
          if (started.current || reduced) return
          started.current = true
          start(HIRE_ROLES[0].id, 0)
        }}
        style={{ ['--c' as string]: crew.color, ['--ct' as string]: crew.tint }} aria-live="polite">
        <div className={styles.q}><small>{crew.name}</small>“{job.title}”</div>
        <div className={styles.stages}>
          {stages.map((s, i) => {
            const done = progress.finished || i < progress.stage
            const active = !progress.finished && i === progress.stage
            const kept = progress.kept && active
            const text = kept ? FIRST_JOBS.kept : done || active ? s.text : ''
            return (
              <div key={s.name} className={cx(styles.stg, done && styles.ok, active && !progress.waitingOk && !kept && styles.on, !done && !active && styles.wait)}>
                <span className={styles.dot}>
                  <svg viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5.2l2 2L8 3" /></svg>
                </span>
                <span>
                  <b>{s.name}</b>
                  <span className={styles.d}>
                    {s.needsOk && done ? FIRST_JOBS.approved : text}
                    {active && progress.waitingOk && (
                      <span className={styles.acts}>
                        <button type="button" className="sbtn primary" onClick={() => answer.current(true)}>Approve</button>
                        <button type="button" className="sbtn" onClick={() => answer.current(false)}>Edit first</button>
                      </span>
                    )}
                  </span>
                </span>
              </div>
            )
          })}
        </div>
        {progress.finished && (
          <motion.div className={styles.result} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={calm}>
            <motion.span className={styles.rh} initial={reduced ? false : { scale: 0.7 }} animate={{ scale: 1 }} transition={pop}><Mascot id={role.crew} head /></motion.span>
            <span><RichText text={job.result} /></span>
          </motion.div>
        )}
        <div className={styles.start}>
          <b>{FIRST_JOBS.startLabel}</b>
          {FIRST_JOBS.start.map((s, i) => <span key={s}>{i + 1}. {s}</span>)}
        </div>
      </motion.div>
    </div>
  )
}
