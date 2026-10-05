import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Mascot } from '../../components/brand/Mascot.tsx'
import { RichText } from '../../components/ui/RichText.tsx'
import { COMPUTER, SCENES, type SceneMessage } from '../../content/computer.ts'
import { AI_TEAM, CREW, type CrewId } from '../../lib/crew.ts'
import { cx } from '../../lib/cx.ts'
import { calm } from '../../lib/motion.ts'
import type { Shown } from './thread.ts'
import { useScenePlayer } from './useScenePlayer.ts'
import styles from './SlackWindow.module.css'

const Tick = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 5.2l2 2L8 3" />
  </svg>
)

/** Eigi Computer, shown the way most founders will meet it: a teammate in their Slack. */
export function SlackWindow() {
  const reduced = useReducedMotion() ?? false
  const player = useScenePlayer(reduced)
  const { scene, thread, typing, draft, running, play, approve, keep } = player
  const feedRef = useRef<HTMLDivElement>(null)
  // auto-play happens once; after that the visitor is in charge of which channel is open
  const started = useRef(false)
  useEffect(() => {
    const feed = feedRef.current
    if (feed) feed.scrollTo({ top: feed.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [thread, reduced])

  const placeholder = scene.dm ? `Message ${scene.title}` : `Message ${scene.title.replace('# ', '#')}`

  return (
    // plays the first channel live the first time the window scrolls into view
    <motion.div
      className={styles.win}
      viewport={{ once: true, amount: 0.35 }}
      onViewportEnter={() => {
        if (started.current || reduced) return
        started.current = true
        play(SCENES[0].id)
      }}
      role="region" aria-label="Your AI team working inside a Slack workspace (illustrative example)">
      <div className={styles.bar}>
        <span className={styles.lights} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.search}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" /></svg>
          Search {COMPUTER.workspace}
        </span>
        <span />
      </div>

      <div className={styles.body}>
        <div className={styles.rail} aria-hidden="true">
          <div className={styles.ws}>YS</div>
          <span className={styles.on}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 9l7-6 7 6v8H3z" /></svg></span>
          <span><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 4h14v10H8l-4 3v-3H3z" /></svg></span>
          <span><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M10 3a5 5 0 015 5v3l2 3H3l2-3V8a5 5 0 015-5zM8 17h4" /></svg></span>
        </div>

        <nav className={styles.side} aria-label="Channels">
          <h4>{COMPUTER.workspace} <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 4.5l3 3 3-3" /></svg></h4>
          <SideGroup label="Channels">
            {SCENES.filter((s) => !s.dm).map((s) => (
              <ChannelButton key={s.id} active={s.id === scene.id} onClick={() => { started.current = true; play(s.id) }} unread={s.unread}>
                <span className={styles.hash}>#</span><span className={styles.nm}>{s.title.slice(2)}</span>
              </ChannelButton>
            ))}
          </SideGroup>
          <SideGroup label="Direct messages">
            {SCENES.filter((s) => s.dm).map((s) => (
              <ChannelButton key={s.id} active={s.id === scene.id} onClick={() => { started.current = true; play(s.id) }}>
                <span className={styles.ma}><Mascot id="sherpa" head /></span><span className={styles.nm}>{s.title}</span>
              </ChannelButton>
            ))}
          </SideGroup>
          <SideGroup label="Your AI team">
            {AI_TEAM.map((id) => (
              <span key={id} className={cx(styles.ch, styles.muted)}>
                <span className={styles.ma}><Mascot id={id} head /></span><span className={styles.nm}>{CREW[id].name}</span>
              </span>
            ))}
          </SideGroup>
        </nav>

        <div className={styles.main}>
          <div className={styles.head}>
            <b>{scene.title}</b>
            <span className={styles.pill}>
              <span className={styles.heads}>{AI_TEAM.map((id) => <span key={id}><Mascot id={id} head /></span>)}</span>
              <span className={styles.pillText}>Your AI team is in this channel</span>
            </span>
          </div>
          <div className={styles.chips}>
            {SCENES.map((s) => (
              <button key={s.id} type="button" className={cx(s.id === scene.id && styles.chipOn)} onClick={() => { started.current = true; play(s.id) }}>{s.title}</button>
            ))}
          </div>

          <div ref={feedRef} className={styles.feed} aria-live="polite">
            <div className={styles.divider}>{scene.divider}</div>
            {thread.map((m, i) => (
              <Message key={m.key} shown={m} running={running[m.key]} onApprove={() => approve(i)} onKeep={() => keep(i)} />
            ))}
          </div>
          <div className={styles.typing}>
            {typing && <><span className={styles.dots}><i /><i /><i /></span>{typing}</>}
          </div>
          <div className={styles.composer}>
            <div className={cx(styles.ph, draft !== null && styles.typed)}>{draft ?? placeholder}</div>
            <div className={styles.tb}>
              <span>+&nbsp;&nbsp;Aa&nbsp;&nbsp;@</span>
              <span className={styles.send}><svg viewBox="0 0 16 16" fill="#fff"><path d="M2 2l12 6-12 6 2-6z" /></svg></span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SideGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className={styles.secT}>▾ {label}</div>
      {children}
    </div>
  )
}

function ChannelButton({ active, unread, onClick, children }: { active: boolean; unread?: number; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className={cx(styles.ch, active && styles.active, !active && !!unread && styles.unread)} onClick={onClick} aria-current={active}>
      {children}
      {!active && unread ? <span className={styles.badge}>{unread}</span> : null}
    </button>
  )
}

function Avatar({ from }: { from: SceneMessage['from'] }) {
  if (from === 'you') return <div className={cx(styles.av, styles.you)}>You</div>
  return <div className={styles.av} style={{ ['--c' as string]: CREW[from].color }}><Mascot id={from} head /></div>
}

function Message({ shown, running, onApprove, onKeep }: { shown: Shown; running?: number; onApprove: () => void; onKeep: () => void }) {
  const { message: m, stepsDone, ask, live } = shown
  const crew = m.from === 'you' ? null : CREW[m.from as CrewId]
  return (
    <motion.div
      className={styles.msg}
      style={crew ? { ['--c' as string]: crew.color } : undefined}
      initial={live ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={calm}
    >
      <Avatar from={m.from} />
      <div className={styles.content}>
        <div className={styles.hd}>
          <b>{m.from === 'you' ? 'You' : crew!.name}</b>
          {m.from !== 'you' && m.from !== 'sherpa' && <span className={styles.app}>EIGI</span>}
          {m.from === 'sherpa' && <span className={styles.role}>Eigi engineer</span>}
          <time>{m.time}</time>
        </div>
        <div className={styles.tx}><RichText text={m.text} mentionClass={styles.mention} /></div>

        {m.work && (
          <div className={styles.work}>
            <div className={styles.wt}><span>{m.work.title}</span><span>{m.work.label ?? 'Eigi'}</span></div>
            {m.work.steps.map((s, i) => (
              <div key={s.text} className={cx(styles.step, i < stepsDone && styles.ok, running === i && styles.run)}>
                <span className={styles.ck}><Tick /></span>
                <span>{s.text}<span className={styles.res}>{i < stepsDone ? s.result : ' '}</span></span>
                <span className={styles.tool}>{s.tool}</span>
              </div>
            ))}
          </div>
        )}

        {m.ask && (
          <div className={styles.ask}>
            <span className={styles.ok2}>Needs your OK</span>
            <blockquote>{m.ask.quote}</blockquote>
            {ask === 'waiting' && (
              <div className={styles.acts}>
                <button type="button" className="sbtn primary" onClick={onApprove}>{m.ask.yes}</button>
                <button type="button" className="sbtn" onClick={onKeep}>{m.ask.no}</button>
              </div>
            )}
            {ask === 'approved' && <div className={styles.approved}>✓ Approved by you</div>}
            {ask === 'kept' && <div className={cx(styles.approved, styles.keptNote)}>Kept as a draft for you</div>}
          </div>
        )}

        {m.note && <div className={styles.note}>{m.note}</div>}
      </div>
    </motion.div>
  )
}
