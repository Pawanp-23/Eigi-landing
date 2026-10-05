import { FOOTER_LINKS } from '../../content/site.ts'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.row}`}>
        <span>© {YEAR} Eigi AI</span>
        <span className={styles.links}>
          {FOOTER_LINKS.map((l) => (
            <a key={l.label} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{l.label}</a>
          ))}
        </span>
      </div>
    </footer>
  )
}
