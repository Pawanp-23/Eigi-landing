import Footer from '../LandingPage/Footer/index.tsx'
import Header from '../LandingPage/Header/index.tsx'
import { useLookAt } from '../../hooks/useLookAt.ts'
import StoriesSection from './sections/StoriesSection/index.tsx'

/** The Success stories page (/stories/): real client and community stories. */
export default function StoriesPage() {
  useLookAt()
  return <>
    <Header page="stories" />
    <main id="top">
      <StoriesSection />
    </main>
    <Footer />
  </>
}
