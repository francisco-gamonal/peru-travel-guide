## Context

Fase 7.5 cerró LHCI, `openspec validate` en pre-commit y `pnpm spec:traceability`. El review gate sigue siendo checklist manual en `design.md` (**SG-12**): el agente *debe* detenerse con items `- [ ]`, pero no hay estado persistente ni script que lo enforce. El canvas SDD priorizó un step **pending-review** entre `design.md` y `tasks.md` (estilo spec review de Stripe).

Restricciones: no modificar `src/`; cambios en skills, scripts y constitución de proceso; convenciones post-Fase 6.

## Goals / Non-Goals

**Goals:**

- Estado **`reviewStatus`** en `.openspec.yaml` del cambio activo.
- **`pnpm spec:review-gate`** ejecutable en apply y documentado.
- Skills **`continue`** y **`apply`** alineados con el gate.
- Documentación en `specs/sdd-conventions.md` y deltas en capabilities.
- Criterio de salida Fase 9: flujo probado manualmente + cambio archivado.

**Non-Goals:**

- UI web ni cambios en GitHub Actions (salvo mención en tech-stack).
- Automatizar la *decisión* humana (sigue siendo confirmación explícita).
- INP en CI (Fase 9.5) ni retroadaptación legacy (Fase 13).

## Decisions

### D1: Campo `reviewStatus` en `.openspec.yaml`

```yaml
schema: spec-driven
created: 2026-05-24
breaking: false
reviewStatus: pending-review  # o approved
```

- Tras crear `design.md`, el skill **continue** MUST setear `reviewStatus: pending-review` si no existe.
- Tras confirmación explícita del usuario (y checklist `- [x]`), el agente o usuario MUST setear `reviewStatus: approved` antes de `tasks.md` o `/opsx:apply`.

**Alternativa:** archivo `.review-approved` separado. Descartada — un solo metadato en `.openspec.yaml` ya versionado.

### D2: Script `scripts/verify-review-gate.mjs`

Comportamiento:

1. Detecta único cambio activo en `openspec/changes/` (excl. `archive/`). Si 0 cambios → exit 0 (skip). Si >1 → exit 1 con lista.
2. Si no existe `design.md` → exit 0 (aún no aplica gate).
3. Lee `reviewStatus` de `.openspec.yaml`; si `!== approved` → exit 1.
4. Parsea `## Review checklist` en `design.md`; si hay `- [ ]` → exit 1 (refuerzo de SG-12).

Expuesto como `pnpm spec:review-gate`. Integrar en **`openspec-apply-change`** (paso obligatorio antes de tasks) y documentar en `specs/tech-stack.md`.

**Alternativa:** hook pre-commit. Descartada — el gate aplica al flujo OpenSpec, no a cada commit.

### D3: Skill `openspec-continue-change`

Tras generar `design.md`:

- Escribir/actualizar `reviewStatus: pending-review` en `.openspec.yaml`.
- Mostrar checklist al usuario y **STOP** con mensaje: «Revisa design.md; confirma explícitamente para aprobar y continuar con tasks».
- Si el siguiente artefacto es `tasks` y `reviewStatus !== approved`, **no** crear `tasks.md` salvo confirmación explícita en la sesión (entonces setear `approved`).

### D4: Skill `openspec-apply-change`

Antes del loop de tasks:

- Ejecutar `pnpm spec:review-gate` (o lógica equivalente inline).
- Si falla: listar checklist pendiente y `reviewStatus`; solicitar aprobación; no implementar.

### D5: Espejo en `.cursor/commands/` y `.claude/commands/`

Mismas reglas que skills para consistencia Cursor/Claude.

### D6: Tests unitarios del script

`src/test/review-gate.test.ts` con fixtures de cambio temporal en directorio de test (o mock de paths). IDs **TH-11**, **TH-12** en delta `test-harness`.

## Risks / Trade-offs

- **[Riesgo] Fricción extra en flujo ágil** → Mitigación: skip si no hay `design.md`; solo cambios OpenSpec activos.
- **[Riesgo] Parser frágil de checklist** → Mitigación: mismo patrón que `verify-spec-traceability.mjs`; tests con fixtures.
- **[Riesgo] `reviewStatus` olvidado manualmente** → Mitigación: continue skill lo setea automáticamente.

## Test traceability

| Spec ID | Tipo | Archivo |
|---------|------|---------|
| SG-20 | unit | `src/test/review-gate.test.ts` |
| SG-21 | unit | `src/test/review-gate.test.ts` |
| SG-22 | unit | `src/test/review-gate.test.ts` |
| TH-11 | unit | `src/test/review-gate.test.ts` |
| TH-12 | unit | `src/test/review-gate.test.ts` |

## Review checklist

- [x] Alineado con `specs/mission.md` (proceso SDD, sin impacto producto)
- [x] Alineado con `specs/roadmap.md` (Fase 9)
- [x] Test traceability definida
- [x] Sin contradicción con SG-11/SG-12 existentes (extiende, no reemplaza)
- [x] `breaking: false` en `.openspec.yaml`
- [x] Aprobado para implementar

## Performance impact

- Rutas afectadas: ninguna en `src/` de la app.
- Riesgo: bajo.
- Mitigación: N/A.

## Verificación manual (Fase 9)

Flujo probado en apply de este cambio:

1. `pnpm spec:review-gate` con `reviewStatus: approved` y checklist `[x]` → exit 0.
2. Skills `continue`/`apply` y comandos `opsx:*` documentan STOP si `pending-review`.
3. Tras archivar: marcar Fase 9 ✅ en roadmap (tarea 4.3).
