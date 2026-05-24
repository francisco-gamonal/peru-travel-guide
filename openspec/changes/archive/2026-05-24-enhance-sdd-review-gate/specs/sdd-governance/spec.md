## ADDED Requirements

### Requirement: Estado pending-review en cambios OpenSpec activos

Todo cambio OpenSpec activo con `design.md` MUST declarar en `.openspec.yaml` el campo `reviewStatus` con valor `pending-review` o `approved`. Tras crear o actualizar `design.md`, el valor MUST ser `pending-review` hasta confirmación explícita del autor para implementar.

#### Scenario: SG-20 — reviewStatus pending tras design

- **ID:** `SG-20`
- **WHEN** un agente completa `design.md` para un cambio activo y el skill de continue ejecuta el flujo post-Fase 9
- **THEN** `.openspec.yaml` del cambio incluye `reviewStatus: pending-review` y el agente se detiene solicitando revisión humana antes de crear `tasks.md`

#### Scenario: SG-21 — Aprobación explícita antes de tasks

- **ID:** `SG-21`
- **WHEN** el autor confirma explícitamente que el design está aprobado y la checklist en `design.md` está marcada (`- [x]`)
- **THEN** `reviewStatus` se actualiza a `approved` y el flujo puede continuar con `tasks.md` o `/opsx:apply`

### Requirement: Gate de review en apply

El skill o comando **`openspec-apply-change`** (y equivalente `opsx:apply`) MUST verificar el review gate antes de implementar tasks: ejecutar `pnpm spec:review-gate` o lógica equivalente, y MUST detenerse si `reviewStatus !== approved` o la checklist contiene items sin marcar.

#### Scenario: SG-22 — Apply bloqueado sin aprobación

- **ID:** `SG-22`
- **WHEN** se invoca `/opsx:apply` sobre un cambio con `design.md`, `reviewStatus: pending-review` y checklist sin completar
- **THEN** el agente no modifica código ni marca tasks como hechas hasta recibir confirmación explícita y aprobación registrada
