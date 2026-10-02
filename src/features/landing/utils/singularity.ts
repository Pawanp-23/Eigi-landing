/*
 * Gateway to Singularity: three orbits (humans, forward-deployed engineers, Eigi computer)
 * that appear one by one as you scroll, then spiral into a single event horizon.
 * Pure maths only; the canvas loop lives in hooks/useSingularity.ts.
 */
import { clamp } from '../../../utils/math.ts'

export type Glyph = 'dot' | 'dash' | 'pixel'

/** Outer to inner. `radius` is a fraction of the stage's short side; inner orbits spin faster. */
export const ORBITS = [
  { label: 'Humans', glyph: 'dot', radius: 0.42, count: 420, speed: 0.12 },
  { label: 'Forward-deployed engineers', glyph: 'dash', radius: 0.3, count: 260, speed: 0.2 },
  { label: 'Eigi computer', glyph: 'pixel', radius: 0.19, count: 320, speed: 0.32 },
] as const satisfies readonly { label: string; glyph: Glyph; radius: number; count: number; speed: number }[]

export const HORIZON = 0.07

export type Particle = { orbit: number; angle: number; speed: number; jitter: number }

export function createParticles(rand: () => number = Math.random): Particle[] {
  return ORBITS.flatMap((o, orbit) =>
    Array.from({ length: o.count }, () => ({
      orbit,
      angle: rand() * Math.PI * 2,
      speed: o.speed * (0.7 + rand() * 0.6),
      jitter: (rand() - 0.5) * 0.09,
    })),
  )
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)
/** Gentle start and finish, so nothing pops in or snaps off. */
const smooth = (t: number) => t * t * (3 - 2 * t)

/**
 * Where the story is at section progress `p` (0 to 1):
 * each orbit fades in (`reveal`), then they all `collapse` into the horizon, then `open` the gateway.
 */
export function phase(p: number) {
  return {
    reveal: ORBITS.map((_, i) => smooth(clamp((p - i * 0.18) / 0.14))),
    collapse: easeInOut(clamp((p - 0.6) / 0.28)),
    open: easeInOut(clamp((p - 0.86) / 0.12)),
  }
}

/** Distance from the centre, as a fraction of the short side: the orbit's ring, pulled in by `collapse`. */
export function particleRadius(particle: Particle, collapse: number) {
  const ring = ORBITS[particle.orbit].radius * (1 + particle.jitter)
  return ring + (HORIZON - ring) * collapse
}

/** The caption step for progress `p`: one per orbit, then "converging", then the gateway itself. */
export const stepAt = (p: number) => (p < 0.18 ? 0 : p < 0.36 ? 1 : p < 0.6 ? 2 : p < 0.86 ? 3 : 4)
