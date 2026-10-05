import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Sherpie } from '../components/brand/Sherpie.tsx'
import { FINAL } from '../content/people.ts'
import { LINKS } from '../content/site.ts'
import { amitLink, briefMessage, hasBrief, whatsappLink, type Brief } from '../lib/amit.ts'
import { PAINS } from '../content/story.ts'
import { CREW } from '../lib/crew.ts'
import { calm } from '../lib/motion.ts'
import styles from './NextChapter.module.css'

/**
 * The close. If the visitor told us anything on the way down, it's gathered into one brief they can
 * send to Amit in a tap. Otherwise, a plain nudge toward Amit. Sherpie peeks up to see them off.
 */
export function NextChapter({ brief }: { brief: Brief }) {
  const told = hasBrief(brief)
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
        <AnimatePresence initial={false}>
          {told && (
            <motion.div
              className={styles.brief}
              initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
              transition={calm}
            >
              <div className={styles.briefHead}><span className="eyebrow">{FINAL.brief.label}</span><span>{FINAL.brief.note}</span></div>
              {brief.task.trim() && <p className={styles.task}>“{brief.task.trim()}”</p>}
              {brief.pains.length > 0 && (
                <div className={styles.pains}>
                  {brief.pains.map((area) => {
                    const pain = PAINS.find((p) => p.area === area)
                    return (
                      <span key={area} style={{ ['--c' as string]: pain ? CREW[pain.crew].color : undefined }}>
                        <i />{area}{pain ? ` · ${pain.hours}h` : ''}
                      </span>
                    )
                  })}
                  <b>{FINAL.brief.hours(brief.hours)}</b>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.ctas}>
          <a className="btn ink" href={told ? whatsappLink(briefMessage(brief)) : amitLink('final')} target="_blank" rel="noopener noreferrer">
            {told ? FINAL.brief.send : FINAL.primary} ↗
          </a>
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
