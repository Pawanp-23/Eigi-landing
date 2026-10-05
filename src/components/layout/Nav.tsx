import logo from '../../assets/brand/logo.png'
import { buddy, LINKS } from '../../content/site.ts'
import styles from './Nav.module.css'

const SECTIONS = [
  { href: '#why', label: 'Why Eigi' },
  { href: '#computer', label: 'Computer' },
  { href: '#plate', label: 'Your plate' },
  { href: '#gateway', label: 'Gateway' },
  { href: '#climb', label: 'Sherpas' },
  { href: '#people', label: 'People' },
]

/** The top bar. On the stories page, section links point back to the home page. */
export function Nav({ page = 'home' }: { page?: 'home' | 'stories' }) {
  const home = page === 'home' ? '' : '/'
  return (
    <header className={styles.nav}>
      <a className={styles.brand} href={page === 'home' ? '#top' : '/'} aria-label="eigi.ai home" style={{ ['--logo' as string]: `url(${logo})` }} />
      <nav aria-label="Sections"><ul>
        {SECTIONS.map(s => <li key={s.href}><a href={home + s.href}>{s.label}</a></li>)}
        <li><a href="/stories/" aria-current={page === 'stories' ? 'page' : undefined}>Success stories</a></li>
      </ul></nav>
      <div className={styles.actions}>
        <a className={styles.studio} href={LINKS.studio}>Studio</a>
        <a className="btn ink" href={buddy('I would like to meet my Eigi and hand over a first job.', 'nav')} target="_blank" rel="noopener noreferrer">Talk to Buddy</a>
      </div>
    </header>
  )
}
