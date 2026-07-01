# GFL5R Field Manual — Project Guidelines

## Project Overview

A single-page application field manual for the **GFL5R** tabletop roleplaying game — a cyberpunk tactical RPG set in the *Girls' Frontline* universe, built on *Legend of the Five Rings*' roll-and-keep dice engine.

**GFL5R** is a portmanteau of **G**irls **F**ront**L**ine (GFL) and **L**egend of the **5** **R**ings (L5R). The "L" in both names is combined to form GFL5R. Do not form a backronym from the name.

## Tech Stack

- **Vue 3** (Composition API, `<script setup>` throughout)
- **Vue Router 4** (hash-based history for static hosting — `createWebHashHistory()`)
- **Vite 5** build tooling
- **CSS3** — single global stylesheet (`src/assets/style.css`), no CSS-in-JS or Tailwind
- **Nginx** production container (alpine)
- **GitHub Actions** CI/CD → GHCR container

## Build and Run

```bash
npm install
npm run dev          # http://localhost:5173 (hot reload via Vite)
npm run build        # outputs static files to dist/
npm run preview      # preview built site locally
```

Container build:
```bash
podman build -t gfl5r -f Containerfile .
podman run -p 8080:80 gfl5r
```

**Never run any Python scripts locally.** The old `server.py` / `build.py` belong to the archived vanilla-JS version at `../webapp-old/`. They do not exist in this project.

## Architecture

### Directory Structure
```
src/
├── views/               # 38 page components (one per route)
│   └── techniques/      # TechniqueTypePage.vue (parameterized by :type)
├── components/
│   ├── cards/            # TechniqueCard, DisciplineCard, ConditionCard, FrameCard,
│   │                      HomeCard, ModuleCard, PeculiarityCard, SubstanceCard,
│   │                      VentCard, ZoneCard
│   ├── layout/           # TopBar, Sidebar, SidebarSection, Breadcrumb, ContentFrame,
│   │                      PageNav, ContentNavLink, HudBorder, LoadingOverlay,
│   │                      RankDivider, SectionDivider, StepIndicator
│   ├── callouts/         # RulesCallout, ExampleBox, QuestionBlock, TabCard
│   ├── data/             # StatBlock, DiceFaces, DiceSymbol, FilterBar,
│   │                      FormulaDisplay, OpText, PairVisual, TNGuide
│   ├── modals/           # WipModal, DisciplineModal
│   └── npc/              # NpcLayout
├── composables/          # useSearch.js (full-text corpus search)
├── data/                 # JSON game data + shared JS modules
├── router/               # Route definitions (38 routes, hash history)
└── assets/               # Global CSS (style.css), SVG dice icons
```

### Data Flow

- **Game data** lives in `src/data/` as static `.json` files
- **Two JS modules** export cross-referencing logic:
  - `src/data/disciplines.js` — canonical discipline definitions (title, flavor, skills, techniques, perk, capstone). Imported by `DisciplinesPage.vue` AND `useSearch.js`.
  - `src/data/technique-lookup.js` — builds a name→route map from `techniques.json` at module scope. Imported by components that render technique links.
- **All data is imported at build time** (Vite static imports). No runtime API calls, no dynamic `.djson` parsing.
- **Search** (`composables/useSearch.js`) builds an in-memory corpus from ALL data sources and rule page headings. Title matches are weighted 3×. Deduplicated by ID.

### Routing

- Hash-based history (`createWebHashHistory()`)
- All routes use **lazy loading** (`() => import(...)`)
- Technique type pages share one parameterized component: `/techniques/:type` → `TechniqueTypePage.vue`
- Scroll behavior: **no scroll on hash-only changes** (database item expand/collapse), scroll to top on path changes

### Styling Conventions

- **Single global stylesheet**: `src/assets/style.css` (~1800 lines). Component-specific styles use `<style scoped>`.
- **CSS custom properties** (in `:root`) control all theming — always use `var(--cyan)`, not `#FFE135`.
- **Typography**: Chakra Petch (display/headings), Inter (body), Share Tech Mono (monospace). All loaded via Google Fonts in `index.html`.
- **Palette**: near-black navy (`--bg: #060a12`), HUD cyan/yellow (`--cyan: #FFE135`), morpho blue/amber, glows.
- **Glassmorphism**: panels use `rgba()` with `backdrop-filter: blur(6px)`.
- **HUD aesthetic**: corner L-brackets via CSS `::before` pseudo-elements on `.content-frame`, `.card`, `.stat-item`, `.home-card`, `.skill-item`, `.disc-list-item`.
- **Ambient layers**: `.bg-grid` (animated grid), `.bg-scanlines`, `.bg-vignette`, butterfly particles (home page only).
- **Page transitions**: `.page-enter-active` / `.page-leave-active` (screen-in/out keyframes).
- **Typography rules**:
  - `h1` — underlined with cyan glow accent
  - `h2` — prefixed with `//` in dim-cyan monospace
  - `h3` — amber/gold, uppercase
  - `h4` — morpho/orange, uppercase
  - `.kicker` — tiny monospace cyan label above a heading
  - `.readout` — tiny monospace faint footnote

