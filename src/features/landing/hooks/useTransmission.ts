import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { timeline, type Transmission } from '../utils/crew.ts'

export type Playback = {
  /** 0 nothing · 1 your message · 2 crew is working · 3.. steps ticked · then the reply */
  stage: number
  /** How many characters of the reply are typed so far. */
  typed: number
  done: boolean
}

/**
 * Plays one radio transmission while `playing`: your message, the crew member at work, each step
 * ticking off, then the reply typed out. Restarts whenever `run` changes (new mission or replay).
 * With reduced motion it shows the finished exchange straight away.
 */
export function useTransmission(t: Transmission, playing: boolean, run: number): Playback {
  const still = useReducedMotion()
  const full: Playback = { stage: 3 + t.steps.length, typed: t.reply.length, done: true }
  const [p, setP] = useState<Playback>({ stage: 0, typed: 0, done: false })

  useEffect(() => {
    if (still || !playing) return
    const tl = timeline(t)
    const timers: number[] = []
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms))

    at(0, () => setP({ stage: 0, typed: 0, done: false }))
    at(tl.ask + 120, () => setP((s) => ({ ...s, stage: 1 })))
    at(tl.working, () => setP((s) => ({ ...s, stage: 2 })))
    tl.steps.forEach((ms, i) => at(ms, () => setP((s) => ({ ...s, stage: 3 + i }))))
    at(tl.reply, () => {
      setP((s) => ({ ...s, stage: 3 + t.steps.length }))
      let n = 0
      const type = window.setInterval(() => {
        n = Math.min(t.reply.length, n + 2)
        setP((s) => ({ ...s, typed: n, done: n >= t.reply.length }))
        if (n >= t.reply.length) window.clearInterval(type)
      }, tl.typeMs * 2)
      timers.push(type)
    })
    return () => timers.forEach((id) => { window.clearTimeout(id); window.clearInterval(id) })
  }, [t, playing, run, still])

  return still ? full : p
}
