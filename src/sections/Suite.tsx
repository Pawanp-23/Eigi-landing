import { LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Mascot } from '../components/brand/Mascot.tsx'
import { CONTROL, ORG, SUITE, type Rule } from '../content/eigi.ts'
import { LINKS } from '../content/site.ts'
import { CREW } from '../lib/crew.ts'
import { cx } from '../lib/cx.ts'
import { calm, pop } from '../lib/motion.ts'
import { asItem, ruleSentence } from '../features/org/rules.ts'
import styles from './Suite.module.css'

type Exec = keyof typeof ORG

/**
 * Small team, full C-suite: an org chart with you at the top and four AI executives below.
 * Pick one to see what they own, and flip their rules yourself: AI pace, your call.
 */
export function Suite() {
  const reduced = useReducedMotion()
  const [exec, setExec] = useState<Exec>('sales')
  const [rules, setRules] = useState<Record<Exec, Rule[]>>(() => ({
    cos: ORG.cos.rules, sales: ORG.sales.rules, mkt: ORG.mkt.rules, ops: ORG.ops.rules,
  }))
  const crew = CREW[exec]
  const flip = (i: number) =>
    setRules((all) => ({ ...all, [exec]: all[exec].map((r, j) => (j === i ? { ...r, allowed: !r.allowed } : r)) }))

  return (
    <section className="section flushTop" aria-labelledby="suite-title">
      <div className="wrap">
        <div className={styles.card} style={{ ['--c' as string]: crew.color, ['--ct' as string]: crew.tint }}>
          <div className={styles.top}>
            <div className={styles.copy}>
              <div className="eyebrow"><img src="/favicon.jpg" alt="" />{SUITE.eyebrow}</div>
              <h2 id="suite-title">{SUITE.title} <span className="serif">{SUITE.titleSerif}</span></h2>
              <p className="lede">{SUITE.lede}</p>
              <div className={styles.row}>
                <a className="btn ink" href={LINKS.studio}>{SUITE.primary}</a>
                <a className="btn ghost" href="#route">{SUITE.secondary}</a>
              </div>
            </div>

            <div className={styles.chart}>
              <div className={styles.you}><span>{CONTROL.you}</span><small>{CONTROL.youRole}</small></div>
              <div className={styles.lines} aria-hidden="true" />
              <LayoutGroup>
                <div className={styles.execs} role="tablist" aria-label="Your AI executives">
                  {SUITE.roster.map((r) => {
                    const on = r.id === exec
                    return (
                      <button
                        key={r.id} type="button" role="tab" aria-selected={on}
                        className={cx(styles.exec, on && styles.on)}
                        style={{ ['--c' as string]: CREW[r.id].color }}
                        onClick={() => setExec(r.id as Exec)}
                      >
                        {on && <motion.span layoutId="exec-glow" className={styles.glow} transition={calm} />}
                        <motion.span className={styles.art} animate={{ y: on ? -6 : 0 }} transition={reduced ? { duration: 0 } : pop}>
                          <Mascot id={r.id} />
                        </motion.span>
                        <small>Chief of</small>
                        <b>{r.label}</b>
                      </button>
                    )
                  })}
                </div>
              </LayoutGroup>
            </div>
          </div>

          <div className={styles.drawer} role="tabpanel" aria-label={crew.name}>
            {/* keyed so a new exec's drawer fades in; no exit wait, so it can never get stuck */}
            <motion.div
                key={exec} className={styles.drawerGrid}
                initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div>
                  <div className="eyebrow">{CONTROL.owns}</div>
                  <ul className={styles.owns}>
                    {ORG[exec].owns.map((o) => <li key={o}>{o}</li>)}
                  </ul>
                </div>
                <div>
                  <div className={styles.rulesHead}>
                    <span className="eyebrow">{CONTROL.rules}</span>
                    <span className={styles.call}>{CONTROL.title} <span className="serif">{CONTROL.titleSerif}</span></span>
                  </div>
                  <div className={styles.rules}>
                    {rules[exec].map((r, i) => (
                      <button key={r.action} type="button" className={styles.rule} onClick={() => flip(i)} aria-pressed={r.allowed}>
                        <span>{asItem(r.action)}</span>
                        <span className={cx(styles.switch, r.allowed && styles.allowed)}>
                          <em>{r.allowed ? CONTROL.allowed : CONTROL.ask}</em>
                          <span className={styles.track}><motion.i layout transition={reduced ? { duration: 0 } : pop} /></span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className={styles.sentence} aria-live="polite">{ruleSentence(crew.name, rules[exec])}</p>
                  <div className={styles.foot}>
                    <span className="fine">{CONTROL.note}</span>
                    <a className="tlink" href={LINKS.docs} target="_blank" rel="noopener noreferrer">{CONTROL.docs} ↗</a>
                  </div>
                </div>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
