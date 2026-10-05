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

## Docker

The Dockerfile, Nginx config and production/QA Compose files match Agent360's landing-page deployment files. The Dockerfile uses `node:20-alpine` on `linux/amd64`, runs `npm install` and `npm run build`, then serves `dist/` with `nginx` on container port **82**.

For a standalone preview, run these commands from the `Eigi-landing` directory:

```sh
docker build --platform linux/amd64 -t eigi-landing .
docker run --rm -p 3000:82 eigi-landing
```

Open http://localhost:3000. Nginx serves static assets, compresses text responses with gzip, and falls back to `index.html` for frontend routes, using Agent360's existing configuration.

### Merge into Agent360

Place the frontend files, including `Dockerfile`, `nginx.conf` and `.dockerignore`, under `agent-360/frontend/landing_page/`. Keep `docker-compose-lp.yml` and `docker-compose-lp-qa.yml` at the Agent360 repository root; the copies here match those existing root files.

```text
agent-360/
  docker-compose-lp.yml
  docker-compose-lp-qa.yml
  frontend/
    landing_page/
      Dockerfile
      nginx.conf
      .dockerignore
      package.json
      package-lock.json
      index.html
      stories/
        index.html
      src/
      public/
      ...
```

Run Compose from the Agent360 root after the frontend is in that location. Set `IMAGE_TAG` in the shell or the Agent360 root `.env` file first, for example `IMAGE_TAG=local`. Agent360's deployment workflows already supply this tag and the existing `VITE_APP_BASE_URL`, `VITE_APP_STUDIO_BASE_URL` and `VITE_GOOGLE_CLIENT_ID` variables.

```sh
# Production
docker compose -f docker-compose-lp.yml up --build -d

# QA
docker compose -f docker-compose-lp-qa.yml up --build -d
```

Both configurations use the `vaani-lp` service/container name, publish `3000:82`, mount `./frontend/landing_page:/app/src` and use `restart: on-failure`. Production tags `cliniq360/vaani-lp:${IMAGE_TAG}`; QA tags `cliniq360/vaani-lp-qa:${IMAGE_TAG}`. Run one environment per host because they share the container name and host port. Agent360's general `docker-compose.yml` starts its backend and is separate from the landing-page deployment.

For this frontend, analytics is the only current environment setting. To enable it, set `VITE_GA_ID=G-XXXXXXXXXX` in `frontend/landing_page/.env` before building; for a standalone build, use `.env` in this repository root. `.dockerignore` allows that file to follow Agent360's build-time environment workflow, while excluding local dependencies, build output, Git metadata and other local `.env.*` files. Vite embeds frontend settings during the build, so changing them requires rebuilding the image. The legacy runtime variables in Compose remain for compatibility with Agent360's workflows.

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
| 8 | Founders | `sections/FoundersSection/index.tsx` | Meets Aman and Mrunmay |
| | Header, footer | `Header/index.tsx`, `Footer/index.tsx` | Talks to Buddy |

Files in this table are relative to `src/pages/LandingPage/`.

### Success stories page (`/stories/`)

`stories/index.html` → `src/stories.tsx` → `src/pages/StoriesPage/index.tsx`. Real client and community stories only, in the landing page's design: each story in a window card beside a panel of the work the Eigi took over. The page shares the landing header and footer; its section and copy live under `src/pages/StoriesPage/`. Add a story only once the client has cleared it for publishing.

## Project structure

The layout follows Agent360's `frontend/landing_page` conventions: app entry files at the source root, pages under `pages/LandingPage` and `pages/StoriesPage`, with the landing header and footer shared between them, and shared components with an `index.tsx` entry. Each section keeps its CSS Module beside its component.

```text
src/
  App.tsx                            renders LandingPage
  App.test.tsx                       page order, anchors and links
  main.tsx                           landing entry and analytics setup
  stories.tsx                        Success stories entry and analytics setup
  StoriesPage.test.tsx                story content and cross-page navigation
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
        FoundersSection/             index.tsx + Founders.module.css
      content/                       page copy, examples and copy tests
        site.ts                      roles, colours, links and Buddy's WhatsApp URL
    StoriesPage/
      index.tsx                      shared header, stories and footer
      sections/
        StoriesSection/              index.tsx + Stories.module.css
      content/
        stories.ts                   approved client and community stories
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

To change wording, edit the matching file in `src/pages/LandingPage/content/` or `src/pages/StoriesPage/content/`; no component needs to change.

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
