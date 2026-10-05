import { useState, type PointerEvent as RPointerEvent } from 'react'
import aman from '../assets/aman-khandelwal.webp'
import mrunmay from '../assets/mrunmay-chichkhede.webp'
import { Sherpie } from '../components/Sherpie.tsx'
import { amit, FOUNDERS, LINKS, NOTES } from '../content.ts'
import styles from './NextChapter.module.css'

const PHOTOS = [aman, mrunmay]
const YEAR = new Date().getFullYear()

/** Cards lean toward the pointer, a little. */
const tilt = (e: RPointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
}
const untilt = (e: RPointerEvent<HTMLElement>) => { e.currentTarget.style.transform = '' }

/** Proof: two real stories of Eigi at work. */
export function Notes() {
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

/** The founders, on their own: a short intro and two clean portrait cards. */
export function Founders() {
  return (
    <section id="people" className={`section ${styles.people}`} aria-labelledby="people-title">
      <div className={`wrap ${styles.peopleGrid}`}>
        <div className={styles.intro}>
          <p className="eyebrow dot">Small team. Same as you.</p>
          <h2 id="people-title">Real people. <span className="serif">In your corner.</span></h2>
          <p className="lede">We’re building Eigi for the founders who want to do more without becoming a bigger company. We know the feeling.</p>
          <a className="btn ghost" href={LINKS.email}>Say hello to the team ↗</a>
        </div>
        <ul className={styles.founders}>
          {FOUNDERS.map((f, i) => <li key={f.name} className={styles.founder}>
            <img src={PHOTOS[i]} alt={`${f.name}, ${f.role}`} width="320" height="400" loading="lazy" decoding="async" />
            <div className={styles.about}>
              <span className={styles.role}>{f.role}</span>
              <h3>{f.name}</h3>
              <p>{f.line}</p>
            </div>
          </li>)}
        </ul>
      </div>
    </section>
  )
}

/** One last ask. */
export function Footer() {
  return (
    <footer className={styles.end}>
      <Sherpie hands className={styles.peek} lines={['Ready when you are.', 'One workflow is a good place to begin.', 'Amit’s really nice. I promise.']} />
      <div className={`wrap ${styles.endInner}`}>
        <p className="eyebrow">Your next chapter</p>
        <h2>Keep the ambition. <span className="serif">Lose the busywork.</span></h2>
        <p className={styles.endLede}>You don’t need an AI roadmap to start. Tell Amit the job you’d hand over first.</p>
        <div className={styles.ctas}>
          <a className="btn" href={amit('I want to start using AI in my business.', 'footer')} target="_blank" rel="noopener noreferrer">Talk to Amit on WhatsApp ↗</a>
          <a className={styles.alt} href={LINKS.email}>buddy@eigi.ai</a>
        </div>
        <nav className={styles.links} aria-label="More">
          <a href={LINKS.studio}>Go to Studio</a>
          <a href={LINKS.docs} target="_blank" rel="noopener noreferrer">Documentation ↗</a>
          <a href="#top">Back to the top ↑</a>
          <span>© {YEAR} Eigi</span>
        </nav>
      </div>
    </footer>
  )
}
