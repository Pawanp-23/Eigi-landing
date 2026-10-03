import { motion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { STUDIO_URL } from '../../../components/layout/Nav.tsx'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { useTransmission } from '../hooks/useTransmission.ts'
import { CREW, MISSIONS, type CrewId } from '../utils/crew.ts'
import { Belay } from './Belay.tsx'
import styles from './Computer.module.css'

/** Five bars that pulse while a crew member is working or talking. */
function Wave({ on }: { on: boolean }) {
  return <span className={cx(styles.wave, on && styles.waveOn)} aria-hidden="true"><i /><i /><i /><i /><i /></span>
}

/**
 * Eigi Computer, met on the far side of the gateway: an AI C-suite you brief like a crew on a radio.
 * A dark console with a breathing halo and slow orbit rings (the gateway's horizon, echoed); pick a crew
 * member and their mission plays out as a live transmission. Illustrative, and labelled as such.
 */
export function Computer() {
  const consoleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(consoleRef, { amount: 0.35, once: true })
  const [crew, setCrew] = useState<CrewId>('staff')
  const [run, setRun] = useState(0)
  const member = CREW.find((c) => c.id === crew)!
  const t = MISSIONS[crew]
  const { stage, typed, done } = useTransmission(t, inView, run)
  const working = stage >= 2 && !done

  const pick = (id: CrewId) => { setCrew(id); setRun((n) => n + 1) }

  return (
    <section id="computer" className={styles.computer} data-stage="Eigi Computer">
      <div className={styles.aura} aria-hidden="true">
        <svg className={styles.orbits} viewBox="-500 -500 1000 1000">
          <ellipse rx="300" ry="190" /><ellipse rx="380" ry="240" /><ellipse rx="460" ry="290" />
        </svg>
      </div>

      <header className={styles.head}>
        <motion.p className="eyebrow mono" {...reveal}>Beyond the gateway · Eigi Computer</motion.p>
        <motion.h2 {...reveal}>Small team.<br />Full C-suite.</motion.h2>
        <motion.p className="lead" {...reveal}>
          Hire AI executives and keep your founding team as small as it is today. Brief them like a crew on the
          radio. They do the work and report back.
        </motion.p>
      </header>

      <motion.div ref={consoleRef} className={styles.console} {...reveal}>
        <div className={cx(styles.bar, 'mono')}>
          <span>Eigi Computer · crew channel</span>
          <span className={styles.air}><i /> On air</span>
          <span className={styles.illus}>Illustrative example</span>
        </div>

        <div className={styles.body}>
          <ul className={styles.crew} role="tablist" aria-label="Your AI crew">
            {CREW.map((c) => {
              const active = c.id === crew
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={cx(styles.member, active && styles.active)}
                    onClick={() => pick(c.id)}
                  >
                    <span className={styles.call}><span className="mono">{c.call}</span></span>
                    <span className={styles.who}>
                      <b>{c.role}</b>
                      <span className="mono">{active ? (working ? 'Transmitting' : 'On air') : c.mission}</span>
                    </span>
                    {active && <Wave on={working} />}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className={styles.log} role="tabpanel" aria-live="polite" aria-label={`${member.role}: ${member.mission}`}>
            <p className={cx(styles.mission, 'mono')}>Mission · {member.mission}</p>

            <div className={cx(styles.line, styles.you, stage >= 1 && styles.in)}>
              <span className={cx(styles.stamp, 'mono')}>{t.time} · You → {member.role}</span>
              <p>{t.ask}</p>
            </div>

            <div className={cx(styles.line, stage >= 2 && styles.in)}>
              <span className={cx(styles.stamp, 'mono')}>{t.time} · {member.role} <em>AI</em></span>
              <p className={styles.dim}>On it. Working in your browser and inbox now.</p>
              <ul className={styles.steps}>
                {t.steps.map((s, i) => (
                  <li key={s} className={cx(stage >= 3 + i && styles.ticked)}>
                    <span aria-hidden="true">{stage >= 3 + i ? '✓' : '·'}</span>{s}
                  </li>
                ))}
              </ul>
            </div>

            <div className={cx(styles.line, styles.reply, stage >= 3 + t.steps.length && styles.in)}>
              <span className={cx(styles.stamp, 'mono')}>{t.replyTime} · {member.role} <em>AI</em></span>
              <p>
                {t.reply.slice(0, typed)}
                {!done && stage >= 3 + t.steps.length && <span className={styles.caret} aria-hidden="true" />}
              </p>
              <p className={cx(styles.audit, 'mono', done && styles.in)}>✓ Every step is in the audit trail</p>
            </div>

            <div className={styles.compose}>
              <span>Message {member.role}</span>
              <button type="button" className={cx(styles.replay, 'mono')} onClick={() => setRun((n) => n + 1)}>
                ↻ Replay transmission
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p className={cx(styles.where, 'mono')} {...reveal}>
        Brief them in Slack, Teams or email · They work in your browser · One shared memory of your business
      </motion.p>
      <motion.div className={styles.ctas} {...reveal}>
        <a className="btn" href={STUDIO_URL}>Hire your crew in Studio <span aria-hidden="true">→</span></a>
        <a className={styles.alt} href="#route">Or have our engineers set it up <span aria-hidden="true">↓</span></a>
      </motion.div>

      <Belay />
    </section>
  )
}
