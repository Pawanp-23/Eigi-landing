import { motion, useAnimationControls } from 'motion/react'
import { useState } from 'react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { Sherpie } from '../sherpie/Sherpie.tsx'
import type { Pose } from '../sherpie/draw.ts'
import { useLoad } from '../state/useLoad.ts'
import { LOADS, type LoadId } from '../utils/loads.ts'
import { peepStyle } from '../utils/peeps.ts'
import styles from './BaseCamp.module.css'

/**
 * Base camp: an editorial, Town-like hero. A serif headline with little pictures set into the line,
 * Sherpie waving beside it, and one question underneath: what's heaviest this week? Whatever the visitor
 * picks becomes the pack Sherpie carries for the rest of the climb (and shapes the sections ahead).
 */
export function BaseCamp() {
  const { load, choose } = useLoad()
  const [moment, setMoment] = useState<'hello' | 'heard' | 'carrying'>(load ? 'carrying' : 'hello')
  const hop = useAnimationControls()

  const pick = (id: LoadId) => {
    choose(id)
    setMoment('heard')
    void hop.start({ y: [0, -18, 0], transition: { duration: 0.5, ease: 'easeOut' } })
    window.setTimeout(() => setMoment('carrying'), 1100)
  }

  const tag = LOADS.find((l) => l.id === load?.id)?.tag
  const pose: Pose = {
    hello: { arms: 'wave', eyes: 'happy', mouth: 'open', blush: true },
    heard: { eyes: 'soft', brows: 'worried', mouth: 'small', arms: 'hug', heart: true, blush: true },
    carrying: { pack: tag, eyes: 'happy', blush: true },
  }[moment] as Pose
  const says = {
    hello: 'Hey. I’m Sherpie.',
    heard: 'That sounds heavy. I’ve got this one.',
    carrying: 'Scroll on. I’ll carry it the whole way.',
  }[moment]

  return (
    <section id="base-camp" className={styles.hero} data-stage="Base camp">
      <div className={styles.top}>
        <div className={styles.copy}>
          <motion.p className="eyebrow mono" {...reveal}>Base camp · 0 m · AI is here. Adoption isn’t.</motion.p>
          <motion.h1 {...reveal}>
            Small team,
            <span className={styles.pic} aria-hidden="true"><span style={peepStyle(23)} /></span>
            <br />
            <i>extraordinary</i>
            <span className={cx(styles.pic, styles.sherpiePic)} aria-hidden="true"><Sherpie crop="head" eyes="happy" blush /></span>
            reach.
          </motion.h1>
          <motion.p className="lead" {...reveal}>
            Everyone’s talking about AI. Most teams are still walking in circles at base camp. Eigi brings the
            engineers and AI workflows that walk you up the mountain, so a two-person company climbs like twenty.
          </motion.p>
        </div>

        <motion.div className={styles.guide} {...reveal}>
          <p className={styles.bubble} aria-live="polite">{says}</p>
          <motion.div animate={hop}>
            <Sherpie className={styles.sherpie} {...pose} title="Sherpie, Eigi’s guide" />
          </motion.div>
          <span className={cx(styles.name, 'mono')}>Sherpie · your guide</span>
        </motion.div>
      </div>

      <motion.div className={styles.ask} {...reveal}>
        <p className={cx(styles.askLabel, 'mono')}>Tell Sherpie</p>
        <h2 className={styles.question}>What’s <i>heaviest</i> this week?</h2>
        <div className={styles.loads} role="radiogroup" aria-label="What’s heaviest this week?">
          {LOADS.map((l) => (
            <button
              key={l.id}
              type="button"
              role="radio"
              aria-checked={load?.id === l.id}
              className={cx(styles.load, load?.id === l.id && styles.chosen)}
              onClick={() => pick(l.id)}
            >
              {l.chip}
            </button>
          ))}
        </div>
        <p className={cx(styles.fine, 'mono')}>
          {load ? `Got it: ${load.chip.toLowerCase()}. The climb ahead is set up around it.` : 'Your answer stays in your browser. It just shapes the climb ahead.'}
        </p>
      </motion.div>
    </section>
  )
}