### Component Patterns

- **All components use `<script setup>`** with Composition API
- **Props are typed** via `defineProps({ prop: { type: X, required/ default } })`
- **State** uses `ref()` and `computed()` from Vue
- **Card components** use the `.card` CSS class with corner brackets auto-applied
- **Layout components**: `ContentFrame` wraps every page in the `.content-frame` shell. `Breadcrumb` sits at the top. `PageNav` provides prev/next navigation.
- **Database pages** (Passions, Advantages, Disadvantages, Anxieties, NPCs, Weapons, Armor, Items, Modules, Perks, Capstones) share a common pattern:
  - `db-toolbar` with search input + sort select
  - `FilterBar` component for type filtering
  - `db-count` showing filtered/total counts
  - `db-grid` with expandable `db-item` cards (click to toggle detail)
  - Copy-link button on each expanded item
- **Technique pages**: `TechniquesPage.vue` is the type index (tabs linking to type subpages). `TechniqueTypePage.vue` renders an individual type's techniques with `TechniqueCard` components.
- **Route params**: `TechniqueTypePage.vue` uses `useRoute()` and `computed` to select the correct data from `techniques.json` and metadata from `technique-types.js`.

### Data File Formats

**`techniques.json`** — object keyed by type slug (e.g., `"combat"`, `"social"`), each containing an array of technique objects:
```json
{ "id": "ap-round", "name": "AP Round", "rank": 0, "approach": "Power",
  "skill": "—", "flavor": "...", "activation": "", "opportunities": [],
  "type": "Combat" }
```
- Pseudo-entries with `"id": "activation"` follow some techniques and contain opportunity lists
- Techniques reference `approach` and `skill` by name string

**`disciplines.js`** — array of discipline objects:
```js
{ title: 'Ghost', flavor: '...', skills: ['Stealth', ...],
  techniques: [{ name: 'Phantom Step' }, ...],
  perk: { title: '...', text: '...' },
  capstone: { title: '...', text: '...' } }
```

**Equipment JSONs** (`weapons.json`, `armor.json`, `items.json`, `modules.json`, `perks.json`, `capstones.json`) — object keyed by item name, values are item properties. Weapons use `flavor` with HTML `<p>` tags.

**`passions.json`**, `advantages.json`, `disadvantages.json`, `anxieties.json` — arrays of objects with `id`, `name`, `types[]`, `flavor`, `effects[]`.

**`npcs.json`** — array of NPC objects with `approaches{}`, `skills{}`, `attacks[]`, `specialRules[]`, `behaviors`, `background`, computed on build by `scripts/parse-npcs.mjs`.

### Dice Symbol Shortcodes

The `OpText.vue` component converts parenthetical shortcodes into dice SVG icons:
- `(op)` → Opportunity
- `(su)` → Success
- `(st)` → Strife
- `(ex)` → Explosion
- `(op)+` → Opportunity with a plus sign

SVG assets live in `src/assets/images/` and are imported directly in `DiceSymbol.vue`.

## Writing Style Guidelines (for ALL GFL5R content)

These rules apply to every piece of prose written for this project — rule pages, flavor text, technique descriptions, NPC backgrounds, everything.

### Contrastive Writing
Do not contrast GFL5R with L5R. The writing should stand alone without needing to reference L5R. The only thing you should contrast with is previous writing in the same page, never requiring external knowledge to parse the writing.
- **Not good**: "Unlike the feudal society of Rokugan in L5R, the world of GFL5R is a sci-fi post apocalyptic Earth with mail service."
- **Better**: "The world of GFL5R is a sci-fi post apocalyptic Earth with mail service."

### Roboticisms of T-Dolls
T-dolls are combat androids, but relying too heavily on this fact (describing them as glitching, clipping, or malfunctioning when stressed) results in poor writing. T-Dolls are characters first and foremost, and have similar stress responses to humans. Quirky, sure, but still emotionally relatable.
- **Not good**: "When stressed, CM901's voice becomes static and choppy, with erratic motions."
- **Better**: "When stressed, CM901 becomes reclusive and withdrawn, avoiding contact with others and retreating to quiet spaces to be alone with her thoughts."

### The Em Dash
Do not use the em dash (—) in GFL5R writing. Use a comma, semicolon, period, or parentheses instead.
- **Not good**: "In the world of GFL5R, T-dolls are combat androids—artificial beings designed for warfare—but they have complex personalities and emotions."
- **Better**: "In the world of GFL5R, T-dolls are combat androids (artificial beings designed for warfare) but more importantly, they have complex personalities and emotions that make them more than just machines."

