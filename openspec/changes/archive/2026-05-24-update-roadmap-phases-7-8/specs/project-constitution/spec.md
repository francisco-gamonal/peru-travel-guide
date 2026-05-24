## ADDED Requirements

### Requirement: Fases pendientes documentadas en el roadmap

El archivo `specs/roadmap.md` MUST incluir, para cada fase futura no completada, al menos: nombre de fase, entregables, criterio de salida verificable, estado (p. ej. Pendiente) y **nombre propuesto del cambio OpenSpec** que implementará esa fase.

#### Scenario: PCO-09 — Fase pendiente con cambio OpenSpec propuesto

- **ID:** `PCO-09`
- **WHEN** se revisa una fase marcada como pendiente en `specs/roadmap.md` creada o actualizada tras la Fase 6
- **THEN** la fase indica el cambio OpenSpec previsto (p. ej. `add-destination-england`) antes de que exista código en `src/` para esa entrega

#### Scenario: PCO-10 — Actualización del roadmap vía cambio OpenSpec

- **ID:** `PCO-10`
- **WHEN** se añaden o modifican fases del roadmap en la constitución del producto
- **THEN** el cambio se realiza mediante un cambio OpenSpec archivado (no edición directa fuera del flujo), salvo correcciones menores acordadas explícitamente por el usuario
