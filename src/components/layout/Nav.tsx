import styles from './Nav.module.css'

type NavProps = { cta: string; href: string }

export function Nav({ cta, href }: NavProps) {
  return (
    <nav className={styles.nav}>
      <span className={styles.logo} role="img" aria-label="eigi.ai" />
      <a className={styles.cta} href={href}>{cta}</a>
    </nav>
  )
}
