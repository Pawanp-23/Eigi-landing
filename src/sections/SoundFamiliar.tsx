import { Heading } from '../components/ui/Heading.tsx'
import { FAMILIAR, PAINS } from '../content/story.ts'
import { WeekCard } from '../features/week/WeekCard.tsx'
import { amitLink } from '../lib/amit.ts'
import { cx } from '../lib/cx.ts'
import styles from './SoundFamiliar.module.css'

interface SoundFamiliarProps {
  /** pains the visitor has tapped, in tap order (kept by the page so later sections can use them) */
  mine: readonly string[]
  onToggle: (area: string) => void
}

/** Sound familiar? Tap the pains that are yours and watch them eat your week. */
export function SoundFamiliar({ mine, onToggle: toggle }: SoundFamiliarProps) {
  const n = mine.length

  return (
    <section className="section" id="familiar" aria-labelledby="familiar-title" style={{ paddingTop: 'clamp(40px, 6vw, 80px)' }}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <Heading eyebrow={FAMILIAR.eyebrow} title={FAMILIAR.title} serif={FAMILIAR.titleSerif} id="familiar-title" />
          <ol className={styles.list}>
            {PAINS.map((p, i) => {
              const on = mine.includes(p.area)
              return (
                <li key={p.area} className={cx(on && styles.mine)}>
                  <span className={styles.area}>{String(i + 1).padStart(2, '0')} · {p.area}</span>
                  <p>{p.text}</p>
                  <button type="button" aria-pressed={on} onClick={() => toggle(p.area)}>{FAMILIAR.button}{on ? ' ✓' : ''}</button>
                </li>
              )
            })}
          </ol>
          <div className={styles.close}>
            <p>{FAMILIAR.closing} <span className="serif">{FAMILIAR.closingSerif}</span></p>
            {n ? (
              <a className="fine tlink" href={amitLink('familiar', `The ones that are true for us: ${mine.join(', ')}.`)} target="_blank" rel="noopener noreferrer">
                {n} of 5. Tell Amit which one hurts most ↗
              </a>
            ) : (
              <span className="fine">{FAMILIAR.prompt}</span>
            )}
          </div>
        </div>
        <WeekCard picked={mine} />
      </div>
    </section>
  )
}
