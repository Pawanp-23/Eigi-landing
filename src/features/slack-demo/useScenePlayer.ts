import { useCallback, useEffect, useRef, useState } from 'react'
import { SCENES, type Scene } from '../../content/computer.ts'
import { CREW, type CrewId } from '../../lib/crew.ts'
import { approveAt, finishedThread, keepAt, show, type Shown } from './thread.ts'

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
const plain = (text: string) => text.replace(/\*\*/g, '')

export interface Player {
  scene: Scene
  thread: Shown[]
  /** "Chief of Sales is working…" while a teammate prepares a message */
  typing: string | null
  /** what the visitor is "typing" into the composer, or null for the placeholder */
  draft: string | null
  /** index of the work step currently running, per message key */
  running: Record<string, number>
  play: (id: string) => void
  approve: (index: number) => void
  keep: (index: number) => void
}

/**
 * Plays a scene like a live channel: the visitor's request types into the composer, each teammate
 * "works", ticks off its steps, then asks for approval (which answers itself after a pause).
 * Switching scenes cancels the one in progress. With reduced motion, scenes appear finished.
 */
export function useScenePlayer(reduced: boolean): Player {
  const [sceneId, setSceneId] = useState(SCENES[0].id)
  const [thread, setThread] = useState<Shown[]>(() => finishedThread(SCENES[0]))
  const [typing, setTyping] = useState<string | null>(null)
  const [draft, setDraft] = useState<string | null>(null)
  const [running, setRunning] = useState<Record<string, number>>({})
  const run = useRef(0)
  const scene = SCENES.find((s) => s.id === sceneId) ?? SCENES[0]

  // stop any scene still playing when the component goes away
  useEffect(() => () => { run.current += 1 }, [])

  const showFinished = useCallback((id: string) => {
    run.current += 1
    const next = SCENES.find((s) => s.id === id) ?? SCENES[0]
    setSceneId(next.id)
    setThread(finishedThread(next))
    setTyping(null)
    setDraft(null)
    setRunning({})
  }, [])

  const approve = useCallback((index: number) => setThread((t) => approveAt(t, index)), [])
  const keep = useCallback((index: number) => setThread((t) => keepAt(t, index)), [])

  const play = useCallback(async (id: string) => {
    if (reduced) return showFinished(id)
    const me = ++run.current
    const alive = () => me === run.current
    const next = SCENES.find((s) => s.id === id) ?? SCENES[0]
    setSceneId(next.id)
    setThread([])
    setTyping(null)
    setDraft(null)
    setRunning({})

    for (const [i, message] of next.messages.entries()) {
      if (!alive()) return
      const key = `${next.id}-${i}`
      if (message.from === 'you') {
        const text = plain(message.text)
        for (let n = 2; n <= text.length + 1; n += 2) {
          if (!alive()) return
          setDraft(text.slice(0, n))
          await wait(18)
        }
        await wait(250)
        setDraft(null)
      } else {
        const who = message.from === 'sherpa' ? 'Your sherpa is typing…' : `${CREW[message.from as CrewId].name} is working…`
        setTyping(who)
        await wait(900)
        setTyping(null)
      }
      if (!alive()) return
      setThread((t) => [...t, show(message, key, true)])

      const steps = message.work?.steps.length ?? 0
      for (let s = 0; s < steps; s++) {
        if (!alive()) return
        setRunning((r) => ({ ...r, [key]: s }))
        await wait(750)
        if (!alive()) return
        setThread((t) => t.map((m) => (m.key === key ? { ...m, stepsDone: s + 1 } : m)))
      }
      setRunning((r) => {
        const rest = { ...r }
        delete rest[key]
        return rest
      })

      await wait(700)
      if (message.ask) {
        await wait(2400)
        if (!alive()) return
        // answers itself, as if you'd tapped approve; a real tap gets there first
        setThread((t) => approveAt(t, t.findIndex((m) => m.key === key)))
        await wait(900)
      }
    }
  }, [reduced, showFinished])

  return { scene, thread, typing, draft, running, play, approve, keep }
}
