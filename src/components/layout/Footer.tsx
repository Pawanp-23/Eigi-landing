import { motion } from 'motion/react'
import type { FormEvent } from 'react'
import { reveal } from '../../styles/motion.ts'
import { cx } from '../../utils/cx.ts'
import { DOCS_URL } from './Nav.tsx'
import styles from './Footer.module.css'

const EMAIL = 'buddy@eigi.ai'
const PHONE = '+91 98231 72692'
const YEAR = new Date().getFullYear()

const LINKS: [label: string, href: string][] = [
  ['Documentation', DOCS_URL],
  ['Privacy Policy', 'https://eigi.ai/privacy-policy'],
  ['Terms of Service', 'https://eigi.ai/terms-of-service'],
  ['Data Deletion', 'https://eigi.ai/data-deletion'],
]

/** No backend: the form hands the message to the visitor's own mail app, addressed to Eigi. */
function sendViaMail(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const f = new FormData(e.currentTarget)
  const get = (k: string) => String(f.get(k) ?? '').trim()
  const company = get('company')
  const subject = `Hello from ${get('name')}${company ? ` (${company})` : ''}`
  const body = `${get('message')}\n\n${get('name')}\n${get('email')}${company ? `\n${company}` : ''}`
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Contact (base of the summit) plus the site footer. Sits after the climb, so it stays on the black sky. */
export function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.contact}>
        <div>
          <motion.p className="eyebrow mono" {...reveal}>Contact</motion.p>
          <motion.h2 {...reveal}>Keep the ambition.<br />Lose the busywork.</motion.h2>
          <motion.p className="lead" {...reveal}>
            Tell us what’s taking up your day. Let’s see what we can give back. Prefer to talk now? Radio Amit, our AI guide.
          </motion.p>
          <motion.dl className={styles.details} {...reveal}>
            <div><dt className="mono">Email us</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
            <div><dt className="mono">Call us</dt><dd><a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a></dd></div>
            <div><dt className="mono">Location</dt><dd>India</dd></div>
          </motion.dl>
        </div>

        <motion.form className={styles.form} onSubmit={sendViaMail} {...reveal}>
          <label><span className="mono">Your name *</span><input name="name" required autoComplete="name" /></label>
          <label><span className="mono">Email address *</span><input name="email" type="email" required autoComplete="email" /></label>
          <label className={styles.full}><span className="mono">Company (optional)</span><input name="company" autoComplete="organization" /></label>
          <label className={styles.full}><span className="mono">Your message *</span><textarea name="message" rows={4} required /></label>
          <button type="submit" className={cx('btn', styles.send)}>Send message <span aria-hidden="true">→</span></button>
        </motion.form>
      </div>

      <div className={styles.bottom}>
        <nav aria-label="Footer" className={styles.links}>
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
        </nav>
        <p className={cx(styles.legal, 'mono')}>
          © {YEAR} Eigi AI · All rights reserved, India
        </p>
      </div>
    </footer>
  )
}
