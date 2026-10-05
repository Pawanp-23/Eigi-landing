import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Sherpie from '../../../../components/common/Sherpie/index.tsx'
import { buddy } from '../../../LandingPage/content/site.ts'
import { STORIES, STORIES_PAGE, type StoryArt, type StoryCard } from '../../content/stories.ts'
import styles from './Stories.module.css'

/** One thin line icon per card, drawn on a 24-unit grid. */
const ICONS: Record<StoryArt, string> = {
  connect: 'M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM9.9 9.9 6.2 6.2M14.1 9.9l3.7-3.7M9.9 14.1l-3.7 3.7M14.1 14.1l3.7 3.7M4.5 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM19.5 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM4.5 17.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM19.5 17.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z',
  chat: 'M4 5.5h16v10.5H9.5L5 19.5V16H4zM8 9.5h8M8 12.5h5',
}

const Icon = ({ kind }: { kind: StoryArt }) =>
  <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true"><path d={ICONS[kind]} /></svg>

/** Marks an element once it has scrolled into view, so its contents can arrive (and arrives anyway after 2.5s). */
function useArrived<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [arrived, setArrived] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setArrived(true); io.disconnect() } }, { threshold: 0.3 })
    io.observe(el)
    // never leave content waiting on the observer: show it anyway after a moment
    const fallback = setTimeout(() => setArrived(true), 2500)
    return () => { io.disconnect(); clearTimeout(fallback) }
  }, [])
  return [ref, arrived] as const
}

/**
 * A real story, in the hero's window style: the story on one side, and on the other
 * the work the Eigi took over, dropping in as job cards like "Your plate".
 */
function StoryRow({ story, number, flip }: { story: StoryCard; number: number; flip: boolean }) {
  const [ref, arrived] = useArrived<HTMLElement>()
  return (
    <article ref={ref} className={styles.row} data-kind="story" data-flip={flip} data-peek={number === 1} data-arrived={arrived} style={{ '--c': story.color } as CSSProperties}>
      <div className={styles.stage}>
        {number === 1 && <Sherpie hands className={styles.peek} lines={['Both of these are real.', 'More are on the way.', 'Yours could be next.']} />}
        <div className={styles.window}>
          <div className={styles.chrome}>
            <span className={styles.lights} aria-hidden="true"><i /><i /><i /></span>
            <span>Story {String(number).padStart(2, '0')} · {story.label}</span>
            <span className={styles.status}>{story.status}</span>
          </div>
          <div className={styles.body}>
            <h3>{story.title}</h3>
            <dl className={styles.story}>
              <div><dt>{STORIES_PAGE.flip.challenge}</dt><dd>{story.challenge}</dd></div>
              <div><dt>{STORIES_PAGE.flip.withEigi}</dt><dd>{story.withEigi}</dd></div>
            </dl>
            {story.cta && <a className="btn ink" href={buddy(story.cta.text, story.cta.ref)} target="_blank" rel="noopener noreferrer">{story.cta.label}</a>}
            {story.small && <p className={styles.small}>{story.small}</p>}
          </div>
        </div>
      </div>

      <div className={styles.work} aria-label={`What the Eigi took over for ${story.label}`}>
        <p className={styles.who}><span className={styles.avatar}><Icon kind={story.art} /></span>{story.agent}</p>
        <ul className={styles.jobs}>
          {story.tags?.map((t, i) => <li key={t} style={{ '--i': i } as CSSProperties}><span aria-hidden="true">✓</span>{t}</li>)}
        </ul>
      </div>
    </article>
  )
}

/** The Success stories page, in the landing page's own language: real stories only. */
export default function StoriesSection() {
  return <>
    <section id="stories" className={styles.hero} aria-labelledby="stories-title">
      <svg className={styles.contours} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map(i => <path key={i} transform={`translate(${-i * 26} ${i * 22})`} d="M-150 520C80 560 175 410 110 300S75 150 220 120 305-40 240-80M1180 760C1080 560 1430 590 1340 380S1330 210 1520 160" />)}
      </svg>
      <div className={`wrap ${styles.heroInner}`}>
        <p className="eyebrow dot">{STORIES_PAGE.eyebrow}</p>
        <h1 id="stories-title">{STORIES_PAGE.heading[0]} <span className="serif">{STORIES_PAGE.heading[1]}</span></h1>
        <p className="lede">{STORIES_PAGE.lede}</p>
      </div>
    </section>

    <section id="real-stories" className={`section ${styles.real}`} aria-label="Real stories">
      <div className={`wrap ${styles.rows}`}>
        {STORIES.map((s, i) => <StoryRow key={s.title} story={s} number={i + 1} flip={i % 2 === 1} />)}
      </div>
    </section>

    <section className={styles.next} aria-label="Your story">
      <div className={`wrap ${styles.nextInner}`}>
        <p className={styles.nextLine}>{STORIES_PAGE.outro[0]} <span className="serif">{STORIES_PAGE.outro[1]}</span></p>
        <a className="btn ink" href={buddy('I read the Eigi success stories and would like one like that for my business.', 'stories')} target="_blank" rel="noopener noreferrer">Tell Buddy your story ↗</a>
      </div>
    </section>
  </>
}
