import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { STUDIO_URL } from '../../../components/layout/Nav.tsx'
import { cx } from '../../../utils/cx.ts'
import { useSingularity } from '../hooks/useSingularity.ts'
import { ORBITS, stepAt } from '../utils/singularity.ts'
import styles from './Gateway.module.css'

const STEPS = [
  { title: 'Humans', body: 'The ambition, the taste, the judgment. Every gateway starts with people.' },
  { title: 'Forward-deployed engineers', body: 'Sherpas who live inside your business and turn intent into working systems.' },
  { title: 'Eigi computer', body: 'Voice, chat and video agents that run around the clock, on any model.' },
  { title: 'Converging', body: 'Three forces, one orbit. Each makes the others stronger.' },
]

/** A black portal in the page: humans + FDEs + Eigi computer spiral into one event horizon. Pinned for 3 screens. */
export function Gateway() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // eased copy of the scroll: wheel notches and trackpad flicks glide instead of stepping
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6, restDelta: 0.0005 })
  const [step, setStep] = useState(0)
  useMotionValueEvent(progress, 'change', (p) => setStep(stepAt(p)))
  useSingularity(canvasRef, progress)
  const finale = useTransform(progress, [0.88, 0.98], [0, 1])
  const finaleScale = useTransform(finale, [0, 1], [0.92, 1])

  return (
    <section id="gateway" ref={sectionRef} className={styles.gateway} data-stage="The gateway" aria-label="Gateway to singularity">
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

        <p className={cx(styles.equation, 'mono')} aria-label="Humans plus forward-deployed engineers plus Eigi computer equals singularity">
          {ORBITS.map((o, i) => (
            <span key={o.label} className={cx(step >= i && styles.lit)}>{i > 0 && <b>+</b>}{i === 1 ? 'FDE' : o.label}</span>
          ))}
          <span className={cx(step >= 4 && styles.lit)}><b>=</b>Singularity</span>
        </p>

        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={s.title} className={cx(styles.step, i === step && styles.shown)} aria-hidden={i !== step}>
              <div className={cx(styles.stepLabel, 'mono')}>{String(i + 1).padStart(2, '0')} / 04</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>

        <motion.div className={styles.finale} style={{ opacity: finale, scale: finaleScale }} aria-hidden={step < 4}>
          <h2>Your gateway to singularity.</h2>
          <p className={styles.finaleLead}>Take your step towards digital singularity with Eigi.</p>
          <a className="btn" href={STUDIO_URL} tabIndex={step < 4 ? -1 : 0}>
            Step through <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
