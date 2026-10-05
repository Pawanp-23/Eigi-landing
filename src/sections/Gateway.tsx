import { motion, useReducedMotion } from 'motion/react'
import { Fragment, useState } from 'react'
import { Mascot } from '../components/brand/Mascot.tsx'
import { Heading } from '../components/ui/Heading.tsx'
import { GATEWAY } from '../content/story.ts'
import { AI_TEAM } from '../lib/crew.ts'
import styles from './Gateway.module.css'

const OPS = ['+', '+', '=']

/** You + engineers + your Eigis = the gateway. The parts click into place once, or again on replay. */
export function Gateway() {
  const reduced = useReducedMotion()
  const [take, setTake] = useState(0)

  const tile = (id: string) => {
    if (id === 'you') return <span className={`${styles.tile} ${styles.you}`}>You</span>
    if (id === 'engineers') return <span className={styles.tile}><Mascot id="sherpa" /></span>
    if (id === 'eigis') return <span className={`${styles.tile} ${styles.eigis}`}>{AI_TEAM.map((c) => <Mascot key={c} id={c} head />)}</span>
    return <span className={`${styles.tile} ${styles.end}`}>∞</span>
  }

  return (
    <section className={`section ${styles.section}`} id="gateway" aria-labelledby="gateway-title">
      <div className="wrap">
        <Heading eyebrow={GATEWAY.eyebrow} title={GATEWAY.title} serif={GATEWAY.titleSerif} id="gateway-title" center />
        <p className="lede" style={{ margin: '22px auto 0' }}>{GATEWAY.lede}</p>
        <motion.div
          key={take} className={styles.gate}
          initial={reduced ? false : 'apart'} whileInView="together" viewport={{ once: true, amount: 0.6 }}
          transition={{ staggerChildren: 0.16 }}
        >
          {GATEWAY.parts.map((p, i) => (
            <Fragment key={p.id}>
              <motion.div className={styles.part} variants={step}>
                {tile(p.id)}
                <b>{p.name}</b>
                <small>{p.text}</small>
              </motion.div>
              {i < OPS.length && <motion.span className={styles.op} variants={step}>{OPS[i]}</motion.span>}
            </Fragment>
          ))}
        </motion.div>
        <div className={styles.foot}>
          <p>{GATEWAY.vision}</p>
          <button type="button" className="btn ghost" onClick={() => setTake((t) => t + 1)}>↻ {GATEWAY.replay}</button>
        </div>
      </div>
    </section>
  )
}

const step = {
  apart: { y: 18, scale: 0.94 },
  together: { y: 0, scale: 1, transition: { type: 'spring', bounce: 0.3, visualDuration: 0.55 } },
} as const
