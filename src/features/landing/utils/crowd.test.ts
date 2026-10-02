import { expect, test } from 'vitest'
import { createCrowd } from './crowd.ts'

const sprite = { naturalWidth: 3600, naturalHeight: 2268 } as HTMLImageElement

test('keeps the stage populated as walkers cross and get replaced', () => {
  const crowd = createCrowd(sprite)
  crowd.resize(900, 400)
  expect(crowd.walkers).toHaveLength(30)

  for (let i = 0; i < 100; i++) crowd.tick(0.5) // 50 s: everyone has crossed at least once
  expect(crowd.walkers).toHaveLength(30)
  expect(new Set(crowd.walkers.map((w) => w.rect.join()))).toHaveProperty('size', 30) // no duplicates
  for (const w of crowd.walkers) expect(w.x).toBeGreaterThanOrEqual(-w.w)
  expect(crowd.walkers.map((w) => w.baseY)).toEqual(crowd.walkers.map((w) => w.baseY).sort((a, b) => a - b))
})

test('tapping a walker gives them a sherpa exactly once; tapping empty sky does nothing', () => {
  const crowd = createCrowd(sprite)
  crowd.resize(900, 400)
  const front = crowd.walkers.at(-1)!
  const cx = (front.dir > 0 ? front.x : front.x - front.w) + front.w / 2
  const cy = front.y + front.h / 2

  expect(crowd.pickAt(cx, -50)).toBe(false)
  expect(crowd.pickAt(cx, cy)).toBe(true)
  expect(crowd.pickAt(cx, cy)).toBe(false)
  expect(crowd.walkers.filter((w) => w.chosen)).toHaveLength(1)
})
