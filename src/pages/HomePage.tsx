import { useInView } from 'motion/react'
import { useRef } from 'react'
import { Nav } from '../components/layout/Nav.tsx'
import {
  altitude, Altimeter, Atmosphere, BaseCamp, FinalCta, Problem, Route, SherpaCursor, Sherpas, Stand, Summit,
} from '../features/landing/index.ts'

/** The menu's links, in page order. */
const SECTIONS = [
  { href: '#base-camp', label: 'Base camp' },
  { href: '#problem', label: 'The problem' },
  { href: '#stand', label: 'Where we stand' },
  { href: '#route', label: 'The route' },
  { href: '#sherpas', label: 'Sherpas' },
  { href: '#summit', label: 'Summit' },
] as const

/** "/": The Ascent — one scroll from base camp (0 m) to the summit (8,848 m). */
export function HomePage() {
  const sherpasRef = useRef<HTMLElement>(null)
  const sherpaTalks = useInView(sherpasRef, { margin: '-40% 0px -40% 0px' })

  return (
    <>
      <Atmosphere />
      <SherpaCursor talking={sherpaTalks} />
      <Nav cta="Start your ascent" href="#summit" links={SECTIONS} formatProgress={altitude} />
      <Altimeter />
      <main>
        <BaseCamp />
        <Problem />
        <Stand />
        <Route />
        <Sherpas ref={sherpasRef} />
        <Summit />
        <FinalCta />
      </main>
    </>
  )
}
