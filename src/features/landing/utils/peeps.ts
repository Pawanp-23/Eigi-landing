/*
 * Open Peeps sprite sheet: 15 × 7 hand-drawn people, 240 × 324 px each.
 * Crowd sprite adapted from Skiper UI "Skiper 39" (attribution required on the free tier),
 * itself inspired by codepen.io/zadvorsky/pen/xxwbBQV. Illustrations: openpeeps.com (CC0).
 */
import type { CSSProperties } from 'react'
import spriteUrl from '../../../assets/peeps.png'

export { spriteUrl }

const COLS = 15
const ROWS = 7
export const PEEP_COUNT = COLS * ROWS

export type Rect = [x: number, y: number, w: number, h: number]

/** Source rectangle of peep `i` inside the loaded sprite. */
export function cellRect(sprite: { naturalWidth: number; naturalHeight: number }, i: number): Rect {
  const w = sprite.naturalWidth / COLS
  const h = sprite.naturalHeight / ROWS
  return [(i % COLS) * w, Math.floor(i / COLS) * h, w, h]
}

/** CSS-sprite background showing peep `i`; give the element a 240 / 324 aspect ratio. */
export const peepStyle = (i: number): CSSProperties => ({
  backgroundImage: `url(${spriteUrl})`,
  backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
  backgroundPosition: `${((i % COLS) / (COLS - 1)) * 100}% ${(Math.floor(i / COLS) / (ROWS - 1)) * 100}%`,
})
