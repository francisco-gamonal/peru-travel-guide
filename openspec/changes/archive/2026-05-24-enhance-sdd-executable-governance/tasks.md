## 1. Lighthouse CI y performance-budget

- [x] 1.1 Añadir devDependency `@lhci/cli` y, si hace falta, `serve` (o usar `astro preview`) en `package.json`
- [x] 1.2 Crear `lighthouserc.cjs` con URLs `/peru-travel-guide/` y `/peru-travel-guide/destino/london/`, assertions LCP ≤ 2500 ms y CLS ≤ 0.1 (PB-03, PB-04, PB-05)
- [x] 1.3 Añadir job `lighthouse` en `.github/workflows/ci.yml`: build con `ASTRO_BASE=/peru-travel-guide/`, servir `dist/`, ejecutar `lhci autorun`
- [x] 1.4 Crear `src/test/lighthouse-config.test.ts` con tests `// @spec PB-01` y `// @spec PB-02` que validen umbrales y rutas en `lighthouserc.cjs`
- [x] 1.5 Medir baseline local; ajustar config si el sitio actual ya está cerca del límite (documentar en commit)

## 2. Script spec:traceability

- [x] 2.1 Crear `scripts/verify-spec-traceability.mjs`: detectar cambio activo único, parsear tabla `## Test traceability` de `design.md`, verificar `// @spec <ID>` en archivos listados (SG-17, SG-18)
- [x] 2.2 Añadir `"spec:traceability": "node scripts/verify-spec-traceability.mjs"` en `package.json`
- [x] 2.3 Crear `src/test/spec-traceability.test.ts` con fixtures de `design.md` y archivos de test mock (`// @spec SG-17`, `// @spec SG-18`)
- [x] 2.4 Integrar invocación condicional en `test:verify:push` y `.github/workflows/ci.yml` (TH-09, TH-10)

## 3. Pre-commit con openspec validate

- [x] 3.1 Crear `scripts/pre-commit-openspec.mjs` (o shell) que liste cambios activos en `openspec/changes/` (excl. `archive/`) y ejecute `openspec validate <name>` por cada uno
- [x] 3.2 Actualizar `.husky/pre-commit`: `pnpm lint` + script condicional (TH-11, TH-12)
- [x] 3.3 Crear `src/test/pre-commit-openspec.test.ts` con tests de la lógica de detección de cambios activos (`// @spec TH-09`, `// @spec TH-10`)
- [x] 3.4 Verificación manual: commit con cambio activo inválido debe abortar; commit sin cambio activo debe pasar solo con lint

## 4. Constitución y convenciones

- [x] 4.1 Actualizar `specs/sdd-conventions.md`: enlace a `performance-budget`, prefijo `PB` en tabla de Scenario IDs, flujo con LHCI y `spec:traceability` (SG-19)
- [x] 4.2 Actualizar `specs/tech-stack.md`: LHCI, scripts `spec:traceability`, pre-commit ampliado, reproducción local de LHCI
- [x] 4.3 Actualizar `specs/roadmap.md`: Fase 7.5 — SDD Executable Governance (pendiente → completada al archivar) (PCO-11, PCO-12)
- [x] 4.4 Marcar `## Review checklist` en `design.md` antes de `/opsx:apply`

## 5. Verificación y cierre

- [x] 5.1 Ejecutar `pnpm lint && pnpm test && openspec validate enhance-sdd-executable-governance`
- [x] 5.2 Ejecutar `pnpm test:verify` (Node ≥ 22.12.0) incluyendo job LHCI en CI remoto o simulación local de LHCI
- [x] 5.3 Ejecutar `pnpm spec:traceability` con este cambio activo y tabla de trazabilidad completa
- [x] 5.4 `/opsx:archive` — sync deltas (`performance-budget` nueva, bumps en `sdd-governance`, `test-harness`, `project-constitution`), `pnpm changelog:generate`
