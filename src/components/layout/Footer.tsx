import { buddy, LINKS } from '../../content/site.ts'
import { Sherpie } from '../brand/Sherpie.tsx'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

/** One last ask. */
export function Footer() {
  return (
    <footer className={styles.end}>
      <Sherpie hands className={styles.peek} lines={['Ready when you are.', 'One workflow is a good place to begin.', 'Buddy’s really nice. I promise.']} />
      <div className={`wrap ${styles.endInner}`}>
        <p className="eyebrow">Your next chapter</p>
        <h2>Keep the ambition. <span className="serif">Lose the busywork.</span></h2>
        <p className={styles.endLede}>You don’t need an AI roadmap to start. Tell Buddy the job you’d hand over first.</p>
        <div className={styles.ctas}>
          <a className="btn" href={buddy('I want to start using AI in my business.', 'footer')} target="_blank" rel="noopener noreferrer">Talk to Buddy on WhatsApp ↗</a>
          <a className={styles.alt} href={LINKS.email}>buddy@eigi.ai</a>
        </div>
        <nav className={styles.links} aria-label="More">
          <a href="/stories/">Success stories</a>
          <a href={LINKS.studio}>Go to Studio</a>
          <a href={LINKS.docs} target="_blank" rel="noopener noreferrer">Documentation ↗</a>
          <a href="#top">Back to the top ↑</a>
          <span>© {YEAR} Eigi</span>
        </nav>
      </div>
    </footer>
  )
}
