## Why

La **Fase 9** del roadmap cierra la recomendación canvas SDD #3: el review gate existe en texto (`specs/sdd-conventions.md`, escenarios **SG-11** / **SG-12**) pero el agente puede pasar de `design.md` a `tasks.md` y `/opsx:apply` sin un estado explícito de revisión humana. Tras Fase 7.5 (LHCI, validate, trazabilidad ejecutable), formalizar **`pending-review`** en skills y un check reproducible reduce retrabajo en features de producto (Fases 10–12).

## What Changes

- Campo opcional `reviewStatus: pending-review | approved` en `.openspec.yaml` de cambios activos (default `pending-review` cuando existe `design.md` sin aprobación).
- Script **`pnpm spec:review-gate`** (`scripts/verify-review-gate.mjs`) que falla si hay cambio activo con `design.md` y `reviewStatus !== approved` o checklist sin marcar.
- Actualizar skills y comandos OpenSpec: **`openspec-continue-change`** / **`opsx:continue`** — tras crear `design.md`, fijar `pending-review` y detenerse hasta aprobación; no crear `tasks.md` si sigue pendiente. **`openspec-apply-change`** / **`opsx:apply`** — invocar review gate antes de implementar.
- Ampliar **`specs/sdd-conventions.md`**: flujo `pending-review` → confirmación humana → `approved` → `/opsx:apply`.
- Delta **`sdd-governance`**: requisitos normativos (escenarios **SG-20**–**SG-22**).
- Delta **`test-harness`**: script en gate documentado (**TH-11**, **TH-12**).
- Delta **`project-constitution`**: Fase 9 completada al archivar (**PCO-15**).
- `breaking: false` en `.openspec.yaml`.

## Capabilities

### New Capabilities

_(ninguna)_

### Modified Capabilities

- `sdd-governance`: estado `pending-review`, bloqueo en continue/apply, flujo de aprobación humana.
- `test-harness`: script `pnpm spec:review-gate` y documentación en `specs/tech-stack.md`.
- `project-constitution`: Fase 9 del roadmap completada al archivar este cambio.

## Impact

- **Sin cambios en `src/`** de la aplicación de viaje.
- Archivos: `scripts/verify-review-gate.mjs`, `package.json`, skills/comandos en `.cursor/` y `.claude/`, `specs/sdd-conventions.md`, `specs/tech-stack.md`, tests unitarios del script.
- `pnpm test:verify` no aplica a lógica de producto; tests del script + validación manual del flujo en skills.
- Al archivar: marcar **Fase 9 ✅** en `specs/roadmap.md`.
