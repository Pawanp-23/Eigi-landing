# Eigi landing

The marketing site for [eigi.ai](https://eigi.ai): Rashmin's story in our Summit design, where every section is something a founder can play with.

Built with React 19, Vite 8, TypeScript and CSS Modules. No animation library; motion is plain CSS.

## Run it

Use Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev        # http://localhost:5173
```

Before you push, run every check (GitHub runs the same ones on each push and pull request):

```sh
npm run check      # lint, tests, production build
```

`npm run build` writes a static site to `dist/`.

## The page

| # | Section | File | What the visitor does |
|---|---|---|---|
| 1 | Hero | `sections/Hero.tsx` | Types or picks a job, watches the Eigi work through Ask, Computer, Memory, Approval, then approves or edits it |
| 2 | Why Eigi | `sections/Why.tsx` | Taps the founder's five questions; each flips to how Eigi takes it |
| 3 | The trap | `sections/Trap.tsx` | Slides customers 10 to 40 and compares hiring with Eigis (1 Eigi per 10 customers) |
| 4 | Eigi computer | `sections/Computer.tsx` | Watches an Eigi drive 8 apps; taps one to take over |
| 5 | Your plate | `sections/Plate.tsx` | Drags 12 first jobs to the right Eigi (or taps a job, then an Eigi) |
| 6 | Gateway | `sections/Gateway.tsx` | Switches on You, Sherpas, Eigis to open the portal |
| 7 | Sherpas | `sections/Climb.tsx` | Drags Sherpie up the four camps |
| 8 | Founders | `sections/Founders.tsx` | Meets Aman and Mrunmay |
| | Nav, footer | `components/layout/` | Talks to Buddy |

### Success stories page (`/stories/`)

`stories/index.html` → `app/StoriesPage.tsx` → `sections/Stories.tsx`. Real client and community stories only, in the landing page's design: each story in a window card beside a panel of the work the Eigi took over. Content lives in `content/stories.ts`; add a story only once the client has cleared it for publishing.

## Project structure

```
src/
  app/                 App.tsx + main.tsx (landing), StoriesPage.tsx + stories.tsx (/stories/), tests
  sections/            one file per section, each with its own CSS Module
  components/
    brand/             Sherpie, the mascot
    layout/            Nav and Footer
  content/             every word on the page, one file per section
    site.ts            roles and colours, outside links, the WhatsApp link to Buddy
    content.test.ts    copy rules, job routing, the Eigi ratio
  lib/
    analytics.ts       Google Analytics events
    route.ts           the rope up the mountain (tested in route.test.ts)
    motion.ts          the reduced-motion check
    useLookAt.ts       Sherpie's eyes follow the pointer
  assets/
    brand/             logo and Eigi mark
    founders/          founder portraits
  styles/
    tokens.css         colours, type, spacing
    global.css         base styles, buttons, shared classes
```

To change wording, edit the matching file in `src/content/`; no component needs to change.

## Analytics

Google Analytics 4 is built in and **off by default**. To switch it on, set `VITE_GA_ID` (see `.env.example`) locally or in the host's environment settings, then rebuild.

| Event | When |
|---|---|
| `talk_to_buddy` | Any WhatsApp link to Buddy is clicked; sends which section it came from. Mark it as a key event in GA. |
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
