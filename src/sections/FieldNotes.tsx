import { motion } from 'motion/react'
import { Heading } from '../components/ui/Heading.tsx'
import { STORIES } from '../content/people.ts'
import { amitLink } from '../lib/amit.ts'
import { rise } from '../lib/motion.ts'
import styles from './FieldNotes.module.css'

/** Field notes: Eigi at work right now, for a founder and for a community. */
export function FieldNotes() {
  const { founder: f, amit: a } = STORIES
  return (
    <section className="section" id="stories" aria-labelledby="stories-title">
      <div className="wrap">
        <Heading eyebrow={STORIES.eyebrow} title={STORIES.title} serif={STORIES.titleSerif} id="stories-title" />
        <p className="lede" style={{ marginTop: 22 }}>{STORIES.lede}</p>
        <div className={styles.notes}>
          <motion.article className={`${styles.log} ${styles.light}`} {...rise}>
            <div className={styles.meta}><span>{f.meta}</span><span>{f.status}</span></div>
            <h3>{f.title} <span className="serif">{f.titleSerif}</span></h3>
            {f.body.map((p) => <p key={p}>{p}</p>)}
            <div className={styles.tags}>{f.tags.map((t) => <span key={t}>{t}</span>)}</div>
            <div className={styles.foot}>
              <a className="tlink" href={amitLink('stories')} target="_blank" rel="noopener noreferrer">{f.cta} ↗</a>
              <span className="fine">{f.fine}</span>
            </div>
          </motion.article>
          <motion.article className={`${styles.log} ${styles.dark}`} {...rise}>
            <div className={styles.meta}><span>{a.meta}</span><span className={styles.live}>{a.status}</span></div>
            <h3>{a.title} <span className="serif">{a.titleSerif}</span></h3>
            {a.body.map((p) => <p key={p}>{p}</p>)}
            <div className={styles.quote}><small>{a.startLabel}</small>{a.start}</div>
            <div className={styles.foot}>
              <a className="tlink" href={amitLink('khundia')} target="_blank" rel="noopener noreferrer">{a.cta} ↗</a>
              <span className="fine">{a.fine}</span>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
