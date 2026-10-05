import logo from '../../../assets/Images/logo.png'
import { amit, LINKS } from '../content/site.ts'
import styles from './Header.module.css'

const SECTIONS = [
  { href: '#why', label: 'Why Eigi' },
  { href: '#computer', label: 'Computer' },
  { href: '#plate', label: 'Your plate' },
  { href: '#gateway', label: 'Gateway' },
  { href: '#climb', label: 'Sherpas' },
  { href: '#people', label: 'People' },
]

export default function Header() {
  return (
    <header className={styles.nav}>
      <a className={styles.brand} href="#top" aria-label="eigi.ai home" style={{ ['--logo' as string]: `url(${logo})` }} />
      <nav aria-label="Sections"><ul>{SECTIONS.map(s => <li key={s.href}><a href={s.href}>{s.label}</a></li>)}</ul></nav>
      <div className={styles.actions}>
        <a className={styles.studio} href={LINKS.studio}>Studio</a>
        <a className="btn ink" href={amit('I would like to meet my Eigi and hand over a first job.', 'nav')} target="_blank" rel="noopener noreferrer">Talk to Amit</a>
      </div>
    </header>
  )
}
