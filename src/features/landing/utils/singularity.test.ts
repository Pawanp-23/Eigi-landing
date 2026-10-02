import { describe, expect, it } from 'vitest'
import { HORIZON, ORBITS, createParticles, particleRadius, phase, stepAt } from './singularity.ts'

describe('singularity', () => {
  it('creates every orbit’s particles', () => {
    const particles = createParticles(() => 0.5)
    expect(particles).toHaveLength(ORBITS.reduce((n, o) => n + o.count, 0))
    expect(new Set(particles.map((p) => p.orbit))).toEqual(new Set([0, 1, 2]))
  })

  it('reveals the orbits in order, humans first', () => {
    expect(phase(0).reveal).toEqual([0, 0, 0])
    const mid = phase(0.2).reveal
    expect(mid[0]).toBe(1)
    expect(mid[1]).toBeGreaterThan(0)
    expect(mid[2]).toBe(0)
    expect(phase(1).reveal).toEqual([1, 1, 1])
  })

  it('pulls every particle onto the horizon once fully collapsed', () => {
    const [p] = createParticles(() => 0.9)
    expect(particleRadius(p, 0)).toBeGreaterThan(HORIZON)
    expect(particleRadius(p, 1)).toBeCloseTo(HORIZON)
  })

  it('ends on the gateway step, fully open', () => {
    expect(stepAt(0)).toBe(0)
    expect(stepAt(1)).toBe(4)
    expect(phase(1).open).toBe(1)
  })
})
