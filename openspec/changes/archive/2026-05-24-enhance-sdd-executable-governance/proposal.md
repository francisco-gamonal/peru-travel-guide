## Why

Tras la Fase 6 (`enhance-sdd-governance`) y la Fase 7 (`add-destination-england`), las convenciones SDD del canvas están **documentadas** pero varias recomendaciones siguen siendo **manuales o aspiracionales**: medición de Core Web Vitals en CI, validación de cambios OpenSpec activos antes del commit, y comprobación automática de la trazabilidad `// @spec <ID>`. La Fase 8 del roadmap (`add-destination-visual-assets`) añadirá assets e imágenes optimizadas — justo el tipo de cambio que más riesgo de regresión de performance conlleva. Cerrar estas brechas **antes** de Fase 8 convierte el presupuesto de performance y la trazabilidad en **gates ejecutables**, no solo en texto de constitución.

## What Changes

- Crear capability **`performance-budget`**: umbrales LCP/CLS/INP alineados con `specs/sdd-conventions.md`, medidos con **Lighthouse CI** (`@lhci/cli`) contra el build estático en GitHub Actions.
- Añadir job de **LHCI** al workflow de CI (post-`pnpm build`, rutas `/` y al menos un `/destino/<id>/` representativo).
- Integrar **`openspec validate`** en el hook **`pre-commit`** cuando exista un cambio activo en `openspec/changes/` (no archivado); mantener `pnpm lint` como primer paso.
- Crear script **`pnpm spec:traceability`** que verifique que los IDs referenciados en delta specs activos o en escenarios recientes tienen `// @spec <ID>` en los archivos declarados en `design.md` (alcance acotado: cambios activos + escenarios con ID explícito).
- Actualizar **`specs/sdd-conventions.md`**: sección Performance budget enlaza a la capability `performance-budget`; flujo resumido incluye LHCI y `spec:traceability`.
- Documentar **Fase 7.5 — SDD Executable Governance** en `specs/roadmap.md` (entre Fase 7 y Fase 8), con criterio de salida verificable en CI.
- Añadir `breaking: false` en `.openspec.yaml` de este cambio.

**Fuera de alcance (non-goals explícitos):**

- Retroadaptar Scenario IDs en escenarios legacy de capabilities pre-Fase 6 (política ya fijada en `specs/sdd-conventions.md`).
- Fase 8 — iconos y banderas (`add-destination-visual-assets`); queda como siguiente fase de producto tras completar este cambio.
- Automatizar el review gate humano en skills (sigue siendo checklist + confirmación explícita).

## Capabilities

### New Capabilities

- `performance-budget`: medición automática de Core Web Vitals en CI con umbrales declarados para `/` y `/destino/[id]/`; integración con el workflow de deploy/verify.

### Modified Capabilities

- `sdd-governance`: requisitos de trazabilidad ejecutable (`spec:traceability`) y referencia cruzada al gate LHCI en CI.
- `test-harness`: ampliación del hook `pre-commit` con `openspec validate` condicional; script `spec:traceability` en el gate de verificación documentado.
- `project-constitution`: requisito de fase intermedia documentada en `specs/roadmap.md` entre Fase 7 y Fase 8.

## Impact

- **CI / GitHub Actions:** nuevo job LHCI (o paso en workflow existente); posible extensión de tiempo de pipeline (~1–3 min).
- **Dependencias dev:** `@lhci/cli` (y configuración `lighthouserc` o equivalente).
- **Git hooks:** `.husky/pre-commit` — lint + validate condicional.
- **Scripts:** `scripts/verify-spec-traceability.mjs`, `pnpm spec:traceability`; posible inclusión en `test:verify` o script dedicado `test:verify:sdd`.
- **Constitución:** `specs/sdd-conventions.md`, `specs/roadmap.md`, `specs/tech-stack.md` (tabla de hooks/scripts).
- **Sin cambios en `src/`** de la aplicación de viaje; no impacto directo en cobertura Vitest ni E2E de destinos (salvo tests del propio script de trazabilidad si se añaden).
