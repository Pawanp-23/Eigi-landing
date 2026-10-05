# Eigi landing

The marketing site for [eigi.ai](https://eigi.ai): Rashmin's story in our Summit design, where every section is something a founder can play with.

Built with React 19, Vite 8, TypeScript and CSS Modules. No animation library; motion is plain CSS.

## Run it

Use Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev        # http://localhost:5173
```

Before you push:

```sh
npm run lint && npm test && npm run build
```

`npm run build` writes a static site to `dist/`.

## The page

| # | Section | File | What the visitor does |
|---|---|---|---|
| 1 | Hero | `sections/HandOver.tsx` | Types or picks a job, watches the Eigi work through Ask, Computer, Memory, Approval, then approves or edits it |
| 2 | Why Eigi | `sections/Why.tsx` (`Why`) | Taps the founder's five questions; each flips to how Eigi takes it |
| 3 | The trap | `sections/Why.tsx` (`Trap`) | Slides customers 10 to 40 and compares hiring with Eigis (1 Eigi per 10 customers) |
| 4 | Eigi computer | `sections/EigiComputer.tsx` | Watches an Eigi drive 8 apps; taps one to take over |
| 5 | Your plate | `sections/Plate.tsx` | Drags 12 first jobs to the right Eigi (or taps a job, then an Eigi) |
| 6 | Gateway | `sections/Gateway.tsx` | Switches on You, Sherpas, Eigis to open the portal |
| 7 | Sherpas | `sections/Climb.tsx` | Drags Sherpie up the four camps |
| 8 | Field notes | `sections/NextChapter.tsx` (`Notes`) | Reads two real stories; plays how a chat with Amit starts |
| 9 | Founders | `sections/NextChapter.tsx` (`Founders`) | Meets Aman and Mrunmay |
| | Footer | `sections/NextChapter.tsx` (`Footer`) | Talks to Amit |

## Where things live

```
src/
  content.ts          every word on the page, plus the small rules (job routing, 1 Eigi per 10 customers)
  App.tsx             the order of sections
  sections/           one file per section, each with its own CSS Module
  components/         Nav and Sherpie (the mascot)
  lib/analytics.ts    Google Analytics events
  lib/useLookAt.ts    Sherpie's eyes follow the pointer
  styles/global.css   colour, type and button tokens
```

To change wording, edit `src/content.ts`; no component needs to change.

## Analytics

Google Analytics 4 is built in and **off by default**. To switch it on, set `VITE_GA_ID` (see `.env.example`) locally or in the host's environment settings, then rebuild.

| Event | When |
|---|---|
| `talk_to_amit` | Any WhatsApp link to Amit is clicked; sends which section it came from. Mark it as a key event in GA. |
| `hand_over_job`, `approve_draft` | The hero demo is used and finished |
| `why_question`, `trap_slider`, `computer_app` | Which pains, growth levels and apps visitors explore |
| `plate_cleared`, `gateway_opened`, `climb_summit` | A visitor completes a section |

Nothing a visitor types is sent.

## House rules

- No em dashes in copy; a test enforces it.
- Every demo is labelled illustrative. Nothing pretends to be a live agent.
- Respect reduced motion; nothing scrolls sideways.

## History

Earlier designs are kept as tags: `archive/ascent`, `archive/eigi-computer`, `archive/sherpie`, `archive/summit`.
