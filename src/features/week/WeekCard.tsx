import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Mascot } from '../../components/brand/Mascot.tsx'
import { Sherpie } from '../../components/brand/Sherpie.tsx'
import { PAINS, WEEK } from '../../content/story.ts'
import { CREW, type CrewId } from '../../lib/crew.ts'
import { cx } from '../../lib/cx.ts'
import { calm } from '../../lib/motion.ts'
import { WEEK_HOURS, hoursTaken, layWeek } from './week.ts'
import styles from './WeekCard.module.css'

const SHORT: Record<CrewId, string> = { cos: 'Staff', sales: 'Sales', mkt: 'Marketing', ops: 'Ops', sherpa: 'Sherpa' }
const crewOf = (area: string) => (PAINS.find((p) => p.area === area)?.crew ?? 'ops') as CrewId

/**
 * Your week as a calendar. Each pain you recognise eats into the hours you meant to spend building,
 * in grey. Hand it to your Eigis and the blocks turn into your AI team's colours: the hours come back.
 */
export function WeekCard({ picked }: { picked: readonly string[] }) {
  const reduced = useReducedMotion()
  const key = picked.join('|')
  // handing off belongs to this exact set of pains; picking another one asks again
  const [handedFor, setHandedFor] = useState<string | null>(null)
  const handed = picked.length > 0 && handedFor === key
  const taken = hoursTaken(picked)
  const days = layWeek(picked)

  const big = handed ? `+${taken}h` : `${WEEK_HOURS - taken}h`
  const label = handed ? WEEK.back : picked.length ? WEEK.left : `${WEEK.left}. For now.`
  let wave = 0

  return (
    <aside className={cx(styles.card, handed && styles.handed)} aria-live="polite">
      <div className={styles.peek} aria-hidden="true">
        <motion.div animate={{ y: handed ? -10 : 0 }} transition={{ type: 'spring', bounce: 0.5, visualDuration: 0.4 }}>
          <Sherpie />
        </motion.div>
      </div>

      <div className="eyebrow">{WEEK.eyebrow}</div>
      <div className={styles.total}>
        <motion.b
          key={big} className={cx(handed && styles.gain)}
          initial={reduced ? false : { y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={calm}
        >{big}</motion.b>
        <span>{label}</span>
      </div>

      <div className={styles.cal} role="img" aria-label={`${WEEK_HOURS - taken} of ${WEEK_HOURS} hours left to build`}>
        {days.map((blocks, d) => (
          <div key={WEEK.days[d]} className={styles.day}>
            <span className={styles.dayName}>{WEEK.days[d]}</span>
            <div className={styles.col}>
              {blocks.map((b, i) => {
                const crew = b.area ? crewOf(b.area) : null
                const order = b.area ? wave++ : 0
                return (
                  <motion.div
                    key={`${b.area ?? 'build'}-${i}`}
                    layout={!reduced}
                    className={cx(styles.block, !b.area && styles.build, b.hours === 1 && styles.thin)}
                    style={{
                      flexGrow: b.hours,
                      ['--c' as string]: crew ? CREW[crew].color : undefined,
                      ['--ct' as string]: crew ? CREW[crew].tint : undefined,
                      ['--i' as string]: order,
                    }}
                    initial={reduced || !b.area ? false : { opacity: 0, scaleY: 0.4 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={calm}
                  >
                    {b.area ? (
                      <>
                        <span className={styles.head}><Mascot id={crew!} head /></span>
                        <span className={styles.what}>{handed ? SHORT[crew!] : b.area}</span>
                      </>
                    ) : (
                      b.hours > 1 && <span className={styles.what}>Build</span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.foot}>
        {!picked.length && <span className={styles.hint}>{WEEK.empty}</span>}
        {picked.length > 0 && !handed && (
          <button type="button" className="btn ink" onClick={() => setHandedFor(key)}>{WEEK.hand} →</button>
        )}
        {handed && (
          <>
            <span className={styles.done}>{WEEK.handed}</span>
            <button type="button" className={styles.back} onClick={() => setHandedFor(null)}>{WEEK.takeBack}</button>
          </>
        )}
      </div>
      <p className="fine">{WEEK.fine}</p>
    </aside>
  )
}
