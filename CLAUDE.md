# CLAUDE.md

Personal portfolio site (kennethchua.com) — single-page Vue 3 app, no router, no global store.

## Commands

- `npm run dev` — Vite dev server on **port 8080** (not 3000)
- `npx vitest run` — run tests once (`npm test` is watch mode and won't exit)
- `npm run lint` — ESLint, auto-fixes (`--fix` is built into the script)
- `npm run format` — Prettier over src/
- `npm run build` — production build to dist/ (dist/ is gitignored; CI builds it inside Docker)

## Architecture

- `App.vue` composes the section components directly: Header → Hero → About → Skills → Projects → Contact → Footer, plus `BackToTop` and `CustomCursor`.
- **All copy/content lives in `src/data/*.js` — never hardcode text in templates.** To change content, edit the data file, not the component.
  - `personal.js` is the source of truth for identity and exports `yearsOfExperience` (computed from a 2021 start year); `hero.js` and `footer.js` import from it; `footer.js` shares its `contactInfo` object with `contact.js`.
  - Adding a project = new entry in `src/data/projects.js` + screenshot in `public/project_screenshot/`.
- Scroll-reveal animations use `src/composables/useScrollTrigger.js` (IntersectionObserver, fires once). Smooth scrolling helpers live in `src/utils/scroll.js`. Reuse these instead of hand-rolling observers/scroll code.

## Design system

`designs/DESIGN.md` is binding ("High-End Editorial / The Digital Archivist"): warm archival palette, Noto Serif headings + Inter body. It **prohibits** 1px borders, pure-black text, Material-style shadows, and black-and-white image filters. Tailwind tokens in `tailwind.config.js` implement the palette — use the tokens (`surface`, `on-surface`, `primary`, etc.), not raw hex.

## Gotchas

- **Subgrid coupling:** the projects grid uses CSS subgrid — `grid-row: span 7` appears in both `ProjectsSection.vue` (`.project-wrapper`) and `ProjectCard.vue` (`.card-grid`). Adding/removing a card row means updating the span in BOTH files.
- The Web3Forms key in `contact.js` is intentionally client-side (such keys are public by design) — don't move it to env vars.
- The hero photo is landscape (784×672); keep its container at `aspect-[7/6]` — forcing a portrait crop zooms hard into the face.
- `CustomCursor.vue` hides the native cursor via the `has-custom-cursor` class on `<html>` (mouse devices only); text inputs keep the native I-beam.

## Deploy

GitHub Actions (`.github/workflows/cicd.yml`): every push runs lint + tests + build; pushes to `master` build the Docker image (bundle compiled inside the image) and deploy to Cloud Run `asia-southeast1`, port 8080.

## Deferred upgrades

ESLint 10 (flat config), Tailwind 4, and Vite 8 majors are intentionally deferred — don't bump them casually.
