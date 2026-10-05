import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react'
import { JOBS, PAINS, PLATE } from '../../content/plate.ts'
import { ROLE_ORDER, ROLES, type Role } from '../../content/site.ts'
import styles from './Plate.module.css'
import { track } from '../../../../utils/analytics.ts'

interface Drag { i: number; x: number; y: number; dx: number; dy: number; moved: boolean }

/** Find the Eigi dock under the pointer, if any. */
const dockAt = (x: number, y: number) =>
  (document.elementsFromPoint(x, y).find(el => (el as HTMLElement).dataset?.dock) as HTMLElement | undefined)?.dataset.dock as Role | undefined

/**
 * Sound familiar? + First jobs, as a game: the founder's plate is piled with jobs.
 * Drag each one to the Eigi who should own it (or tap a job, then tap an Eigi).
 */
export default function PlateSection() {
  const [placed, setPlaced] = useState<Record<number, Role>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [drag, setDrag] = useState<Drag | null>(null)
  const [over, setOver] = useState<Role | null>(null)
  const [nudge, setNudge] = useState<{ i: number; text: string } | null>(null)
  const nudgeTimer = useRef(0)

  const left = JOBS.map((_, i) => i).filter(i => placed[i] === undefined)
  const done = left.length === 0
  useEffect(() => { if (done) track('plate_cleared') }, [done])

  const hand = (i: number, role: Role) => {
    setSelected(null)
    if (JOBS[i].role === role) {
      setPlaced(p => ({ ...p, [i]: role }))
      setNudge(null)
    } else {
      clearTimeout(nudgeTimer.current)
      setNudge({ i, text: `Close! That’s one for your ${ROLES[JOBS[i].role].short} Eigi.` })
      nudgeTimer.current = window.setTimeout(() => setNudge(null), 2200)
    }
  }

  const down = (i: number) => (e: RPointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setDrag({ i, x: e.clientX, y: e.clientY, dx: 0, dy: 0, moved: false })
  }
  const move = (e: RPointerEvent<HTMLButtonElement>) => {
    if (!drag) return
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y
    setDrag({ ...drag, dx, dy, moved: drag.moved || Math.hypot(dx, dy) > 6 })
    setOver(dockAt(e.clientX, e.clientY) ?? null)
  }
  const up = (e: RPointerEvent<HTMLButtonElement>) => {
    if (!drag) return
    const role = drag.moved ? dockAt(e.clientX, e.clientY) : undefined
    if (role) hand(drag.i, role)
    else if (!drag.moved) setSelected(s => (s === drag.i ? null : drag.i))
    setDrag(null); setOver(null)
  }

  return (
    <section id="plate" className={`section ${styles.section}`} aria-labelledby="plate-title">
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <p className="eyebrow dot">{PLATE.eyebrow}</p>
            <h2 id="plate-title">{PLATE.title[0]} <span className="serif">{PLATE.title[1]}</span></h2>
          </div>
          <div>
            <p className="lede">{PLATE.lede}</p>
            <p className={styles.meter} aria-live="polite">
              <span>Jobs still on your plate</span>
              <b>{left.length}</b>
              <i style={{ '--fill': `${(left.length / JOBS.length) * 100}%` } as CSSProperties} />
            </p>
          </div>
        </div>

        <div className={styles.board}>
          <div className={styles.plate} data-done={done}>
            {!done && <p className={styles.thought}>“{PAINS[left.length % PAINS.length]}”</p>}
            {done
              ? <div className={styles.clear}>
                  <p>{PLATE.done} <span className="serif">you.</span></p>
                  <button type="button" className="btn ghost" onClick={() => setPlaced({})}>Pile it back on ↺</button>
                </div>
              : <ul className={styles.pile}>
                  {left.map((i, n) => {
                    const dragging = drag?.i === i
                    return <li key={i} style={{ '--r': `${((i * 47) % 11) - 5}deg`, '--z': dragging ? 20 : n } as CSSProperties}>
                      <button
                        type="button"
                        className={styles.job}
                        data-selected={selected === i}
                        data-dragging={dragging}
                        data-shake={nudge?.i === i}
                        style={dragging ? { transform: `translate(${drag.dx}px, ${drag.dy}px) rotate(0deg) scale(1.05)` } : undefined}
                        onPointerDown={down(i)} onPointerMove={move} onPointerUp={up} onPointerCancel={() => setDrag(null)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(s => (s === i ? null : i)) } }}
                        aria-pressed={selected === i}
                      >{JOBS[i].task}</button>
                    </li>
                  })}
                </ul>}
            {nudge && <p className={styles.nudge} role="status">{nudge.text}</p>}
          </div>

          <ul className={styles.docks} aria-label="Your Eigis">
            {ROLE_ORDER.map(role => {
              const mine = Object.entries(placed).filter(([, r]) => r === role).map(([i]) => JOBS[Number(i)].task)
              return <li key={role}>
                <button
                  type="button"
                  data-dock={role}
                  data-over={over === role}
                  data-ready={selected !== null}
                  className={styles.dock}
                  style={{ '--c': ROLES[role].color, '--t': ROLES[role].tint } as CSSProperties}
                  onClick={() => selected !== null && hand(selected, role)}
                  aria-label={`${ROLES[role].name}, ${mine.length} of 3 jobs`}
                >
                  <span className={styles.avatar} aria-hidden="true">{ROLES[role].mark}</span>
                  <span className={styles.name}>{ROLES[role].name}</span>
                  <span className={styles.count}>{mine.length}/3</span>
                  <span className={styles.taken}>{mine.map(t => <em key={t}>{t}</em>)}</span>
                </button>
              </li>
            })}
          </ul>
        </div>
        <p className="fine">Illustrative first jobs. Your Eigi checks with you before anything goes out in your name.</p>
      </div>
    </section>
  )
}
