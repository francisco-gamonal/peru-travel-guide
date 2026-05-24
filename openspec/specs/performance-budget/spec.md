---
version: "1.1.0"
capability: performance-budget
---

# performance-budget Specification

## Purpose

Define umbrales de Core Web Vitals para rutas públicas del sitio y la medición automática en CI con Lighthouse CI (`@lhci/cli`).

## Requirements

### Requirement: Umbrales de Core Web Vitals declarados en capability

La capability `performance-budget` MUST declarar los umbrales objetivo alineados con `specs/sdd-conventions.md`: **LCP ≤ 2.5 s**, **CLS ≤ 0.1**, **INP ≤ 200 ms** (INP como referencia; ver escenario PB-04 sobre medición en CI).

#### Scenario: PB-01 — Umbrales en spec principal

- **ID:** `PB-01`
- **WHEN** un desarrollador o agente lee `openspec/specs/performance-budget/spec.md`
- **THEN** encuentra los valores numéricos de LCP, CLS e INP y las rutas `/` y `/destino/[id]/` a las que aplican

#### Scenario: PB-02 — Coherencia con sdd-conventions

- **ID:** `PB-02`
- **WHEN** se comparan los umbrales de `specs/sdd-conventions.md` y `performance-budget`
- **THEN** los valores de LCP y CLS coinciden; cualquier diferencia en INP MUST estar documentada con razón técnica en `design.md`

### Requirement: Medición Lighthouse CI en GitHub Actions

El repositorio MUST ejecutar **Lighthouse CI** (`@lhci/cli`) en el workflow `.github/workflows/ci.yml` tras un `pnpm build` exitoso con la misma configuración de `ASTRO_BASE` que producción, y MUST fallar el job si alguna métrica bajo gate supera el umbral acordado.

#### Scenario: PB-03 — CI ejecuta LHCI post-build

- **ID:** `PB-03`
- **WHEN** se dispara el workflow CI en push o pull request
- **THEN** un job (o paso dedicado) construye el sitio, sirve `dist/` localmente y ejecuta `lhci autorun` contra al menos `/` (con base path) y `/destino/london/`

#### Scenario: PB-04 — Fallo por regresión de LCP o CLS

- **ID:** `PB-04`
- **WHEN** el informe LHCI reporta LCP > 2500 ms o CLS > 0.1 en alguna ruta bajo gate
- **THEN** el job termina con código distinto de `0` y el workflow CI se marca como fallido

### Requirement: Configuración versionada de LHCI

El repositorio MUST incluir un archivo de configuración versionado (p. ej. `lighthouserc.cjs` o `.lighthouserc.json`) que declare URLs, número de ejecuciones y assertions de umbrales, sin secretos embebidos.

#### Scenario: PB-05 — Config presente y documentada

- **ID:** `PB-05`
- **WHEN** un desarrollador clona el repositorio
- **THEN** encuentra la configuración LHCI en la raíz o en `scripts/` y `specs/tech-stack.md` indica cómo reproducir la medición localmente

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
