import aman from '../../../../assets/Images/aman-khandelwal.webp'
import mrunmay from '../../../../assets/Images/mrunmay-chichkhede.webp'
import { FOUNDERS } from '../../content/people.ts'
import { LINKS } from '../../content/site.ts'
import styles from './Founders.module.css'

const PHOTOS = [aman, mrunmay]

/** The founders, on their own: a short intro and two clean portrait cards. */
export default function FoundersSection() {
  return (
    <section id="people" className={`section ${styles.people}`} aria-labelledby="people-title">
      <div className={`wrap ${styles.peopleGrid}`}>
        <div className={styles.intro}>
          <p className="eyebrow dot">Small team. Same as you.</p>
          <h2 id="people-title">Real people. <span className="serif">In your corner.</span></h2>
          <p className="lede">We’re building Eigi for the founders who want to do more without becoming a bigger company. We know the feeling.</p>
          <a className="btn ghost" href={LINKS.email}>Say hello to the team ↗</a>
        </div>
        <ul className={styles.founders}>
          {FOUNDERS.map((f, i) => <li key={f.name} className={styles.founder}>
            <img src={PHOTOS[i]} alt={`${f.name}, ${f.role}`} width="320" height="400" loading="lazy" decoding="async" />
            <div className={styles.about}>
              <span className={styles.role}>{f.role}</span>
              <h3>{f.name}</h3>
              <p>{f.line}</p>
            </div>
          </li>)}
        </ul>
      </div>
    </section>
  )
}
