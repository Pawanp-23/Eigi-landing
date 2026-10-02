import { motion, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { cx } from '../../../utils/cx.ts'
import { peepStyle } from '../utils/peeps.ts'
import styles from './Stories.module.css'

/**
 * Field notes from the climb. Industries and agents come from eigi.ai/solutions;
 * swap in named customers and real results as they are cleared for publishing.
 */
const STORIES = [
  {
    industry: 'Customer support', altitude: '1,140 m', peep: 4, agent: 'Voice agent',
    title: 'The inbox that never sleeps',
    before: 'Calls after 7 pm went to voicemail, and most callers never tried again.',
    after: 'A voice agent picks up around the clock, solves the routine questions and hands the hard ones to a human.',
  },
  {
    industry: 'E-commerce', altitude: '2,310 m', peep: 17, agent: 'Voice + chat agents',
    title: 'A store that talks back',
    before: 'Shoppers bounced when search could not find what they meant.',
    after: 'Voice-led product discovery and order tracking, right inside the store.',
  },
  {
    industry: 'Real estate', altitude: '3,480 m', peep: 31, agent: 'Voice agent',
    title: 'Every inquiry, qualified',
    before: 'Brokers spent their mornings answering the same five questions.',
    after: 'Agents answer property inquiries, qualify the lead and book the viewing.',
  },
  {
    industry: 'Education', altitude: '4,650 m', peep: 62, agent: 'Chat + video agents',
    title: 'Admissions at 2 a.m.',
    before: 'The helpline closed at six. Applicants did not.',
    after: 'An admissions agent and AI tutors answer students whenever they ask.',
  },
  {
    industry: 'Healthcare', altitude: '5,820 m', peep: 77, agent: 'Voice agent',
    title: 'The front desk, handled',
    before: 'Receptionists juggled phones, walk-ins and reminders all at once.',
    after: 'Patient intake, booking and prescription reminders now run on their own.',
  },
  {
    industry: 'Finance & banking', altitude: '6,990 m', peep: 90, agent: 'Voice agent',
    title: 'Answers before the hold music',
    before: 'Customers waited on hold just to check a balance.',
    after: 'Account inquiries, fraud alerts and loan pre-qualification, answered instantly.',
  },
]

/** Pinned while the log scrolls sideways; each postcard sits a step higher than the last, like the climb. */
export function Stories() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const rope = useTransform(scrollYProgress, [0, 1], [0, 1])

  // how far the track has to travel sideways = its overflow past the viewport
  useLayoutEffect(() => {
    const track = trackRef.current!
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  return (
    <section
      id="stories"
      ref={sectionRef}
      className={styles.stories}
      data-stage="Eigi stories"
      style={{ ['--travel' as string]: `${distance}px` }}
    >
      <div className={styles.sticky}>
        <motion.div ref={trackRef} className={styles.track} style={{ x }}>
          <div className={styles.intro}>
            <p className="eyebrow mono">Eigi stories</p>
            <h2>Field notes from the climb.</h2>
            <p className="lead">
              Teams we have roped in, the problem that kept them at base camp, and the agents that got them moving.
            </p>
            <p className={cx(styles.hint, 'mono')}>Keep scrolling →</p>
          </div>

          <ol className={styles.log}>
            {STORIES.map((s, i) => (
              <li key={s.title} className={styles.card} style={{ ['--rise' as string]: i }}>
                <header className={cx(styles.meta, 'mono')}>
                  <span>Log {String(i + 1).padStart(2, '0')}</span>
                  <span>{s.altitude}</span>
                </header>
                <div className={styles.portrait}><span style={peepStyle(s.peep)} /></div>
                <p className={cx(styles.industry, 'mono')}>{s.industry}</p>
                <h3>{s.title}</h3>
                <dl className={styles.story}>
                  <div className={styles.before}><dt className="mono">Before</dt><dd>{s.before}</dd></div>
                  <div><dt className="mono">With Eigi</dt><dd>{s.after}</dd></div>
                </dl>
                <span className={cx(styles.agent, 'mono')}>↳ {s.agent}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        <div className={styles.progress} aria-hidden="true">
          <motion.i style={{ scaleX: rope }} />
        </div>
      </div>
    </section>
  )
}
