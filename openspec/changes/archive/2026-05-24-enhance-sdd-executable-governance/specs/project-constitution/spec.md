## ADDED Requirements

### Requirement: Fase intermedia de gobernanza SDD ejecutable en el roadmap

El archivo `specs/roadmap.md` MUST documentar la **Fase 7.5 — SDD Executable Governance** (o nombre equivalente acordado) entre la Fase 7 completada y la Fase 8 pendiente, con entregables (LHCI, `openspec validate` en pre-commit, `pnpm spec:traceability`), criterio de salida verificable en CI, cambio OpenSpec `enhance-sdd-executable-governance` y estado actualizable al archivar.

#### Scenario: PCO-11 — Fase 7.5 documentada antes de Fase 8

- **ID:** `PCO-11`
- **WHEN** se revisa `specs/roadmap.md` tras archivar `enhance-sdd-executable-governance`
- **THEN** la Fase 7.5 aparece como completada, la Fase 8 sigue pendiente con cambio `add-destination-visual-assets`, y la Fase 7.5 referencia las brechas del canvas cerradas (LHCI, validate, trazabilidad ejecutable)

#### Scenario: PCO-12 — Criterio de salida de Fase 7.5

- **ID:** `PCO-12`
- **WHEN** se evalúa si la Fase 7.5 está completa
- **THEN** el criterio incluye job LHCI en verde en CI, hook pre-commit con validate condicional documentado, y `pnpm spec:traceability` integrado en `test:verify:push`/CI cuando hay cambio activo
