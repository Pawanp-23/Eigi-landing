import { Nav } from './components/Nav.tsx'
import { useLookAt } from './lib/useLookAt.ts'
import { Climb } from './sections/Climb.tsx'
import { EigiComputer } from './sections/EigiComputer.tsx'
import { Gateway } from './sections/Gateway.tsx'
import { HandOver } from './sections/HandOver.tsx'
import { Footer, Founders, Notes } from './sections/NextChapter.tsx'
import { Plate } from './sections/Plate.tsx'
import { Trap, Why } from './sections/Why.tsx'

/**
 * Hand a job over, then the story (why Eigi), the Eigi computer, then play: clear your plate,
 * open the gateway, climb with a sherpa, meet the people.
 */
export function App() {
  useLookAt()
  return <>
    <Nav />
    <main id="top">
      <HandOver />
      <Why />
      <Trap />
      <EigiComputer />
      <Plate />
      <Gateway />
      <Climb />
      <Notes />
      <Founders />
    </main>
    <Footer />
  </>
}
