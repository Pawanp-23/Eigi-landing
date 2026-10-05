import { LINKS, NAV } from '../../content/site.ts'
import { amitLink } from '../../lib/amit.ts'
import { Logo } from '../brand/Logo.tsx'
import styles from './Nav.module.css'

export function Nav() {
  return (
    <nav className={styles.nav} aria-label="Main">
      <div className={`wrap ${styles.row}`}>
        <Logo />
        <div className={styles.links}>
          {NAV.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </div>
        <div className={styles.cta}>
          <a className={`btn ghost ${styles.studio}`} href={LINKS.studio}>Go to Studio ↗</a>
          <a className="btn ink" href={amitLink('hero')} target="_blank" rel="noopener noreferrer">Talk to Amit</a>
        </div>
      </div>
    </nav>
  )
}
