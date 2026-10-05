import { motion, useAnimation, useReducedMotion } from 'motion/react'
import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Mascot } from '../components/brand/Mascot.tsx'
import { Sherpie } from '../components/brand/Sherpie.tsx'
import { CHANNELS, FLOATS, HERO, type Channel } from '../content/hero.ts'
import { briefMessage, whatsappLink } from '../lib/amit.ts'
import { CREW } from '../lib/crew.ts'
import { calm } from '../lib/motion.ts'
import { Topo } from './HeroTopo.tsx'
import styles from './Hero.module.css'

const ICONS: Record<Channel, ReactNode> = {
  slack: <path d="M6 2.5v11M10 2.5v11M2.5 6h11M2.5 10h11" />,
  teams: <><rect x="2" y="4" width="8" height="8" rx="2" /><circle cx="12.5" cy="5" r="1.8" /><path d="M11 8h3v3a2 2 0 01-2 2" /></>,
  email: <><rect x="2" y="3.5" width="12" height="9" rx="2" /><path d="M2.5 4.5L8 9l5.5-4.5" /></>,
  whatsapp: <path d="M3 13l.8-2.6A5.5 5.5 0 118 13.5a5.4 5.4 0 01-2.4-.6z" />,
  assistants: <path d="M8 2v12M2 8h12M3.8 3.8l8.4 8.4M12.2 3.8l-8.4 8.4" />,
}

const SQUARES = [
  { x: 20, y: 8, c: 'var(--green)' }, { x: 72, y: 30, c: 'var(--yellow)' }, { x: 26, y: 46, c: 'var(--red)' },
  { x: 92, y: 42, c: 'var(--blue)' }, { x: 60, y: 78, c: 'var(--green)' }, { x: 36, y: 92, c: 'var(--yellow)' },
]

interface HeroProps {
  task: string
  onTask: (task: string) => void
}

/**
 * Base camp: Sherpie peeks over the headline, surrounded by work the crew has already finished.
 * What the visitor types here is remembered and comes back in their brief at the end of the page.
 */
export function Hero({ task, onTask }: HeroProps) {
  const reduced = useReducedMotion()
  const peek = useAnimation()
  const [hint, setHint] = useState(0)

  // rotate the example in the empty field, so it's clear what kind of answer fits
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setHint((h) => (h + 1) % HERO.askPlaceholders.length), 2600)
    return () => clearInterval(id)
  }, [reduced])

  const link = whatsappLink(briefMessage({ task, pains: [], hours: 0 }))
  const send = (e: FormEvent) => {
    e.preventDefault()
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    if (!reduced) peek.start({ y: [90, 0], transition: { type: 'spring', bounce: 0.4, visualDuration: 0.8, delay: 0.6 } })
  }, [peek, reduced])

  // Sherpie stands up a little taller when you reach for the button
  const lean = (up: boolean) => !reduced && peek.start({ y: up ? -16 : 0, transition: { type: 'spring', bounce: up ? 0.45 : 0.25, visualDuration: 0.4 } })

  const enter = (i: number) => (reduced ? {} : {
    initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { ...calm, delay: 0.1 + i * 0.09 },
  })

  return (
    <header className={styles.hero}>
      <Topo />
      <div className={styles.floats} aria-hidden="true">
        {FLOATS.map((f, i) => (
          <motion.div
            key={f.title} className={styles.card}
            style={{ [f.side]: `${f.x}%`, top: `${f.y}%`, rotate: f.tilt, ['--c' as string]: CREW[f.crew].color, animationDelay: `${-i * 1.4}s` }}
            {...(reduced ? {} : { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 }, transition: { ...calm, delay: 0.6 + i * 0.08 } })}
          >
            <span className={styles.who}><Mascot id={f.crew} /></span>
            <span className={styles.tag}><i />{f.tag}</span>
            <b>{f.title}</b>
            <small>{f.note}</small>
          </motion.div>
        ))}
        {SQUARES.map((s, i) => (
          <span key={i} className={styles.sq} style={{ left: `${s.x}%`, top: `${s.y}%`, background: s.c, animationDelay: `${-i}s` }} />
        ))}
      </div>

      <div className={`wrap ${styles.inner}`}>
        <motion.div className="eyebrow dot" {...enter(0)}>{HERO.eyebrow}</motion.div>
        <div className={styles.peek} aria-hidden="true">
          <motion.div animate={peek} className={styles.peekInner}><Sherpie /></motion.div>
        </div>
        <motion.h1 className={styles.title} {...enter(1)}>
          <span className={styles.line}>{HERO.line1}</span>{' '}
          <span className={styles.line}>{HERO.line2} <span className="serif">{HERO.line2Serif}</span></span>
        </motion.h1>
        <motion.p className="lede" {...enter(2)}>{HERO.lede}</motion.p>
        <motion.form className={styles.ask} onSubmit={send} {...enter(3)}>
          <label htmlFor="hero-ask">{HERO.askLabel}</label>
          <input
            id="hero-ask" name="task" type="text" autoComplete="off" maxLength={140}
            value={task} placeholder={HERO.askPlaceholders[hint]}
            onChange={(e) => onTask(e.target.value)}
            onFocus={() => lean(true)} onBlur={() => lean(false)}
          />
          <button type="submit" className="btn ink" onPointerEnter={() => lean(true)} onPointerLeave={() => lean(false)}>{HERO.primary} ↗</button>
        </motion.form>
        <motion.div className={styles.subline} {...enter(4)}>
          <span className={styles.amit}><i />{HERO.amitNote}</span>
          <a className="tlink" href="#computer">{HERO.secondary} ↓</a>
        </motion.div>
        <div className={styles.where}>
          <b>{HERO.whereLabel}</b>
          {CHANNELS.map((c) => (
            <span key={c.id}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">{ICONS[c.id]}</svg>
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
