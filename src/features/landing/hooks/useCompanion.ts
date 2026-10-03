import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLoad } from '../state/useLoad.ts'
import { DARK_STAGES, STILL_WITH_ME, beatFor, type Beat } from '../utils/companion.ts'
import { readStage } from '../utils/climb.ts'

/** Sections where Sherpie is already on stage (hero) or hiding in the scenery (Eigi Computer).
 *  Any part on screen counts: Eigi Computer is many screens tall, so a percentage would never be reached. */
const ON_STAGE = ['#base-camp', '#computer']

export type Companion = {
  visible: boolean
  beat: Beat
  /** true while the page is scrolling: legs and arms swing */
  stride: 0 | 1 | null
  /** scrolling back up: Sherpie turns round */
  facingBack: boolean
  /** the speech bubble is up */
  talking: boolean
  /** on a black sky */
  dark: boolean
}

/**
 * Drives the walking Sherpie: which stage you're at (its beat), whether you're scrolling (stride),
 * which way (facingBack), and when it speaks (on each new stage, and "still with me?" after a pause).
 * Hidden while the hero or Eigi Computer is on screen, since Sherpie is there in person.
 */
export function useCompanion(): Companion {
  const { load } = useLoad()
  const still = useReducedMotion()
  const { scrollY } = useScroll()
  const [stage, setStage] = useState('Base camp')
  const [stride, setStride] = useState<0 | 1 | null>(null)
  const [facingBack, setFacingBack] = useState(false)
  const [talking, setTalking] = useState(false)
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(true)
  const timers = useRef({ step: 0, stop: 0, talk: 0, pause: 0 })
  const stageRef = useRef('Base camp')
  const askedAt = useRef('') // "still with me?" once per stage, not on every pause

  // in person elsewhere? then the corner Sherpie steps out of view
  // re-attached whenever the load changes: choosing one remounts Eigi Computer as a fresh element
  useEffect(() => {
    const seen = new Map<Element, boolean>()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting))
      setHidden([...seen.values()].some(Boolean))
    }, { threshold: 0, rootMargin: '-15% 0px -15% 0px' })
    const raf = requestAnimationFrame(() => {
      ON_STAGE.forEach((sel) => { const el = document.querySelector(sel); if (el) io.observe(el) })
    })
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [load])

  useMotionValueEvent(scrollY, 'change', (y) => {
    const t = timers.current
    const prev = scrollY.getPrevious() ?? y
    if (Math.abs(y - prev) > 1) setFacingBack(y < prev)
    setPaused(false)
    window.clearTimeout(t.pause)
    t.pause = window.setTimeout(() => {
      if (askedAt.current === stageRef.current) return
      askedAt.current = stageRef.current
      setPaused(true)
    }, 3200)

    // a new part of the climb: Sherpie says its line for a few seconds
    const next = readStage()
    if (next !== stageRef.current) {
      stageRef.current = next
      setStage(next)
      setTalking(true)
      window.clearTimeout(t.talk)
      t.talk = window.setTimeout(() => setTalking(false), 3400)
    }

    if (still) return
    // swing the stride every ~170 ms while scrolling, settle when scrolling stops
    if (!t.step) t.step = window.setInterval(() => setStride((s) => (s === 0 ? 1 : 0)), 170)
    window.clearTimeout(t.stop)
    t.stop = window.setTimeout(() => { window.clearInterval(t.step); t.step = 0; setStride(null) }, 180)
  })

  useEffect(() => {
    const t = timers.current
    return () => { window.clearInterval(t.step); window.clearTimeout(t.stop); window.clearTimeout(t.talk); window.clearTimeout(t.pause) }
  }, [])

  const beat = paused && !hidden ? STILL_WITH_ME : beatFor(stage, load)
  return { visible: !hidden, beat, stride, facingBack, talking: talking || paused, dark: DARK_STAGES.has(stage) }
}
