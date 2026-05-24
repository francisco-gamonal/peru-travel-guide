## Why

Tras `add-testing-practices`, `pnpm test:verify` documenta el gate de calidad, pero depende de que cada desarrollador lo recuerde antes de `commit` o `push`. Eso permite commits locales con lint roto o sin `build`/tests, y `--no-verify` puede saltarse cualquier comprobación manual. Automatizar **hooks en capas** (rápido en `pre-commit`, más completo en `pre-push`, completo en CI) alinea el flujo diario con SDD sin frenar cada commit con Playwright.

## What Changes

- Añadir **Husky** y scripts versionados en `.husky/` activados con `prepare` en `package.json`.
- **`pre-commit`:** `pnpm lint` (rápido, segundos).
- **`pre-push`:** nuevo script `pnpm test:verify:push` = `build` + `lint` + `test:coverage` + `test:static` (sin E2E).
- Mantener **`pnpm test:verify`** como gate completo (incluye E2E) para archive manual, CI y documentación.
- Documentar la política en `specs/tech-stack.md` y `README.md` (instalación de hooks, bypass con `--no-verify`, CI como fuente de verdad).
- Ampliar capability `test-harness` con requisitos de hooks; actualizar `project-constitution` para que `tech-stack` describa la estrategia en tres capas.
- **Opcional en este cambio:** workflow de GitHub Actions con `pnpm test:verify` (si no, dejar documentado para Fase 5).

## Capabilities

### New Capabilities

_(ninguna — la política de hooks extiende `test-harness`)_

### Modified Capabilities

- `test-harness`: requisitos de `pre-commit`, `pre-push`, scripts `test:verify:push` y relación con `test:verify`.
- `project-constitution`: `specs/tech-stack.md` MUST documentar hooks Git y la división pre-commit / pre-push / CI.

## Impact

- `package.json` (`prepare`, script `test:verify:push`), devDependency `husky`, `.husky/pre-commit`, `.husky/pre-push`.
- `specs/tech-stack.md`, `README.md`.
- `openspec/specs/test-harness/spec.md` (delta).
- Sin cambios en rutas de producto ni en `specs/roadmap.md` (calidad transversal, no fase de producto).
- Desarrolladores: primer `pnpm install` instala hooks; `pre-push` más lento que `pre-commit` (aceptable antes de subir).
