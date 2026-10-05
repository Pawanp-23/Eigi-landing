import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { Sherpie } from '../components/brand/Sherpie.tsx'
import { COMPUTER, TRUST, type TrustIcon } from '../content/computer.ts'
import { SlackWindow } from '../features/slack-demo/SlackWindow.tsx'
import { rise } from '../lib/motion.ts'
import styles from './EigiComputer.module.css'

const favicon = '/favicon.jpg'

const ICONS: Record<TrustIcon, ReactNode> = {
  shield: <><path d="M13 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9.5 13l2.5 2.5 4.5-5" /></>,
  log: <><path d="M6 4h14v18H6z" /><path d="M10 9h6M10 13h6M10 17h4" /></>,
  memory: <><circle cx="13" cy="13" r="9" /><path d="M13 8v5l3 2" /></>,
  people: <><circle cx="9" cy="9" r="3.5" /><circle cx="18" cy="10" r="3" /><path d="M3 21c0-3.5 2.7-6 6-6s6 2.5 6 6M15 16.5c.9-.6 1.9-1 3-1 2.8 0 5 2.2 5 5" /></>,
}

/** Meet your Eigi: the main product, shown working in Slack right under the hero. */
export function EigiComputer() {
  const reduced = useReducedMotion()
  const filmRef = useRef<HTMLDivElement>(null)
  // the film rises and opens up as it scrolls in; Sherpie climbs onto its top edge
  const { scrollYProgress: opening } = useScroll({ target: filmRef, offset: ['start end', 'start 0.3'] })
  const { scrollYProgress: climbing } = useScroll({ target: filmRef, offset: ['start 0.9', 'start 0.4'] })
  const scale = useTransform(opening, [0, 1], [0.92, 1])
  const y = useTransform(opening, [0, 1], [40, 0])
  const climbY = useTransform(climbing, [0, 1], [90, 0])

  return (
    <section className={styles.section} id="computer" aria-labelledby="computer-title">
      <div className={`wrap ${styles.head}`}>
        <div>
          <div className="eyebrow"><img src={favicon} alt="" />{COMPUTER.eyebrow}</div>
          <h2 id="computer-title" style={{ marginTop: 18 }}>{COMPUTER.title} <span className="serif">{COMPUTER.titleSerif}</span></h2>
        </div>
        <p className="lede">{COMPUTER.lede}</p>
      </div>

      <div className={styles.filmWrap}>
        <motion.div ref={filmRef} className={styles.film} style={reduced ? undefined : { scale, y }}>
          <div className={styles.climb} aria-hidden="true">
            <motion.div style={reduced ? undefined : { y: climbY }}><Sherpie hands /></motion.div>
          </div>
          <div className={styles.filmTop}>
            <span><span className={styles.rec} />{COMPUTER.filmLabel}</span>
            <span className="eyebrow">{COMPUTER.filmTag}</span>
          </div>
          <SlackWindow />
          <div className={styles.filmFoot}><span>{COMPUTER.hint}</span><span>{COMPUTER.elsewhere}</span></div>
        </motion.div>

        <div className={`wrap ${styles.trust}`}>
          {TRUST.map((t) => (
            <motion.div key={t.title} style={{ ['--c' as string]: t.color }} {...rise}>
              <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[t.icon]}</svg>
              <b>{t.title}</b>
              <span>{t.body}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
