## ADDED Requirements

### Requirement: Script de verificación del review gate

El repositorio MUST incluir `scripts/verify-review-gate.mjs` y el script `"spec:review-gate"` en `package.json` que valide, para el cambio OpenSpec activo en `openspec/changes/`, que `reviewStatus` es `approved` y que no queden items `- [ ]` en `## Review checklist` de `design.md` cuando este archivo existe.

#### Scenario: TH-11 — spec:review-gate pasa con design aprobado

- **ID:** `TH-11`
- **WHEN** el cambio activo tiene `design.md`, `reviewStatus: approved` y checklist completamente marcada
- **THEN** `pnpm spec:review-gate` termina con código `0`

#### Scenario: TH-12 — spec:review-gate falla si pending-review

- **ID:** `TH-12`
- **WHEN** el cambio activo tiene `design.md` y `reviewStatus: pending-review` (o checklist con `- [ ]`)
- **THEN** `pnpm spec:review-gate` termina con código distinto de `0` e indica el motivo en stderr
