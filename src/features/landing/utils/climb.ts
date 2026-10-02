/*
 * Where the visitor is on the climb, read live from the page.
 * Sections own their labels via `data-stage` (the route updates its own per camp), and altitude is
 * measured over <main>, the same way the altimeter and the menu measure it.
 */
import { clamp } from '../../../utils/math.ts'
import { altitude } from './altitude.ts'

/** The last section with a non-empty `data-stage` whose top has passed the middle of the screen. */
export function readStage() {
  let label = 'Base camp'
  for (const el of document.querySelectorAll<HTMLElement>('[data-stage]')) {
    if (el.dataset.stage && el.getBoundingClientRect().top <= window.innerHeight / 2) label = el.dataset.stage
  }
  return label
}

/** Current height on the climb, e.g. "3,400 m". */
export function readAltitude() {
  const main = document.querySelector('main')
  if (!main) return altitude(0)
  const top = main.getBoundingClientRect().top + window.scrollY
  return altitude(clamp((window.scrollY - top) / Math.max(1, main.offsetHeight - window.innerHeight)))
}
