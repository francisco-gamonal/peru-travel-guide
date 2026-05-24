## Why

Tras completar la Fase 6 (SDD Governance), el producto necesita planificar explícitamente los próximos entregables en `specs/roadmap.md` sin editar la constitución fuera del flujo OpenSpec. Se requieren dos iniciativas acordadas: incorporar **Inglaterra (Londres)** como destino curado y mejorar la presentación con **iconos y banderas optimizadas**. Documentarlas como Fases 7 y 8 garantiza trazabilidad y que su implementación futura use las convenciones SDD (Scenario IDs, review gate, etc.).

## What Changes

- Actualizar `specs/roadmap.md`: nota transversal post-Fase 6; **Fase 7** (destino Inglaterra/Londres, pendiente); **Fase 8** (iconos y banderas con optimización de imágenes, pendiente).
- Añadir `breaking: false` en `.openspec.yaml` del cambio.
- Delta en `project-constitution`: requisito de que las fases pendientes del roadmap incluyan nombre propuesto del cambio OpenSpec.

## Capabilities

### New Capabilities

_(ninguna — solo planificación en constitución)_

### Modified Capabilities

- `project-constitution`: el roadmap MUST documentar fases futuras pendientes con cambio OpenSpec propuesto antes de implementar código.

## Impact

- Solo `specs/roadmap.md` y delta de `project-constitution` (sincronizado al archivar).
- Sin cambios en `src/`; no requiere `pnpm test:verify` para este cambio (solo validación de documentos y `openspec validate`).
- Los cambios de implementación reales serán `add-destination-england` (Fase 7) y `add-destination-visual-assets` (Fase 8), en cambios OpenSpec separados.
