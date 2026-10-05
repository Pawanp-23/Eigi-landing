import { Heading } from '../components/ui/Heading.tsx'
import { PEOPLE } from '../content/people.ts'
import { LINKS } from '../content/site.ts'
import styles from './People.module.css'

/** The founders. Photos are black and white until you hover. */
export function People() {
  return (
    <section className="section flushTop" id="people" aria-labelledby="people-title">
      <div className={`wrap ${styles.grid}`}>
        <div>
          <Heading eyebrow={PEOPLE.eyebrow} title={PEOPLE.title} serif={PEOPLE.titleSerif} id="people-title" />
          <p className="lede" style={{ marginTop: 22 }}>{PEOPLE.lede}</p>
          <a className={`tlink ${styles.hello}`} href={`mailto:${LINKS.email}`}>{PEOPLE.cta} →</a>
        </div>
        <div className={styles.founders}>
          {PEOPLE.founders.map((f) => (
            <figure key={f.name} className={styles.founder}>
              <div className={styles.photo}><img src={f.img} alt={`${f.name}, ${f.role}`} loading="lazy" decoding="async" /></div>
              <figcaption>
                <b>{f.name}</b>
                <small>{f.role}</small>
                <p>{f.line}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
