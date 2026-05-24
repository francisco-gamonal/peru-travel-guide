## Why

Tras completar las Fases 0–8 del roadmap (incluida `destination-visuals`), `specs/roadmap.md` no documenta ninguna fase futura. Eso incumple **PCO-09** (cada fase pendiente debe tener cambio OpenSpec propuesto) y deja sin planificar las brechas residuales del análisis SDD del canvas (review gate automatizado, INP en CI, retroadaptación de escenarios legacy) y los gaps de producto frente a `specs/mission.md` (home con propósito, más destinos, entrada libre de ciudad). Este cambio solo **planifica** el siguiente ciclo; la implementación sigue en cambios OpenSpec dedicados.

## What Changes

- Actualizar `specs/roadmap.md` con fases **pendientes** documentadas (numeración secuencial tras Fase 8 ✅, siguiendo el patrón 7 / 7.5):
  - **Fase 9 — SDD Executable Governance (review gate)** — Review gate en skills (`enhance-sdd-review-gate`); cierra recomendación canvas #3.
  - **Fase 9.5 — SDD Performance (INP en CI)** — INP en CI cuando LHCI headless sea fiable (`enhance-performance-inp-ci`); complemento de `performance-budget`.
  - **Fase 10 — Más destinos curados** — París, Tokio, Nueva York (`add-curated-destinations-paris-tokyo-nyc`).
  - **Fase 11 — Landing / home de guía** — Página `/` con propósito (`add-travel-guide-home`).
  - **Fase 12 — Entrada libre de ciudad** — Búsqueda/input (`add-destination-search`); gap vs `mission.md`.
  - **Fase 13 — SDD Retroadaptación legacy** — Scenario IDs en escenarios legacy de `openspec/specs/` (`retroadapt-legacy-scenario-ids`); al final del ciclo, deuda técnica opcional.
- Añadir nota transversal post-Fase 8: orden sugerido **9 → 9.5 → 10–12 → 13**.
- Delta en `project-constitution`: requisito de que el roadmap documente fases 9–13 pendientes tras Fase 8.
- Añadir `breaking: false` en `.openspec.yaml`.

## Capabilities

### New Capabilities

_(ninguna — solo planificación en constitución y roadmap)_

### Modified Capabilities

- `project-constitution`: el roadmap MUST incluir, tras Fase 8 completada, las fases 9, 9.5, 10, 11, 12 y 13 pendientes con cambio OpenSpec propuesto cada una; la Fase 13 (retroadaptación legacy) MUST documentarse como pendiente u opcional explícita.

## Impact

- Solo `specs/roadmap.md` y delta de `project-constitution` (sincronizado al archivar).
- Sin cambios en `src/`; no requiere `pnpm test:verify` para este cambio.
- Los cambios de implementación reales serán seis OpenSpec separados (ver lista arriba).
- Referencia cruzada al canvas SDD (mayo 2026): prioridades 3, 4 y brecha de trazabilidad legacy.
