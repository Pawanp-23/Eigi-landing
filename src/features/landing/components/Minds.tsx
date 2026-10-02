import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type PointerEvent } from 'react'
import { reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import aman from '../../../assets/founders/aman-khandelwal.webp'
import mrunmay from '../../../assets/founders/mrunmay-chichkhede.webp'
import styles from './Minds.module.css'

/**
 * The disciplines behind the work, as on fde.eigi.ai. These portraits are illustrative stock images
 * (the same ones fde.eigi.ai uses); self-host them before launch.
 */
const MINDS = [
  { title: 'Product strategy', line: 'From the right question to a clear direction', img: 'https://cdn.21st.dev/assets/mirror/f4/f43137dada970ee6a29a0497d1f699d54b92e5381350eaa66dc827e3ffb11645.jpg' },
  { title: 'Experience design', line: 'Interfaces shaped around real people', img: 'https://cdn.21st.dev/assets/mirror/d5/d549c11c16ad2335895c39339d1a4307b648b24a6baae68662246cf9bd37ac13.jpg' },
  { title: 'Systems engineering', line: 'Connected tools. Thoughtful architecture.', img: 'https://cdn.21st.dev/assets/mirror/e0/e058437411e954b747056a494f26349751828f12c2137a883e5aebbd1fcf5eef.jpg' },
  { title: 'AI engineering', line: 'Intelligence, context, and evaluation', img: 'https://cdn.21st.dev/assets/mirror/45/45ba21cbafae178989cd3652799f42123a80e0ac44065ac00cbb265ea948bc41.jpg' },
  { title: 'Eigi_ai research', line: 'Explore possibilities. Test assumptions.', img: 'https://cdn.21st.dev/assets/mirror/90/904d97602d25b1b5ef0f4058abad6d8185d8cebd0750771404a934a44dd537fb.jpg' },
  { title: 'Delivery engineering', line: 'From working prototype to daily use', img: 'https://cdn.21st.dev/assets/mirror/3b/3b6a929c98b85177bcc2eb4606a71b7487011128756dbf0adda24e803ca70ed7.jpg' },
]

/** Colour opens out from wherever the cursor enters the photo. */
function markEntry(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

/** The people at the front of the rope. Photos are pre-cropped to their subject in src/assets/founders. */
const FOUNDERS = [
  {
    name: 'Aman Khandelwal', role: 'Founder & CEO', img: aman,
    line: 'On a relentless pursuit of digital singularity: building the bridge between human intent and machine intelligence, one voice at a time.',
  },
  {
    name: 'Mrunmay Chichkhede', role: 'Co-Founder', img: mrunmay,
    line: 'Building the engineering backbone that powers real-time, intelligent voice experiences at scale.',
  },
]

function Founder({ f }: { f: (typeof FOUNDERS)[number] }) {
  return (
    <motion.li className={styles.founder} onPointerEnter={markEntry} {...reveal}>
      <div className={styles.photo}>
        <img src={f.img} alt={`${f.name}, ${f.role}`} loading="lazy" decoding="async" draggable={false} />
        <img className={styles.colour} src={f.img} alt="" aria-hidden="true" loading="lazy" decoding="async" draggable={false} />
      </div>
      <div className={styles.bio}>
        <p className={cx(styles.role, 'mono')}>{f.role}</p>
        <h3>{f.name}</h3>
        <p className={styles.line}>{f.line}</p>
      </div>
    </motion.li>
  )
}

function Card({ mind, i, copy }: { mind: (typeof MINDS)[number]; i: number; copy: boolean }) {
  return (
    <li className={styles.card} aria-hidden={copy || undefined} onPointerEnter={markEntry}>
      <img src={mind.img} alt={copy ? '' : `Illustrative portrait for ${mind.title}`} loading="lazy" decoding="async" draggable={false} />
      {/* the same photo in full colour, revealed by a growing circle on hover */}
      <img className={styles.colour} src={mind.img} alt="" aria-hidden="true" loading="lazy" decoding="async" draggable={false} />
      <span className={cx(styles.badge, 'mono')}>Illustrative portrait / {String(i + 1).padStart(2, '0')}</span>
      <div className={styles.caption}>
        <h3>{mind.title}</h3>
        <p>{mind.line}</p>
      </div>
    </li>
  )
}

/**
 * "Creative eigi_ai minds": an endless, slowly drifting strip of portraits. It glides on its own,
 * scrolling the page nudges it further along, and hovering holds it still so a card can be read.
 */
export function Minds() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const nudge = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section id="minds" ref={ref} className={styles.minds} data-page>
      <div className={styles.head}>
        <motion.p className="eyebrow mono" {...reveal}>Human ingenuity. Shared ambition.</motion.p>
        <motion.h2 {...reveal}>Creative eigi_ai minds.</motion.h2>
        <motion.p className="lead" {...reveal}>
          Eigi_ai brings engineering, design, and research together to turn ambitious ideas into useful systems,
          with clear communication throughout.
        </motion.p>
        <motion.p className={cx(styles.note, 'mono')} {...reveal}>
          Meet the disciplines behind the work. Portraits are illustrative, not staff profiles.
        </motion.p>
      </div>

      <p className={cx(styles.count, 'mono')}>The founders / 02</p>
      <ul className={styles.founders}>
        {FOUNDERS.map((f) => <Founder key={f.name} f={f} />)}
      </ul>

      <p className={cx(styles.count, 'mono')}>The disciplines / {String(MINDS.length).padStart(2, '0')}</p>
      <div className={styles.viewport}>
        <motion.div style={{ x: nudge }}>
          {/* two identical sets back to back: the strip slides one set's width, then loops seamlessly */}
          <ul className={styles.track}>
            {MINDS.map((m, i) => <Card key={m.title} mind={m} i={i} copy={false} />)}
            {MINDS.map((m, i) => <Card key={`${m.title}-copy`} mind={m} i={i} copy />)}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
