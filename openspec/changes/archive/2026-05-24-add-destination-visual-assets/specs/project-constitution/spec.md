## ADDED Requirements

### Requirement: Fase 8 completada en roadmap

El archivo `specs/roadmap.md` MUST documentar la **Fase 8 — Iconos y banderas con imágenes optimizadas** como completada al archivar el cambio `add-destination-visual-assets`, con referencia a la capability `destination-visuals` en `openspec/specs/`.

#### Scenario: PCO-13 — Fase 8 completada tras archivar visual assets

- **ID:** `PCO-13`
- **WHEN** se archiva el cambio `add-destination-visual-assets` y se revisa `specs/roadmap.md`
- **THEN** la Fase 8 aparece como completada con fecha, criterio de salida cumplido (LHCI + `pnpm test:verify`) y enlace al archive OpenSpec correspondiente
