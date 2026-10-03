import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { easeOut, reveal } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { OPEN_RADIO } from './Radio.tsx'
import styles from './Faq.module.css'

const QUESTIONS = [
  {
    q: 'Do I need to be technical?',
    a: 'No. Your sherpas handle the technical side. You bring how your business actually works; we choose the tools, wire them up and show your team how to use them.',
  },
  {
    q: 'Is Eigi another AI tool to manage?',
    a: 'No. We work inside the tools you already use, like your inbox, calendar, Slack and CRM. Your AI crew reports back there, so there is no new dashboard to babysit.',
  },
  {
    q: 'Can we start with just one workflow?',
    a: 'Yes, and most teams do. We find the one that costs you the most hours, get it working in your real tools, then take on the next when you are ready.',
  },
  {
    q: 'What happens after the first conversation?',
    a: 'We map where AI fits your business and which work to start with. Then we build your first workflow with you, so you see it working before deciding on anything more.',
  },
]

/** Questions at base camp: the objections people have before the climb, as a checklist that opens one at a time. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const id = useId()

  return (
    <section id="faq" className={styles.faq} data-page data-stage="Questions">
      <div className={styles.head}>
        <motion.p className="eyebrow mono" {...reveal}>Before you climb</motion.p>
        <motion.h2 {...reveal}>Questions at base camp.</motion.h2>
      </div>

      <ol className={styles.list}>
        {QUESTIONS.map(({ q, a }, i) => {
          const isOpen = open === i
          return (
            <motion.li key={q} className={cx(styles.item, isOpen && styles.open)} {...reveal}>
              <button
                type="button"
                className={styles.q}
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className={cx(styles.n, 'mono')}>Q{i + 1}</span>
                <span className={styles.text}>{q}</span>
                <span className={styles.sign} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${id}-${i}`}
                    className={styles.a}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: easeOut }}
                  >
                    <p>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          )
        })}
        <motion.li className={styles.more} {...reveal}>
          <span className="mono">Still unsure?</span>
          <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_RADIO))}>
            Radio Amit, our AI guide <span aria-hidden="true">→</span>
          </button>
        </motion.li>
      </ol>
    </section>
  )
}
