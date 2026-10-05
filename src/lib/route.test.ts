import { describe, expect, it } from 'vitest'
import { AT, CAMP_AT, H, pointAt, ROUTE, W } from './route.ts'

describe('the rope up the mountain', () => {
  it('starts at base camp and ends at the summit', () => {
    const close = (v: number, [x, y]: [number, number]) => {
      expect(pointAt(v)[0]).toBeCloseTo(x, 6)
      expect(pointAt(v)[1]).toBeCloseTo(y, 6)
    }
    close(0, ROUTE[0])
    close(100, ROUTE[ROUTE.length - 1])
  })

  it('places every camp on the rope, in order, between base and summit', () => {
    const at = CAMP_AT.map(i => AT[i])
    expect(at).toEqual([...at].sort((a, b) => a - b))
    for (const v of at) expect(v).toBeGreaterThan(0)
    for (const v of at) expect(v).toBeLessThan(100)
    for (const i of CAMP_AT) {
      const [x, y] = pointAt(AT[i])
      expect(x).toBeCloseTo(ROUTE[i][0], 6)
      expect(y).toBeCloseTo(ROUTE[i][1], 6)
    }
  })

  it('always climbs: every step up the slider is higher on the mountain', () => {
    for (let v = 0; v < 100; v += 5) expect(pointAt(v + 5)[0]).toBeGreaterThan(pointAt(v)[0])
    expect(pointAt(100)[1]).toBeLessThan(pointAt(0)[1])
  })

  it('stays inside the drawing', () => {
    for (let v = 0; v <= 100; v += 2.5) {
      const [x, y] = pointAt(v)
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x).toBeLessThanOrEqual(W)
      expect(y).toBeGreaterThanOrEqual(0)
      expect(y).toBeLessThanOrEqual(H)
    }
  })
})
