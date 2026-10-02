export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export type Rgb = [number, number, number]

export const mixRgb = (a: Rgb, b: Rgb, t: number) =>
  `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(',')})`

/**
 * A closed, wobbly ring — one topographic contour line — as an SVG path.
 * `squash` flattens it vertically; `wobble(rad)` pushes the radius in or out at each angle.
 */
export function contourPath(
  cx: number,
  cy: number,
  r: number,
  squash: number,
  stepDeg: number,
  wobble: (rad: number) => number,
) {
  let d = ''
  for (let a = 0; a <= 360; a += stepDeg) {
    const rad = (a * Math.PI) / 180
    const rr = r + wobble(rad)
    d += `${a ? 'L' : 'M'}${(cx + Math.cos(rad) * rr).toFixed(1)} ${(cy + Math.sin(rad) * rr * squash).toFixed(1)}`
  }
  return `${d}Z`
}
