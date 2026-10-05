import { useState, type PointerEvent as RPointerEvent } from 'react'
import { NOTES } from '../../content/people.ts'
import { amit } from '../../content/site.ts'
import styles from './Notes.module.css'

/** Cards lean toward the pointer, a little. */
const tilt = (e: RPointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
}
const untilt = (e: RPointerEvent<HTMLElement>) => { e.currentTarget.style.transform = '' }

/** Proof: two real stories of Eigi at work. */
export default function NotesSection() {
  const [chat, setChat] = useState(0)

  return (
    <section id="notes" className={`section ${styles.notes}`} aria-labelledby="notes-title">
      <div className="wrap">
        <div className={styles.head}>
          <p className="eyebrow dot">Field notes</p>
          <h2 id="notes-title">A business to run. <span className="serif">Someone to help.</span></h2>
        </div>
        <div className={styles.logs}>
          {NOTES.map((n, i) => <article key={n.log} className={styles.log} onPointerMove={tilt} onPointerLeave={untilt}>
            <p className={styles.meta}><span>{n.log}</span><span className={styles.live}>{n.status}</span></p>
            <h3>{n.title}</h3>
            <p>{n.body}</p>
            <ul className={styles.tags}>{n.tags.map(t => <li key={t}>{t}</li>)}</ul>
            {i === 1 && <div className={styles.chat}>
              {chat === 0 && <button type="button" onClick={() => setChat(1)}>▶ How a chat with Amit starts</button>}
              {chat >= 1 && <p className={styles.bubble}>I have an application to fill in. Can you help me work through it?</p>}
              {chat === 1 && <button type="button" onClick={() => setChat(2)}>Try it yourself →</button>}
              {chat === 2 && <a href={amit('I would like to learn how Eigi can help with my everyday work.', 'gondia-story')} target="_blank" rel="noopener noreferrer">Meet Amit on WhatsApp ↗</a>}
            </div>}
            <small>{n.small}</small>
          </article>)}
        </div>
      </div>
    </section>
  )
}
