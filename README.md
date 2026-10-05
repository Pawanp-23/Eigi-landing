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
| 1 | Hero | `sections/HeroSection/index.tsx` | Types or picks a job, watches the Eigi work through Ask, Computer, Memory, Approval, then approves or edits it |
| 2 | Why Eigi | `sections/WhySection/index.tsx` | Taps the founder's five questions; each flips to how Eigi takes it |
| 3 | The trap | `sections/TrapSection/index.tsx` | Slides customers 10 to 40 and compares hiring with Eigis (1 Eigi per 10 customers) |
| 4 | Eigi computer | `sections/ComputerSection/index.tsx` | Watches an Eigi drive 8 apps; taps one to take over |
| 5 | Your plate | `sections/PlateSection/index.tsx` | Drags 12 first jobs to the right Eigi (or taps a job, then an Eigi) |
| 6 | Gateway | `sections/GatewaySection/index.tsx` | Switches on You, Sherpas, Eigis to open the portal |
| 7 | Sherpas | `sections/ClimbSection/index.tsx` | Drags Sherpie up the four camps |
| 8 | Field notes | `sections/NotesSection/index.tsx` | Reads two real stories; plays how a chat with Amit starts |
| 9 | Founders | `sections/FoundersSection/index.tsx` | Meets Aman and Mrunmay |
| | Header, footer | `Header/index.tsx`, `Footer/index.tsx` | Talks to Amit |

Files in this table are relative to `src/pages/LandingPage/`.

## Project structure

The layout follows Agent360's `frontend/landing_page` conventions: app entry files at the source root, page-owned header, footer and sections under `pages/LandingPage`, and shared components with an `index.tsx` entry. Each section keeps its CSS Module beside its component.

```text
src/
  App.tsx                            renders LandingPage
  App.test.tsx                       page order, anchors and links
  main.tsx                           React entry and analytics setup
  index.css                          base styles, buttons, shared classes
  pages/
    LandingPage/
      index.tsx                      header, section order and footer
      Header/
        index.tsx
        Header.module.css
      Footer/
        index.tsx
        Footer.module.css
      sections/
        HeroSection/                 index.tsx + Hero.module.css
        WhySection/                  index.tsx + Why.module.css
        TrapSection/                 index.tsx + Trap.module.css
        ComputerSection/             index.tsx + Computer.module.css
        PlateSection/                index.tsx + Plate.module.css
        GatewaySection/              index.tsx + Gateway.module.css
        ClimbSection/                index.tsx + Climb.module.css
        NotesSection/                index.tsx + Notes.module.css
        FoundersSection/             index.tsx + Founders.module.css
      content/                       page copy, examples and copy tests
        site.ts                      roles, colours, links and Amit's WhatsApp URL
  components/
    common/
      Sherpie/                       index.tsx + Sherpie.module.css
  hooks/
    useLookAt.ts                     Sherpie's eyes follow the pointer
  utils/
    analytics.ts                     Google Analytics events
    motion.ts                        reduced-motion check
    route.ts                         mountain rope geometry
    route.test.ts                    mountain geometry tests
  assets/
    Images/                          logos and founder portraits
  theme/
    tokens.css                       colours, type and spacing
```

To change wording, edit the matching file in `src/pages/LandingPage/content/`; no component needs to change.

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
