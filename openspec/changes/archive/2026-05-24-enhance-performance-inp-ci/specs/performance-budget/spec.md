## ADDED Requirements

### Requirement: Gate INP en Lighthouse CI cuando el audit es fiable

Si el spike documentado en el `design.md` del cambio `enhance-performance-inp-ci` confirma que LHCI headless reporta el audit **`interaction-to-next-paint`** con valor numérico estable en las rutas bajo gate, el repositorio MUST añadir assertion de error en `lighthouserc.cjs` con umbral **≤ 200 ms** alineado con `THRESHOLDS.inpMs` de `scripts/lighthouse-budget.cjs`, y el job `lighthouse` en CI MUST fallar si INP supera el umbral.

#### Scenario: PB-06 — Assertion INP en lighthouserc

- **ID:** `PB-06`
- **WHEN** se archiva `enhance-performance-inp-ci` con spike positivo y se lee `lighthouserc.cjs`
- **THEN** incluye assertion `interaction-to-next-paint` con `maxNumericValue` 200 y el test `lighthouse-config.test.ts` referencia PB-06 en verde

### Requirement: Excepción documentada si INP no es fiable en headless

Si el spike determina que INP no es medible de forma fiable en LHCI headless, el cambio MUST documentar en `design.md` la razón técnica, MUST actualizar `specs/sdd-conventions.md` indicando que INP sigue en validación manual, y MUST NOT añadir assertion INP en `lighthouserc.cjs`. La capability MUST incluir escenario PB-07 verificable en tests.

#### Scenario: PB-07 — INP manual documentado

- **ID:** `PB-07`
- **WHEN** se archiva `enhance-performance-inp-ci` con spike negativo
- **THEN** `openspec/specs/performance-budget/spec.md` incluye PB-07, `specs/sdd-conventions.md` mantiene INP como manual con referencia al spike, y no hay assertion INP en `lighthouserc.cjs`
