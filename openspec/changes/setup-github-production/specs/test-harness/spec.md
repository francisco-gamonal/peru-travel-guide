## MODIFIED Requirements

### Requirement: Gate completo test:verify para CI y archive

El script `pnpm test:verify` MUST seguir existiendo e incluir `pnpm test:e2e` además de los pasos de `test:verify:push`. La documentación MUST indicar que CI y el archive de cambios OpenSpec con código de aplicación usan `pnpm test:verify`, no solo `test:verify:push`.

El repositorio MUST incluir un archivo `.github/workflows/ci.yml` (o equivalente) que invoque `pnpm test:verify` en GitHub Actions en `pull_request` y en `push` a la rama principal, de modo que CI sea la fuente de verdad con E2E en el servidor.

#### Scenario: Verificación completa manual o CI

- **WHEN** se ejecuta `pnpm test:verify` en un entorno con dependencias de Playwright instaladas
- **THEN** se ejecutan build, lint, cobertura, pruebas estáticas y E2E, y el proceso termina con código `0` solo si todos pasan

#### Scenario: CI en GitHub Actions

- **WHEN** se hace push o se abre un pull request en el repositorio remoto
- **THEN** el workflow de CI configurado en `.github/workflows/` ejecuta `pnpm test:verify` y reporta éxito o fallo en GitHub
