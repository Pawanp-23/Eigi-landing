import { useEffect, useRef, useState, type CSSProperties } from 'react'
import logo from '../../../../assets/Images/logo.png'
import { COMPUTER, type AppKind } from '../../content/computer.ts'
import styles from './Computer.module.css'
import { track } from '../../../../utils/analytics.ts'
import { prefersReducedMotion } from '../../../../utils/motion.ts'

/** Simple line icons, drawn white on each app's coloured tile. Generic shapes, not brand logos. */
const ICONS: Record<AppKind, string> = {
  browser: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-9 9h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18',
  sheet: 'M4 4h16v16H4zM4 9.5h16M4 15h16M9.5 4v16',
  mail: 'M3 6h18v12H3zM3 6l9 7 9-7',
  slack: 'M9 3v18M15 3v18M3 9h18M3 15h18',
  whatsapp: 'M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3ZM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2Z',
  voice: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v3',
  board: 'M4 4h4.5v16H4zM10 4h4.5v10H10zM16 4h4v7h-4z',
  files: 'M4 6h6l2 2h8v11H4z',
}

const OPEN_MS = 700
const DWELL_MS = 3800
const VERB_COLOURS = ['var(--blue)', 'var(--red)', 'var(--green)', 'var(--yellow)', 'var(--ink)']

/** "The platform to ___." The last word rolls through the verbs. */
function Platform() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const t = setInterval(() => setI(v => (v + 1) % COMPUTER.verbs.length), 1900)
    return () => clearInterval(t)
  }, [])
  return (
    <p className={styles.platform}>
      {COMPUTER.platform}{' '}
      <span className={styles.slot}>
        <span key={i} className={styles.verb} style={{ color: VERB_COLOURS[i % VERB_COLOURS.length] }}>{COMPUTER.verbs[i]}.</span>
      </span>
      <span className="sr-only">{COMPUTER.verbs.join(', ')}.</span>
    </p>
  )
}

/** A live clock for the menu bar. */
function Clock() {
  const fmt = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  const [now, setNow] = useState(fmt)
  useEffect(() => { const t = setInterval(() => setNow(fmt()), 20000); return () => clearInterval(t) }, [])
  return <span>{now}</span>
}

const split = (t: string) => { const [who, ...rest] = t.split(': '); return [who, rest.join(': ')] as const }

/** Each app's window body, drawn as a tiny clean UI. Items stagger in with --d. */
function Window({ kind, items }: { kind: AppKind; items: string[] }) {
  const d = (i: number) => ({ '--d': `${200 + i * 260}ms` } as CSSProperties)
  switch (kind) {
    case 'browser': return <div className={styles.browser}>
      <p className={styles.url}><span className={styles.type}>clinics in austin without online booking</span></p>
      <ul>{items.map((t, i) => <li key={t} className={styles.in} style={d(i + 1)}><b>{t}</b><span>No online booking</span><em>✓</em></li>)}</ul>
    </div>
    case 'sheet': return <div className={styles.sheet}>{items.map((t, i) => <span key={i} className={i < 4 ? styles.th : styles.in} style={i < 4 ? undefined : d(Math.floor((i - 4) / 4) * 2 + (i % 4) * 0.4)}>{t}</span>)}</div>
    case 'mail': return <div className={styles.mail}>
      {items.map((t, i) => <p key={t} className={`${styles.in} ${i < 2 ? styles.field : ''}`} style={d(i)}>{t}</p>)}
      <p className={`${styles.in} ${styles.wait}`} style={d(items.length + 0.5)}>Waiting for your approval</p>
    </div>
    case 'slack': return <div className={styles.slack}>
      <ul className={styles.channels}><li># general</li><li data-on>#&nbsp;ops</li><li># sales</li><li># support</li></ul>
      <div className={styles.thread}>{items.map((t, i) => {
        const [who, text] = split(t)
        return <p key={t} className={styles.in} style={d(i * 1.4)}><i data-eigi={who === 'Eigi'}>{who[0]}</i><span><b>{who}</b>{text}</span></p>
      })}</div>
    </div>
    case 'whatsapp': return <div className={styles.whatsapp}>
      <p className={styles.contact}><i>P</i><span><b>Priya</b>customer · online</span></p>
      <div className={styles.wall}>{items.map((t, i) => {
        const [who, text] = split(t)
        return <p key={t} className={styles.in} data-eigi={who === 'Eigi'} style={d(i * 1.4)}>{text}{who === 'Eigi' && <em>✓✓</em>}</p>
      })}</div>
    </div>
    case 'voice': return <div className={styles.voice}>
      <div className={styles.caller}>
        <span className={styles.ring}><i>☎</i></span>
        <b>Inbound call</b><span>Eigi is answering</span>
        <span className={styles.wave} aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ animationDelay: `${(i * 97) % 600}ms` }} />)}</span>
      </div>
      <div className={styles.transcript}>
        {items.slice(0, -1).map((t, i) => { const [who, text] = split(t); return <p key={t} className={styles.in} data-eigi={who === 'Eigi'} style={d(i * 1.3)}><b>{who}</b>{text}</p> })}
        <p className={`${styles.in} ${styles.booked}`} style={d((items.length - 1) * 1.3)}>✓ {items[items.length - 1]}</p>
      </div>
    </div>
    case 'board': return <div className={styles.board}>
      {items.slice(0, 3).map(c => <div key={c}><span>{c}</span></div>)}
      <p className={styles.deal}>{items[3]}</p>
    </div>
    case 'files': return <div className={styles.files}>{items.map((t, i) => <p key={t} className={styles.in} data-flag={i === 4} style={d(i * 0.6)}><i />{t}</p>)}</div>
  }
}

