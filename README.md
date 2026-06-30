# GFL5R Field Manual

A single-page application field manual for the GFL5R tabletop roleplaying game — a cyberpunk tactical RPG set in the *Girls' Frontline* universe, built on *Legend of the Five Rings*' roll-and-keep dice engine.

## Tech

- **Vue 3** (Composition API, `<script setup>`) 
- **Vue Router 4** (hash-based history for static hosting)
- **Vite 5** build tooling
- **Nginx** production container

## Development

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the built site
```

Or build the container:

```bash
podman build -t gfl5r -f Containerfile .
podman run -p 8080:80 gfl5r
```

## Deployment

GitHub Actions builds and pushes a container to GHCR on every push to `main` that touches source files. See `.github/workflows/publish.yml`.

## Structure

```
src/
├── views/          # 38 page components (one per route)
├── components/     # Reusable UI (cards, layout, modals, data display)
│   ├── cards/      # TechniqueCard, DisciplineCard, ConditionCard, etc.
│   ├── layout/     # TopBar, Sidebar, Breadcrumb, PageNav, ContentFrame
│   ├── callouts/   # RulesCallout, ExampleBox, QuestionBlock, TabCard
│   ├── data/       # StatBlock, DiceFaces, FilterBar, OpText, DiceSymbol
│   └── modals/     # WipModal, DisciplineModal
├── data/           # JSON game data + shared modules
├── composables/    # useSearch (full-text corpus search)
├── router/         # Route definitions (hash history)
└── assets/         # Global CSS, SVG icons
```

## Prior version

The original vanilla-JS version is archived at `../webapp-old/`.
