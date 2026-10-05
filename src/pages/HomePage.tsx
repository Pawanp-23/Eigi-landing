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
import { useBrief } from '../lib/useBrief.ts'

/**
 * "/": the story in order. The visitor recognises their week (sound familiar), then meets the answer,
 * Eigi Computer, the product. Then the problem, what Eigi is, how it works, the people, and the close.
 */
export function HomePage() {
  // what the visitor tells us on the way down, carried to the sections that answer it
  const { brief, setTask, togglePain } = useBrief()
  return (
    <>
      <a className="skip" href="#computer">Skip to content</a>
      <Nav />
      <main id="top">
        <Hero task={brief.task} onTask={setTask} />
        <SoundFamiliar mine={brief.pains} onToggle={togglePain} />
        <EigiComputer />
        <Problem />
        <Gateway />
        <HowYourEigiWorks />
        <Suite />
        <FirstJobs pain={brief.pains[0]} />
        <Sherpas />
        <FieldNotes />
        <People />
        <Faq />
        <NextChapter brief={brief} />
      </main>
      <Footer />
    </>
  )
}
