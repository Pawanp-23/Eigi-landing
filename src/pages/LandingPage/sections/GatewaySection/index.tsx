import { useEffect, useState, type CSSProperties } from 'react'
import mark from '../../../../assets/Images/eigi-mark.jpg'
import { GATEWAY } from '../../content/gateway.ts'
import styles from './Gateway.module.css'
import { track } from '../../../../utils/analytics.ts'

type Part = 'you' | 'sherpa' | 'eigi'

/** A tiny icon per part: a person, a rope team, and the Eigi mark. */
function Icon({ id }: { id: Part }) {
  if (id === 'eigi') return <img src={mark} alt="" width="44" height="44" />
  return <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    {id === 'you'
      ? <><circle cx="24" cy="16" r="7" /><path d="M10 40c2-9 8-13 14-13s12 4 14 13" /></>
      : <><circle cx="15" cy="17" r="5.5" /><circle cx="33" cy="17" r="5.5" /><path d="M5 38c1.5-7 5.5-10 10-10s8.5 3 10 10M23 38c1.5-7 5.5-10 10-10s8.5 3 10 10" /><path d="M20 22c3 3 5 3 8 0" strokeDasharray="2 3" /></>}
  </svg>
}

/** You + forward-deployed engineers + your Eigis = a gateway. Each part you switch on opens the doors a third. */
export default function GatewaySection() {
  const [on, setOn] = useState<Record<Part, boolean>>({ you: false, sherpa: false, eigi: false })
  const parts = GATEWAY.parts.map(p => p.id as Part)
  const key = parts.filter(p => on[p]).join('+')
  const count = parts.filter(p => on[p]).length
  const open = count === 3
  useEffect(() => { if (open) track('gateway_opened') }, [open])

  return (
    <section id="gateway" className={`section ${styles.gateway}`} aria-labelledby="gateway-title">
      <div className="wrap">
        <div className={styles.head}>
          <p className="eyebrow dot">{GATEWAY.eyebrow}</p>
          <h2 id="gateway-title">Your gateway <span className="serif">to singularity.</span></h2>
          <p className="lede">{GATEWAY.lede}</p>
        </div>

        <div className={styles.equation}>
          <div className={styles.parts} role="group" aria-label="The three parts of Eigi">
            {GATEWAY.parts.map((p, i) => <div key={p.id} className={styles.slot}>
              {i > 0 && <span className={styles.op} aria-hidden="true">+</span>}
              <button type="button" className={styles.part} aria-pressed={on[p.id as Part]} onClick={() => setOn(o => ({ ...o, [p.id]: !o[p.id as Part] }))}>
                <span className={styles.icon}><Icon id={p.id as Part} /></span>
                <span className={styles.title}>{p.title}</span>
                <span className={styles.note}>{p.note}</span>
                <span className={styles.switch} aria-hidden="true"><i /></span>
              </button>
            </div>)}
          </div>

          <span className={styles.op} aria-hidden="true">=</span>

          <div className={styles.portal} data-open={open} style={{ '--open': count / 3 } as CSSProperties}>
            <div className={styles.frame} aria-hidden="true">
              <svg className={styles.rings} viewBox="0 0 100 100">{[46, 38, 30, 22, 14].map(r => <circle key={r} cx="50" cy="50" r={r} />)}</svg>
              <span className={styles.infinity}>∞</span>
              <span className={styles.doorL} />
              <span className={styles.doorR} />
            </div>
            <p className={styles.outcome} aria-live="polite">{GATEWAY.outcomes[key]}</p>
          </div>
        </div>

        <div className={styles.foot}>
          <p className={styles.vision} data-open={open}>{GATEWAY.vision}</p>
          <ul className={styles.stats}>
            {GATEWAY.stats.map(s => <li key={s.figure}><b>{s.figure}</b><span>{s.claim} <a href={s.href} target="_blank" rel="noopener noreferrer">{s.source} ↗</a></span></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
