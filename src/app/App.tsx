import { Footer } from '../components/layout/Footer.tsx'
import { Nav } from '../components/layout/Nav.tsx'
import { useLookAt } from '../lib/useLookAt.ts'
import { Climb } from '../sections/Climb.tsx'
import { Computer } from '../sections/Computer.tsx'
import { Founders } from '../sections/Founders.tsx'
import { Gateway } from '../sections/Gateway.tsx'
import { Hero } from '../sections/Hero.tsx'
import { Notes } from '../sections/Notes.tsx'
import { Plate } from '../sections/Plate.tsx'
import { Trap } from '../sections/Trap.tsx'
import { Why } from '../sections/Why.tsx'

/**
 * The page, top to bottom: hand a job over, the story (why, the trap, the Eigi computer),
 * then play (your plate, the gateway, the climb), then proof and people.
 */
export function App() {
  useLookAt()
  return <>
    <Nav />
    <main id="top">
      <Hero />
      <Why />
      <Trap />
      <Computer />
      <Plate />
      <Gateway />
      <Climb />
      <Notes />
      <Founders />
    </main>
    <Footer />
  </>
}
