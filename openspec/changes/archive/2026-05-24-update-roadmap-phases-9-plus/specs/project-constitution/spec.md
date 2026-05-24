## ADDED Requirements

### Requirement: Roadmap post-Fase 8 con fases 9–13 pendientes

Tras marcar la **Fase 8** como completada, `specs/roadmap.md` MUST incluir, como mínimo, fases **pendientes** documentadas con: nombre, entregables, criterio de salida verificable, estado Pendiente y **nombre del cambio OpenSpec** propuesto para: **Fase 9** (`enhance-sdd-review-gate`), **Fase 9.5** (`enhance-performance-inp-ci`), **Fase 10** (`add-curated-destinations-paris-tokyo-nyc`), **Fase 11** (`add-travel-guide-home`), **Fase 12** (`add-destination-search`) y **Fase 13** (`retroadapt-legacy-scenario-ids`).

#### Scenario: PCO-14 — Backlog visible tras Fase 8

- **ID:** `PCO-14`
- **WHEN** se revisa `specs/roadmap.md` tras archivar `update-roadmap-phases-9-plus`
- **THEN** aparecen las fases 9, 9.5, 10, 11, 12 y 13 como pendientes (u opcional explícita para la 13), cada una con su cambio OpenSpec propuesto, numeración secuencial sin reutilizar el número 8, y ninguna fase futura carece de criterio de salida

#### Scenario: PCO-09 — Coherencia con fases pendientes anteriores

- **ID:** `PCO-09`
- **WHEN** se añade una nueva fase pendiente al roadmap post-Fase 6
- **THEN** la fase incluye el nombre del cambio OpenSpec previsto antes de implementar código en `src/` para esa entrega
