import { useState, type CSSProperties } from 'react'
import { Sherpie } from '../components/Sherpie.tsx'
import { amit, CLIMB } from '../content.ts'
import styles from './Climb.module.css'
import { track } from '../lib/analytics.ts'

const W = 800
const H = 420
/** The route up, as vertices. Camps sit on vertices 1, 3, 5 and 7; the summit is the last one. */
const ROUTE: [number, number][] = [[30, 400], [150, 352], [235, 372], [335, 282], [405, 300], [505, 200], [565, 222], [655, 112], [722, 46]]
const CAMP_AT = [1, 3, 5, 7]

const SEG = ROUTE.slice(1).map((p, i) => Math.hypot(p[0] - ROUTE[i][0], p[1] - ROUTE[i][1]))
const LEN = SEG.reduce((a, b) => a + b, 0)
/** How far along the route (0 to 100) each vertex sits. */
const AT = ROUTE.map((_, i) => (SEG.slice(0, i).reduce((a, b) => a + b, 0) / LEN) * 100)

function pointAt(v: number): [number, number] {
  let d = (v / 100) * LEN
  for (let i = 0; i < SEG.length; i++) {
    if (d <= SEG[i] || i === SEG.length - 1) {
      const t = Math.min(1, d / SEG[i])
      return [ROUTE[i][0] + (ROUTE[i + 1][0] - ROUTE[i][0]) * t, ROUTE[i][1] + (ROUTE[i + 1][1] - ROUTE[i][1]) * t]
    }
    d -= SEG[i]
  }
  return ROUTE[ROUTE.length - 1]
}

const line = ROUTE.map(p => p.join(',')).join(' ')

/** Meet your AI sherpas: drag Sherpie up the rope, and each camp tells you what happens there. */
export function Climb() {
  const [v, setRaw] = useState(0)
  const setV = (next: number) => { if (next >= 99.5 && v < 99.5) track('climb_summit'); setRaw(next) }
  const reached = CAMP_AT.filter(i => v >= AT[i] - 0.5).length
  const camp = CLIMB.camps[Math.max(0, reached - 1)]
  const summit = v >= 99.5
  const [x, y] = pointAt(v)

  return (
    <section id="climb" className={`section ${styles.section}`} aria-labelledby="climb-title">
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <p className="eyebrow dot">{CLIMB.eyebrow}</p>
            <h2 id="climb-title">{CLIMB.title[0]} <span className="serif">{CLIMB.title[1]}</span></h2>
          </div>
          <div>
            <p className="lede">{CLIMB.lede}</p>
            <ul className={styles.principles}>{CLIMB.principles.map(p => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>

        <div className={styles.mountain}>
          <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} aria-hidden="true">
            <path className={styles.far} d="M0 420 L120 250 L210 300 L330 150 L420 230 L540 90 L640 170 L800 60 L800 420 Z" />
            <polygon className={styles.near} points={`0,420 ${line} 800,140 800,420`} />
            <path className={styles.snow} d="M655 112 L722 46 L790 120 L760 112 L735 128 L705 105 L680 122 Z" />
            <polyline className={styles.rope} points={line} />
            <polyline className={styles.climbed} points={line} pathLength={100} style={{ strokeDasharray: `${v} 100` }} />
            {CAMP_AT.map((i, n) => <g key={i} className={styles.flag} data-on={n < reached} transform={`translate(${ROUTE[i][0]} ${ROUTE[i][1]})`}>
              <line y1="0" y2="-34" /><path d="M0 -34 L20 -28 L0 -21 Z" /><text y="18" textAnchor="middle">{CLIMB.camps[n].name}</text>
            </g>)}
          </svg>

          <div className={styles.climber} data-summit={summit} style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` } as CSSProperties}>
            <Sherpie />
          </div>

          <div className={styles.camp} aria-live="polite">
            {reached === 0
              ? <p className={styles.start}><b>Base camp.</b> “Where do we start?” Drag Sherpie up the rope.</p>
              : <>
                  <span className={styles.campName}>{camp.name}</span>
                  <h3>{camp.title}</h3>
                  <p>{camp.body}</p>
                  <span className={styles.output}>↳ {camp.output}</span>
                </>}
          </div>

          {summit && <div className={styles.summit}>
            <p>“How did we work without this?”</p>
            <a className="btn ink" href={amit('I would like help finding the first AI workflow for my business.', 'summit')} target="_blank" rel="noopener noreferrer">Let’s find your first workflow ↗</a>
          </div>}
        </div>

        <label className={styles.slider}>
          <span className="sr-only">Climb with your sherpa</span>
          <input type="range" min={0} max={100} step={0.5} value={v} onChange={e => setV(Number(e.target.value))}
            aria-valuetext={summit ? 'Summit' : reached ? CLIMB.camps[reached - 1].name : 'Base camp'} />
        </label>
        <div className={styles.jumps}>
          <button type="button" onClick={() => setV(0)} aria-pressed={v === 0}>Base</button>
          {CAMP_AT.map((i, n) => <button key={i} type="button" onClick={() => setV(AT[i])} aria-pressed={reached === n + 1 && !summit}>{CLIMB.camps[n].name}</button>)}
          <button type="button" onClick={() => setV(100)} aria-pressed={summit}>Summit</button>
        </div>
      </div>
    </section>
  )
}
