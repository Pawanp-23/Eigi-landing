import { parseRich } from '../../lib/rich.ts'

/** Renders **bold** and @mentions from content strings. `mentionClass` styles the mention chip. */
export function RichText({ text, mentionClass }: { text: string; mentionClass?: string }) {
  return (
    <>
      {parseRich(text).map((run, i) =>
        run.kind === 'bold' ? <b key={i}>{run.text}</b>
          : run.kind === 'mention' ? <span key={i} className={mentionClass}>{run.text}</span>
            : <span key={i}>{run.text}</span>,
      )}
    </>
  )
}
