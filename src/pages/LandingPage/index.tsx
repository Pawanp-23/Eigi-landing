import Footer from './Footer/index.tsx'
import Header from './Header/index.tsx'
import { useLookAt } from '../../hooks/useLookAt.ts'
import ClimbSection from './sections/ClimbSection/index.tsx'
import ComputerSection from './sections/ComputerSection/index.tsx'
import FoundersSection from './sections/FoundersSection/index.tsx'
import GatewaySection from './sections/GatewaySection/index.tsx'
import HeroSection from './sections/HeroSection/index.tsx'
import NotesSection from './sections/NotesSection/index.tsx'
import PlateSection from './sections/PlateSection/index.tsx'
import TrapSection from './sections/TrapSection/index.tsx'
import WhySection from './sections/WhySection/index.tsx'

/**
 * The page, top to bottom: hand a job over, the story (why, the trap, the Eigi computer),
 * then play (your plate, the gateway, the climb), then proof and people.
 */
export default function LandingPage() {
  useLookAt()
  return <>
    <Header />
    <main id="top">
      <HeroSection />
      <WhySection />
      <TrapSection />
      <ComputerSection />
      <PlateSection />
      <GatewaySection />
      <ClimbSection />
      <NotesSection />
      <FoundersSection />
    </main>
    <Footer />
  </>
}
