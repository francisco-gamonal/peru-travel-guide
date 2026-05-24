## ADDED Requirements

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
