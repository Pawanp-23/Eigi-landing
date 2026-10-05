import { Footer } from '../components/layout/Footer.tsx'
import { Nav } from '../components/layout/Nav.tsx'
import { EigiComputer } from '../sections/EigiComputer.tsx'
import { Faq } from '../sections/Faq.tsx'
import { FieldNotes } from '../sections/FieldNotes.tsx'
import { FirstJobs } from '../sections/FirstJobs.tsx'
import { Gateway } from '../sections/Gateway.tsx'
import { Hero } from '../sections/Hero.tsx'
import { HowYourEigiWorks } from '../sections/HowYourEigiWorks.tsx'
import { NextChapter } from '../sections/NextChapter.tsx'
import { People } from '../sections/People.tsx'
import { Problem } from '../sections/Problem.tsx'
import { Sherpas } from '../sections/Sherpas.tsx'
import { SoundFamiliar } from '../sections/SoundFamiliar.tsx'
import { Suite } from '../sections/Suite.tsx'

/**
 * "/": the story in order. Eigi Computer comes straight after the hero because it is the product;
 * then empathy (sound familiar, the problem), what Eigi is, how it works, the people, and the close.
 */
export function HomePage() {
  return (
    <>
      <a className="skip" href="#computer">Skip to content</a>
      <Nav />
      <main id="top">
        <Hero />
        <EigiComputer />
        <SoundFamiliar />
        <Problem />
        <Gateway />
        <HowYourEigiWorks />
        <Suite />
        <FirstJobs />
        <Sherpas />
        <FieldNotes />
        <People />
        <Faq />
        <NextChapter />
      </main>
      <Footer />
    </>
  )
}
