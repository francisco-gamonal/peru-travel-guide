## Why

La **Fase 9.5** del roadmap cierra la recomendación canvas SDD #4 (INP en CI). Tras Fase 7.5, LHCI mide **LCP** y **CLS** con gate duro; **INP ≤ 200 ms** está declarado en `specs/sdd-conventions.md` y `performance-budget` pero solo como referencia manual. Este cambio evalúa si LHCI headless reporta INP de forma fiable y, si es así, añade assertion en CI; si no, documenta la excepción de forma normativa.

## What Changes

- **Spike** en apply: ejecutar `pnpm lhci` y registrar si el audit `interaction-to-next-paint` (INP) aparece con valor numérico estable en headless.
- Si fiable: añadir assertion INP en `lighthouserc.cjs` usando `THRESHOLDS.inpMs` de `scripts/lighthouse-budget.cjs`.
- Delta **`performance-budget`**: escenarios **PB-06** (gate INP en CI) y **PB-07** (documentación si INP sigue manual); posible **MODIFIED** del requisito de medición LHCI.
- Actualizar **`specs/sdd-conventions.md`**: aclarar si INP pasa a gate duro en CI o permanece manual con razón en `design.md`.
- Tests en `src/test/lighthouse-config.test.ts` con `// @spec PB-06` / **PB-07**.
- Delta **`project-constitution`**: **PCO-16** — Fase 9.5 completada al archivar.
- `breaking: false` en `.openspec.yaml`.

## Capabilities

### New Capabilities

_(ninguna)_

### Modified Capabilities

- `performance-budget`: gate INP en LHCI (condicional al spike) o documentación explícita de excepción.
- `project-constitution`: Fase 9.5 completada en roadmap al archivar.

## Impact

- Archivos: `lighthouserc.cjs`, `scripts/lighthouse-budget.cjs` (posible helper), `src/test/lighthouse-config.test.ts`, `specs/sdd-conventions.md`, `specs/tech-stack.md`, `specs/roadmap.md` al archivar.
- **Sin cambios en `src/`** de la app de viaje salvo tests de config LHCI.
- CI job `lighthouse`: puede ganar assertion INP o permanecer igual con spec actualizada.
- Depende de Fase 9 completada (`enhance-sdd-review-gate` archivado).
