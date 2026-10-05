import { Footer } from '../components/layout/Footer.tsx'
import { Nav } from '../components/layout/Nav.tsx'
import { useLookAt } from '../lib/useLookAt.ts'
import { Stories } from '../sections/Stories.tsx'

/** The Success stories page (/stories/): real client and community stories. */
export function StoriesPage() {
  useLookAt()
  return <>
    <Nav page="stories" />
    <main id="top">
      <Stories />
    </main>
    <Footer />
  </>
}
