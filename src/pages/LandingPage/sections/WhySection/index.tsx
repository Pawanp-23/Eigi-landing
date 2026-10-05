import { useState } from 'react'
import { track } from '../../../../utils/analytics.ts'
import { buddy } from '../../content/site.ts'
import { WHY } from '../../content/why.ts'
import styles from './Why.module.css'

/** Why Eigi, part 1: the questions founders already ask themselves, each flipping to how Eigi takes it. */
export default function WhySection() {
  const [mine, setMine] = useState<ReadonlySet<number>>(new Set())
  const toggle = (i: number) => {
    if (!mine.has(i)) track('why_question', { area: WHY.questions[i].area })
    setMine(s => { const n = new Set(s); if (!n.delete(i)) n.add(i); return n })
  }

  const total = WHY.questions.length
  const tally = mine.size === 0 ? WHY.tally.none : `${mine.size} of ${total}. ${mine.size === total ? WHY.tally.all : WHY.tally.some}`
  const slowing = [...mine].map(i => WHY.questions[i].area.toLowerCase()).join(', ')

  return (
    <section id="why" className={`section ${styles.why}`} aria-labelledby="why-title">
      <div className="wrap">
        <div className={styles.head}>
          <p className="eyebrow dot">{WHY.eyebrow}</p>
          <h2 id="why-title">{WHY.title[0]} <span className="serif">{WHY.title[1]}</span></h2>
          <p className="lede">{WHY.lede}</p>
        </div>

        <ol className={styles.questions}>
          {WHY.questions.map((q, i) => <li key={q.area}>
            <button type="button" className={styles.card} aria-pressed={mine.has(i)} onClick={() => toggle(i)}>
              <span className={styles.front}>
                <span className={styles.area}>{String(i + 1).padStart(2, '0')} · {q.area}</span>
                <span className={styles.ask}>{q.ask}</span>
                <span className={styles.tap}>That’s us</span>
              </span>
              <span className={styles.back}>
                <span className={styles.area}>How Eigi takes it</span>
                <span className={styles.answer}>{q.answer}</span>
                <span className={styles.tap}>✓ That’s us</span>
              </span>
            </button>
          </li>)}
        </ol>
        <div className={styles.tallyRow}>
          <p className={styles.tally} aria-live="polite" data-all={mine.size === total}>{tally}</p>
          {mine.size > 0 && <a className="btn ink" href={buddy(`Here’s what’s slowing my business down: ${slowing}.`, 'why')} target="_blank" rel="noopener noreferrer">Tell Buddy what’s slowing you down ↗</a>}
        </div>
      </div>
    </section>
  )
}
