## ADDED Requirements

### Requirement: Fase 10 completada en roadmap

El archivo `specs/roadmap.md` MUST documentar la **Fase 10 — Destinos curados París, Tokio, Nueva York** como completada al archivar el cambio `add-curated-destinations-paris-tokyo-nyc`, con referencia a los siete destinos curados y trazabilidad SDD.

#### Scenario: PCO-17 — Fase 10 completada tras archivar destinos

- **ID:** `PCO-17`
- **WHEN** se archiva el cambio `add-curated-destinations-paris-tokyo-nyc` y se revisa `specs/roadmap.md`
- **THEN** la Fase 10 aparece como completada con criterio de salida cumplido (`pnpm test:verify`, LHCI sin regresión) y enlace al archive OpenSpec correspondiente
