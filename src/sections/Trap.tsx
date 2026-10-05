import { useState, type CSSProperties } from 'react'
import { track } from '../lib/analytics.ts'
import { amit } from '../content/site.ts'
import { CUSTOMER_STOPS as CUSTOMERS, CUSTOMERS_PER_EIGI, eigisFor, hiresFor, WHY } from '../content/why.ts'
import styles from './Trap.module.css'

const EIGI_COLOURS = ['var(--green)', 'var(--blue)', 'var(--red)', 'var(--yellow)']

/** A tiny person, for headcount. */
const Person = () => <svg viewBox="0 0 20 24" className={styles.person} aria-hidden="true"><circle cx="10" cy="6" r="5" /><path d="M1 24c0-6 4-10 9-10s9 4 9 10Z" /></svg>

/** the trap of growing by headcount, then the promise. */
export function Trap() {
  const [step, setStep] = useState(0)

  // Illustrative only: hiring adds a person for every few customers; one Eigi covers ten.
  const customers = CUSTOMERS[step]
  const hired = hiresFor(customers)
  const eigis = eigisFor(customers)
  const operating = 15 + step * 25
  const building = 72 + step * 6

  return (
    <section id="trap" className={`section ${styles.trapSection}`} aria-labelledby="trap-title">
      <div className="wrap">
        {/* 2. The trap */}
        <div className={styles.trap}>
          <div className={styles.trapCopy}>
            <p className="eyebrow dot">{WHY.trap.eyebrow}</p>
            <h2 id="trap-title">{WHY.trap.title[0]} <span className="serif">{WHY.trap.title[1]}</span></h2>
            <p className="lede">{WHY.trap.lede}</p>
            <label className={styles.scale}>
              <span>Your customers <b>{customers}</b></span>
              <input type="range" min={0} max={CUSTOMERS.length - 1} step={1} value={step} onChange={e => { const v = Number(e.target.value); setStep(v); track('trap_slider', { customers: CUSTOMERS[v] }) }} aria-valuetext={`${customers} customers`} />
              <span className={styles.ticks} aria-hidden="true">{CUSTOMERS.map(c => <i key={c}>{c}</i>)}</span>
            </label>
          </div>

          <div className={styles.roads}>
            <div className={styles.customers} aria-label={`${customers} customers`}>
              <span>Customers <b>{customers}</b></span>
              <div>{Array.from({ length: customers }, (_, i) => <i key={i} className={styles.pop} style={{ animationDelay: `${(i % 10) * 25}ms` }} />)}</div>
            </div>
            <div className={styles.road} data-kind="hire">
              <p className={styles.roadName}>{WHY.trap.hire.name}</p>
              <p className={styles.count}>Team <b>{hired}</b> people</p>
              <div className={styles.crowd} aria-label={`${hired} people`}>
                {Array.from({ length: hired }, (_, i) => <span key={i} className={styles.pop} style={{ animationDelay: `${(i % 3) * 60}ms` }}><Person /></span>)}
              </div>
              <p className={styles.bar}><span>Your week on running the team</span><i style={{ '--w': `${operating}%`, '--c': 'var(--red)' } as CSSProperties} /></p>
              <p className={styles.roadLine}>{WHY.trap.hire.line}</p>
            </div>
            <div className={styles.road} data-kind="eigi">
              <p className={styles.roadName}>{WHY.trap.eigi.name}</p>
              <p className={styles.count}>Team <b>{eigis}</b> {eigis === 1 ? 'Eigi' : 'Eigis'}</p>
              <div className={styles.crowd} aria-label={`${eigis} ${eigis === 1 ? 'Eigi' : 'Eigis'}`}>
                {Array.from({ length: eigis }, (_, i) => <span key={i} className={`${styles.pop} ${styles.eigi}`} style={{ background: EIGI_COLOURS[i % 4], animationDelay: `${(i % 4) * 60}ms` }} aria-hidden="true" />)}
              </div>
              <p className={styles.bar}><span>Your week on building</span><i style={{ '--w': `${building}%`, '--c': 'var(--green)' } as CSSProperties} /></p>
              <p className={styles.roadLine}>{WHY.trap.eigi.line}</p>
              <p className={styles.rule}><i aria-hidden="true" /> 1 Eigi for every {CUSTOMERS_PER_EIGI} customers</p>
            </div>
            <p className="fine">{WHY.trap.note}</p>
          </div>
        </div>

        {/* 3. The promise, as one compact band */}
        <div className={styles.promise}>
          <h3>{WHY.promise.title[0]} <span className="serif">{WHY.promise.title[1]}</span></h3>
          <ul className={styles.points}>
            {WHY.promise.points.map((p, i) => <li key={p.title} style={{ '--c': EIGI_COLOURS[i] } as CSSProperties}><strong>{p.title}</strong><span>{p.body}</span></li>)}
          </ul>
          <div className={styles.close}>
            <p>{WHY.promise.close}</p>
            <a className="btn ink" href={amit('I’m ambitious and want to move faster. Where should Eigi start?', 'promise')} target="_blank" rel="noopener noreferrer">Talk to Eigi ↗</a>
          </div>
        </div>
      </div>
    </section>
  )
}
