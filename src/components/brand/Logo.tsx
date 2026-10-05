import logo from '../../assets/logo.png'
import styles from './Logo.module.css'

/** The eigi.ai wordmark. logo.png is white on transparent, so it's used as a mask and takes the ink colour. */
export function Logo() {
  return (
    <a className={styles.logo} href="#top" aria-label="eigi.ai home" style={{ ['--logo' as string]: `url(${logo})` }} />
  )
}
