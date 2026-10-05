import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Sherpie } from '../components/brand/Sherpie.tsx'
import { FINAL } from '../content/people.ts'
import { LINKS } from '../content/site.ts'
import { amitLink } from '../lib/amit.ts'
import styles from './NextChapter.module.css'

/** The close: one more nudge toward Amit, and Sherpie peeking up to see you off. */
export function NextChapter() {
  const reduced = useReducedMotion()
  const peekRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: peekRef, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], [96, 0])

  return (
    <section className={`section ${styles.section}`} id="start" aria-labelledby="final-title">
      <div className="wrap">
        <div className={`eyebrow ${styles.eyebrow}`}>{FINAL.eyebrow}</div>
        <h2 id="final-title" className={styles.title}>{FINAL.title} <span className="serif">{FINAL.titleSerif}</span></h2>
        <p className={`lede ${styles.lede}`}>{FINAL.lede}</p>
        <div className={styles.ctas}>
          <a className="btn ink" href={amitLink('final')} target="_blank" rel="noopener noreferrer">{FINAL.primary}</a>
          <a className="btn ghost" href={LINKS.studio}>{FINAL.secondary} ↗</a>
        </div>
        <p className={styles.mail}>{FINAL.email} <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></p>
        <div ref={peekRef} className={styles.peek} aria-hidden="true">
          <motion.div style={reduced ? undefined : { y }}><Sherpie /></motion.div>
        </div>
      </div>
    </section>
  )
}
