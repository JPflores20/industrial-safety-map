# Mapa Interactivo de Seguridad Industrial

A single-page app showing a schematic plant map. Clicking a zone updates a side panel with the area's responsible person, autonomous team, and identified safety risks.

## Scope

- One screen, no routing changes beyond the home route.
- Pure frontend, mock data hardcoded in the component (no backend).
- Dark industrial visual theme with safety-coded accents (yellow / orange / red).

## Files

- `src/styles.css` — extend `:root`/`.dark` with industrial tokens (deep slate background, lighter slate surfaces, safety accent colors). Force the app into dark mode by default on this route.
- `src/components/security-map/PlantMap.tsx` — left column. Renders the schematic plan using positioned divs (CSS grid of zones) styled as industrial blocks. Each zone is a button with hover (scale + glowing border) and selected state (accent border + inner glow). Includes a legend.
- `src/components/security-map/DetailsPanel.tsx` — right column. Empty state (centered `Map` icon + prompt) vs. active state (title, responsible w/ `User` icon, team w/ `Users` icon, risks list as colored badges with `ShieldAlert`/`Flame` accents).
- `src/components/security-map/data.ts` — the mock `areas` array exactly as provided, typed with an `Area` interface.
- `src/routes/index.tsx` — replace placeholder. Header with title + subtle settings icon, then a two-column layout (70/30 on `lg+`, stacked on mobile). Holds `selectedId` state with `useState<string | null>`. Update route `head()` title/description.

## Layout & interaction

- Header: thin top bar, title "Mapa Interactivo de Seguridad" with a `ShieldAlert` icon on the left, muted subtitle, `Settings` icon button on the right.
- Main: `grid lg:grid-cols-[7fr_3fr] gap-6` inside a max-width container, full viewport height.
- Map column: card with subtle grid-pattern background simulating a floor plan. Four zone blocks positioned to suggest plant layout:
  - Top-left: Subestación Eléctrica 1
  - Top-right: Mezanine - Cocedor/Macerador
  - Bottom-left: Cuarto de Bombas
  - Bottom-right: Planta Baja C 1 y 2
  Each block shows zone name + small risk count badge; hover lifts + glows; selected shows an accent ring.
- Panel column: sticky card, scrollable risks list.

## Design tokens (added to styles.css)

Semantic tokens only (no hardcoded hex in components):
- `--safety-warning` ≈ #FACC15
- `--safety-alert` ≈ #F97316
- `--safety-danger` ≈ #EF4444
- `--surface-plant` (slate-900-ish) and `--surface-zone` (slate-700-ish) for the map background and zone fills
- Mapped under `@theme inline` so utilities like `bg-safety-warning`, `border-safety-danger`, `text-safety-alert` work.

Risk badges pick a color by simple keyword match (eléctrico/incendio/arco → danger red; caída/atrapamiento/montacargas/confinado → alert orange; everything else → warning yellow) — purely cosmetic, all via semantic tokens.

## Technical notes

- Icons: `User`, `Users`, `ShieldAlert`, `Flame`, `Map`, `Settings`, `Zap`, `Factory` from `lucide-react`.
- State lives in `index.tsx`; child components are controlled (`selectedId`, `onSelect`).
- Dark theme: add `dark` class on the root container of the page so tokens resolve to the dark palette without touching global app theming.
- All colors via Tailwind semantic classes — no inline hex in JSX.
- Accessibility: zones are `<button>` with `aria-pressed`, panel uses a live region so screen readers announce updates.

## Out of scope

- No persistence, no editing of areas, no real SVG floor plan import, no auth, no backend.
