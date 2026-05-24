## ADDED Requirements

### Requirement: Verificación automática de trazabilidad spec → test

El repositorio MUST incluir el script `pnpm spec:traceability` (implementado en `scripts/verify-spec-traceability.mjs`) que valide, para el cambio OpenSpec activo en `openspec/changes/`, que cada Spec ID listado en `## Test traceability` de `design.md` aparece como `// @spec <ID>` en el archivo de test indicado.

#### Scenario: SG-17 — Script exitoso con trazabilidad completa

- **ID:** `SG-17`
- **WHEN** existe un único cambio activo con `design.md` y tabla de trazabilidad completa, y todos los archivos listados contienen los comentarios `// @spec <ID>` correspondientes
- **THEN** `pnpm spec:traceability` termina con código `0`

#### Scenario: SG-18 — Script falla si falta enlace

- **ID:** `SG-18`
- **WHEN** un Spec ID de la tabla no tiene `// @spec <ID>` en el archivo declarado
- **THEN** `pnpm spec:traceability` termina con código distinto de `0` e indica el ID y archivo faltante en stderr

## MODIFIED Requirements

### Requirement: Presupuesto de performance declarado

El repositorio MUST declarar en `specs/sdd-conventions.md` los umbrales objetivo de Core Web Vitals para las rutas de la aplicación, como referencia para el author de cada cambio que toque UI. Además, la medición automática en CI MUST estar normada por la capability `performance-budget` en `openspec/specs/performance-budget/spec.md`.

#### Scenario: SG-15 — Umbrales documentados

- **WHEN** un desarrollador o agente lee `specs/sdd-conventions.md`
- **THEN** encuentra los valores objetivo de LCP, CLS e INP para `/` y `/destino/[id]/`

#### Scenario: SG-16 — Mención en design.md de features UI

- **WHEN** un cambio post-Fase 6 modifica páginas, componentes o estilos
- **THEN** su `design.md` incluye una sección `## Performance impact` que describe si el cambio puede afectar los umbrales declarados y cómo se mitiga

#### Scenario: SG-19 — Enlace a capability performance-budget

- **ID:** `SG-19`
- **WHEN** un desarrollador lee la sección Performance budget de `specs/sdd-conventions.md` tras archivar este cambio
- **THEN** encuentra referencia explícita a `openspec/specs/performance-budget/spec.md` y al job LHCI en CI
