import { motion } from 'motion/react'
import { Mascot } from '../components/brand/Mascot.tsx'
import { Heading } from '../components/ui/Heading.tsx'
import { SHERPAS } from '../content/people.ts'
import { rise } from '../lib/motion.ts'
import styles from './Sherpas.module.css'

/** The human half: who the sherpas are, and the four camps from first call to "how did we work without this?". */
export function Sherpas() {
  return (
    <section className={`section ${styles.section}`} id="route" aria-labelledby="sherpas-title">
      <div className="wrap">
        <div className={styles.grid}>
          <div>
            <Heading eyebrow={SHERPAS.eyebrow} title={SHERPAS.title} serif={SHERPAS.titleSerif} id="sherpas-title" />
            <p className="lede" style={{ marginTop: 22 }}>{SHERPAS.lede}</p>
          </div>
          <div className={styles.principles}>
            {SHERPAS.principles.map((p) => (
              <div key={p.title}><Mascot id={p.crew} /><span><b>{p.title}</b><span>{p.text}</span></span></div>
            ))}
          </div>
        </div>
        <ol className={styles.camps}>
          {SHERPAS.camps.map((c, i) => (
            <motion.li key={c.name} style={{ ['--rise' as string]: i, ['--c' as string]: c.color }} {...rise}>
              <span className={styles.cn}>{c.name}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className={styles.out}>{c.output}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
