## Why

La Fase 2 expuso un fallo que solo aparecía tras `pnpm build` (rutas estáticas vs query params): el SDD validó escenarios en `pnpm dev` pero no había **pruebas automatizadas** ni política de **cobertura**. `specs/tech-stack.md` documenta lint y build, no unit tests, cobertura mínima ni E2E. Sin eso, cada `/opsx-propose` puede omitir verificación reproducible.

## What Changes

- Ampliar `specs/tech-stack.md` con stack de pruebas: **Vitest** (unit), umbral de **cobertura ≥ 80 %** en código bajo test, **Playwright** (E2E contra `preview` o artefacto estático).
- Añadir scripts `pnpm test`, `pnpm test:coverage`, `pnpm test:e2e` y gate documentado antes de archivar cambios con código de aplicación.
- Refinar `openspec/config.yaml`: reglas en `proposal`, `design`, `specs` y `tasks` para exigir pruebas en propuestas futuras con lógica o UI.
- Implementar harness inicial + tests de regresión (p. ej. cada `/destino/<id>/` muestra su ciudad tras `build`).
- Actualizar `README.md` con comandos de test y requisitos de cobertura.

## Capabilities

### New Capabilities

- `test-harness`: Herramientas, scripts, umbrales de cobertura y E2E mínimos exigidos por el repositorio.

### Modified Capabilities

- `project-constitution`: `specs/tech-stack.md` MUST incluir pruebas unitarias, cobertura mínima 80 % y E2E como parte del stack acordado.

## Impact

- `package.json`, `vitest.config.ts`, `playwright.config.ts`, carpetas `tests/` o `e2e/`.
- `openspec/config.yaml` (reglas persistentes para agentes).
- `specs/tech-stack.md` (constitución).
- Sin cambio de producto visible salvo mayor confiabilidad; no bloquea Fase 3 si se aplica antes de nuevas features.