### Ditch the Preamble
Avoid "not x, but y" or "not only x, but also y" constructions. Just say "y."
- **Not good**: "GFL5R is not just a rules reference, but also a lore compendium."
- **Better**: "GFL5R is a rules reference and lore compendium."

### The Rule of Three
Avoid "adjective, adjective, adjective" or "short phrase, short phrase, and short phrase" patterns. Try to find a single comprehensive adjective or phrase.
- **Not good**: "GFL5R is a complete, intricate, and multifaceted system."
- **Better**: "GFL5R is a complex system."

### Bolding
Only bold: (a) key terms being introduced for the first time, (b) section headers, or (c) callouts requiring player action (e.g., **TN 4 check**, **spend 1 fortune point**). Avoid bolding otherwise to preserve signal.
- **Not good**: "Make a **TN 4 check** to see if you can **avoid the trap** and **escape unscathed**."
- **Better**: "Make a **TN 4 check** to see if you can avoid the trap and escape unscathed."

### Emoji
Do not use emoji in GFL5R writing. Convey emotion through word choice and sentence structure.
- **Not good**: "🚀 GFL5R is a fun and exciting game!"
- **Better**: "GFL5R is a fun and exciting game."

### Direction
Every word must further a concept, from flavortext to mechanical descriptions. Avoid filler. In flavortext, this can be looser — a character can ask a question that gets answered — but stay on topic. If the entry is about cinnamon rolls, don't start talking about hot dogs.

### Hedging
When writing a hard rule, state it directly. Don't soften with "perhaps," "it's worth noting," "arguably," "could potentially," or "it's important to remember." The distinction: if game mechanics require it, be definitive. If the player is choosing between options with uncertain outcomes, reflect that uncertainty honestly.
- **Not good** (rule): "It's worth noting that getting shot without armor could potentially result in HP loss."
- **Better** (rule): "Getting shot without armor results in HP loss."
- **Not good** (choice): "Extra armor will save your life."
- **Better** (choice): "Extra armor could save your life in a firefight."

## Mechanical Consistency

### Existing Rules
When creating a technique that requires a specific approach or skill, search the existing rule pages first:
- **Approaches**: Check the text content of `src/views/ApproachesPage.vue`
- **Skills**: Check the text content of `src/views/SkillsPage.vue`
Ensure the proper approach or skill is used, and that the technique's description is consistent with how that approach or skill is used in the rules. Never assume that something does or does not exist; search first.

### The Wiki
The wiki/ folder is in the old archived project at `../webapp-old/`. It contains key story beats from GFL, and INDEX.md contains a guide on where to find specific information. Like mechanics, don't assume lore — search for it. If you can't find it, ask the user.

## Adding New Content

### Adding a new rule page
1. Create the Vue component in `src/views/` (use existing pages as templates)
2. Add the route in `src/router/index.js`
3. Add the sidebar link in `src/components/layout/Sidebar.vue`
4. Add search indexing in `src/composables/useSearch.js` (rulePages array)
5. Add `PageNav` prev/next links if appropriate

### Adding a new technique
1. Add the technique entry to the appropriate type array in `src/data/techniques.json`
2. If adding a new technique type:
   - Add the key and array to `techniques.json`
   - Add metadata to `src/data/technique-types.js`
   - Add the route in `src/router/index.js` (or it may already be covered by the parameterized route)
   - Update the sidebar's compendium section
   - Update `src/composables/useSearch.js` technique route map

### Adding a new data type (equipment, etc.)
1. Create the JSON file in `src/data/`
2. Create a view component in `src/views/` (follow database page pattern)
3. Add the route
4. Add to sidebar
5. Add search indexing in the corpus builder

### Adding a new discipline
Add to the `disciplines` array in `src/data/disciplines.js`. Follow the existing structure exactly.

## Pitfalls

- **Vite path alias**: Use `@/` to reference `src/` in imports (configured in `vite.config.js`)
- **Hash routing**: All internal links must use `<router-link to="/path">` or `router.push()`. Raw `<a href="/path">` will 404.
- **@click.stop**: Use `.stop` on click handlers inside expandable database items to prevent toggle when clicking copy-link buttons.
- **Technique activation entries**: In `techniques.json`, entries with `"id": "activation"` are pseudo-entries. They must be skipped when indexing or rendering as standalone cards. They have `"name": "Activation:"`.
- **Duplicate technique names** in disciplines.js silently overwrite when mapped.
- **Scoped styles vs global**: `style.css` provides the design system. Component `<style scoped>` should only add layout tweaks specific to that component. Never redefine design tokens.
- **Build output**: `npm run build` outputs to `dist/`. The container serves `dist/` via nginx.
- **nginx SPA fallback**: `try_files $uri $uri/ /index.html` handles client-side routing.
