import { Heading } from '../components/ui/Heading.tsx'
import { FAQ, FAQ_TITLE } from '../content/faq.ts'
import styles from './Faq.module.css'

export function Faq() {
  return (
    <section className="section flushTop" id="faq" aria-labelledby="faq-title">
      <div className={`wrap ${styles.grid}`}>
        <Heading eyebrow={FAQ_TITLE.eyebrow} title={FAQ_TITLE.title} serif={FAQ_TITLE.titleSerif} id="faq-title" className={styles.head} />
        <div>
          {FAQ.map((f, i) => (
            <details key={f.q} className={styles.item} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
