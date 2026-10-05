import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Heading } from '../components/ui/Heading.tsx'
import { PROBLEM } from '../content/story.ts'
import { rise } from '../lib/motion.ts'
import styles from './Problem.module.css'

/** The missing piece is adoption: what founders have tried, and the numbers behind it. */
export function Problem() {
  return (
    <section className={`section ${styles.section}`} id="why" aria-labelledby="problem-title">
      <div className="wrap">
        <div className={styles.grid}>
          <div>
            <Heading eyebrow={PROBLEM.eyebrow} title={PROBLEM.title} serif={PROBLEM.titleSerif} id="problem-title" />
            <p className="lede" style={{ marginTop: 24 }}>{PROBLEM.lede}</p>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{PROBLEM.triedLabel}</div>
            <div className={styles.tried}>
              {PROBLEM.tried.map((t) => <div key={t.name}><b>{t.name}</b><span>{t.text}</span></div>)}
              <div className={styles.us}><b>{PROBLEM.us.name}</b><span>{PROBLEM.us.text}</span></div>
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          {PROBLEM.stats.map((s) => (
            <motion.div key={s.source} className={styles.stat} {...rise}>
              <Count prefix={s.prefix} value={s.value} />
              <p>{s.text}</p>
              <a href={s.href} target="_blank" rel="noopener noreferrer">{s.source} ↗</a>
            </motion.div>
          ))}
          <motion.div className={`${styles.stat} ${styles.dark}`} {...rise}><p>{PROBLEM.punch}</p></motion.div>
        </div>
      </div>
    </section>
  )
}

/** Counts up once when it scrolls into view. Shows the real number before and without animation. */
function Count({ prefix, value }: { prefix: string; value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, value, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduced, value])

  return <span ref={ref} className={styles.n}>{prefix}{shown}%</span>
}