/** A desktop the Eigi drives on its own. It cycles through apps while in view; tapping an app takes over. */
export default function ComputerSection() {
  const [active, setActive] = useState(0)
  /** bumps on every tap, so tapping the open app replays it */
  const [run, setRun] = useState(0)
  const [open, setOpen] = useState(false)
  const [auto, setAuto] = useState(true)
  const [visible, setVisible] = useState(false)
  const [cursor, setCursor] = useState({ x: 50, y: 50 })
  const screen = useRef<HTMLDivElement>(null)
  const dock = useRef<(HTMLButtonElement | null)[]>([])
  const reduced = prefersReducedMotion()
  const app = COMPUTER.apps[active]

  // Start only once the computer is on screen.
  useEffect(() => {
    const el = screen.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The cursor travels to the app in the dock, clicks, the window opens, and the cursor goes to work.
  useEffect(() => {
    const box = screen.current?.getBoundingClientRect()
    const icon = dock.current[active]?.getBoundingClientRect()
    if (!box || !icon) return
    setOpen(reduced)
    setCursor({ x: ((icon.left + icon.width / 2 - box.left) / box.width) * 100, y: ((icon.top + icon.height / 2 - box.top) / box.height) * 100 })
    if (reduced) return
    const t1 = setTimeout(() => { setOpen(true); setCursor({ x: 58, y: 42 }) }, OPEN_MS)
    const t2 = setTimeout(() => setCursor({ x: 68, y: 60 }), OPEN_MS + 1500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [active, run, reduced])

  // Auto-play the next app while visible, until the visitor takes over.
  useEffect(() => {
    if (!auto || !visible || reduced) return
    const t = setTimeout(() => setActive(a => (a + 1) % COMPUTER.apps.length), OPEN_MS + DWELL_MS)
    return () => clearTimeout(t)
  }, [active, auto, visible, reduced])

  const pick = (i: number) => { track('computer_app', { app: COMPUTER.apps[i].name }); setAuto(false); setActive(i); setRun(r => r + 1) }

  return (
    <section id="computer" className={`section ${styles.section}`} aria-labelledby="computer-title">
      <div className="wrap">
        <div className={styles.head}>
          <p className="eyebrow dot">{COMPUTER.eyebrow}</p>
          <h2 id="computer-title">{COMPUTER.title[0]} <span className="serif">{COMPUTER.title[1]}</span></h2>
          <Platform />
          <p className="lede">{COMPUTER.lede}</p>
        </div>

        <div className={styles.device}>
          <div className={styles.bezel}>
            <span className={styles.camera} aria-hidden="true" />
            <div className={styles.display}>
              <div className={styles.menubar}>
                <span className={styles.mark} style={{ '--logo': `url(${logo})` } as CSSProperties} aria-label="eigi" />
                <b>{app.name}</b>
                <span className={styles.menus} aria-hidden="true">File&nbsp;&nbsp;Edit&nbsp;&nbsp;View</span>
                <span className={styles.status} data-on={open}>{open ? 'Eigi is working' : 'Opening…'}</span>
                <Clock />
              </div>

              <div className={styles.screen} ref={screen}>
                <svg className={styles.contours} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  {[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M-50 ${300 - i * 34}C150 ${250 - i * 30} 260 ${360 - i * 36} 420 ${280 - i * 32}S700 ${200 - i * 30} 860 ${250 - i * 34}`} />)}
                </svg>

                <div key={`${active}-${run}`} className={styles.window} data-open={open} style={{ '--app': app.color } as CSSProperties}>
                  <p className={styles.title}>
                    <span className={styles.lights} aria-hidden="true"><i /><i /><i /></span>
                    <span className={styles.tileSm} aria-hidden="true"><svg viewBox="0 0 24 24"><path d={ICONS[app.kind]} /></svg></span>
                    {app.name}
                  </p>
                  <div className={styles.body}>{open && <Window kind={app.kind} items={app.items} />}</div>
                </div>

                <div className={styles.cursor} data-click={!open} style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }} aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" /></svg>
                  <span>Eigi</span>
                </div>

                <div className={styles.dock} role="group" aria-label="Apps on the Eigi computer">
                  {COMPUTER.apps.map((a, i) => <button
                    key={a.kind} type="button" ref={el => { dock.current[i] = el }}
                    aria-pressed={i === active} aria-label={`${a.name}: ${a.job}`} title={a.name}
                    style={{ '--app': a.color } as CSSProperties}
                    onClick={() => pick(i)}
                  >
                    <span className={styles.tile}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[a.kind]} /></svg></span>
                    <span className={styles.label}>{a.name}</span>
                  </button>)}
                </div>
              </div>
            </div>
          </div>
          <span className={styles.neck} aria-hidden="true" />
          <span className={styles.base} aria-hidden="true" />
        </div>

        <div className={styles.caption} aria-live="polite">
          <p>{open ? <><b style={{ color: app.color }}>✓</b> {app.job}</> : <span className="hint">{COMPUTER.hint}</span>}</p>
          <p className="fine">{COMPUTER.approval} Illustrative example.</p>
        </div>
      </div>
    </section>
  )
}
