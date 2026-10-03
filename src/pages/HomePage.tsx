import { useInView } from 'motion/react'
import { useRef } from 'react'
import { Footer } from '../components/layout/Footer.tsx'
import { Nav } from '../components/layout/Nav.tsx'
import {
  altitude, Altimeter, Atmosphere, BaseCamp, Computer, Faq, FieldTest, Gateway, Minds, Problem, Radio, Route, SherpaCompanion, Sherpas, Stand, Stories, Summit,
} from '../features/landing/index.ts'

/** The menu's links, in page order. */
const SECTIONS = [
  { href: '#base-camp', label: 'Base camp' },
  { href: '#problem', label: 'The problem' },
  { href: '#stand', label: 'Where we stand' },
  { href: '#stories', label: 'Eigi stories' },
  { href: '#gateway', label: 'The gateway' },
  { href: '#computer', label: 'Eigi Computer' },
  { href: '#field-test', label: 'Field test' },
  { href: '#route', label: 'The route' },
  { href: '#sherpas', label: 'Sherpas' },
  { href: '#summit', label: 'Summit' },
  { href: '#minds', label: 'Eigi minds' },
  { href: '#faq', label: 'Questions' },
  { href: '#contact', label: 'Contact' },
] as const

/** "/": The Ascent, one scroll from base camp (0 m) to the summit (8,848 m), then contact and footer. */
export function HomePage() {
  // the climb (sky colour, altimeter) is measured over <main> only, so the footer never shifts it
  const climbRef = useRef<HTMLElement>(null)
  const sherpasRef = useRef<HTMLElement>(null)
  const sherpaTalks = useInView(sherpasRef, { margin: '-40% 0px -40% 0px' })

  return (
    <>
      <Atmosphere climb={climbRef} flipAt={sherpasRef} />
      <SherpaCompanion shown={sherpaTalks} />
      <Nav links={SECTIONS} formatProgress={altitude} />
      <Altimeter climb={climbRef} />
      <Radio />
      <main id="top" ref={climbRef}>
        <BaseCamp />
        <Problem />
        <Stand />
        <Stories />
        <Gateway />
        <Computer />
        <FieldTest />
        <Route />
        <Sherpas ref={sherpasRef} />
        <Summit />
      </main>
      {/* after the climb: outside <main>, so it never shifts the altitudes */}
      <Minds />
      <Faq />
      <Footer />
    </>
  )
}
