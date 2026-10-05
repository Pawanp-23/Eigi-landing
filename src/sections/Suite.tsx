import { Mascot } from '../components/brand/Mascot.tsx'
import { CONTROL, SUITE } from '../content/eigi.ts'
import { LINKS } from '../content/site.ts'
import styles from './Suite.module.css'

/** Small team, full C-suite, and the rules that keep you in charge of it. */
export function Suite() {
  return (
    <section className="section flushTop" aria-labelledby="suite-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.main}>
          <div className="eyebrow"><img src="/favicon.jpg" alt="" />{SUITE.eyebrow}</div>
          <h2 id="suite-title">{SUITE.title} <span className="serif">{SUITE.titleSerif}</span></h2>
          <p className="lede">{SUITE.lede}</p>
          <div className={styles.roster}>
            {SUITE.roster.map((r) => (
              <div key={r.id}><Mascot id={r.id} /><small>Chief of</small><b>{r.label}</b></div>
            ))}
          </div>
          <div className={styles.row}>
            <a className="btn ink" href={LINKS.studio}>{SUITE.primary}</a>
            <a className="btn ghost" href="#route">{SUITE.secondary}</a>
          </div>
        </div>

        <div className={styles.control}>
          <div className="eyebrow dot">{CONTROL.eyebrow}</div>
          <h3>{CONTROL.title} <span className="serif">{CONTROL.titleSerif}</span></h3>
          <p className="lede">{CONTROL.lede}</p>
          <div className={styles.rules}>
            {CONTROL.rules.map((r) => (
              <div key={r.text} className={r.allowed ? styles.allow : styles.ask}>
                <span className={styles.ic} aria-hidden="true">{r.allowed ? '✓' : '?'}</span>
                <span>{r.text}</span>
                <strong>{r.allowed ? 'Allowed' : 'Ask first'}</strong>
              </div>
            ))}
          </div>
          <span className="fine">{CONTROL.note}</span>
          <a className="tlink" href={LINKS.docs} target="_blank" rel="noopener noreferrer">{CONTROL.docs} ↗</a>
        </div>
      </div>
    </section>
  )
}
