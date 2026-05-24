## ADDED Requirements

### Requirement: Hook pre-commit con lint

El repositorio MUST configurar un hook Git `pre-commit` (p. ej. vía Husky) que ejecute `pnpm lint` desde la raíz y aborte el commit si el comando termina con código distinto de `0`.

#### Scenario: Commit con lint correcto

- **WHEN** el desarrollador ejecuta `git commit` con cambios que pasan `pnpm lint`
- **THEN** el hook `pre-commit` termina con código `0` y el commit se completa

#### Scenario: Commit con lint fallido

- **WHEN** el desarrollador ejecuta `git commit` y `pnpm lint` reporta errores
- **THEN** el hook aborta el commit con código distinto de `0`

### Requirement: Hook pre-push con verificación post-build sin E2E

El repositorio MUST configurar un hook Git `pre-push` que ejecute `pnpm test:verify:push`, definido como `pnpm build && pnpm lint && pnpm test:coverage && pnpm test:static`, y aborte el push si cualquier paso falla.

#### Scenario: Push con verificación exitosa

- **WHEN** el desarrollador ejecuta `git push` y `pnpm test:verify:push` termina con código `0`
- **THEN** el push continúa

#### Scenario: Push con build o tests fallidos

- **WHEN** `pnpm test:verify:push` falla (p. ej. cobertura &lt; 80 % o `test:static` falla)
- **THEN** el hook aborta el push con código distinto de `0`

### Requirement: Gate completo test:verify para CI y archive

El script `pnpm test:verify` MUST seguir existiendo e incluir `pnpm test:e2e` además de los pasos de `test:verify:push`. La documentación MUST indicar que CI y el archive de cambios OpenSpec con código de aplicación usan `test:verify`, no solo `test:verify:push`.

#### Scenario: Verificación completa manual o CI

- **WHEN** se ejecuta `pnpm test:verify` en un entorno con dependencias de Playwright instaladas
- **THEN** se ejecutan build, lint, cobertura, pruebas estáticas y E2E, y el proceso termina con código `0` solo si todos pasan

### Requirement: Instalación automática de hooks

Tras `pnpm install`, los hooks MUST quedar instalados mediante el script `prepare` del `package.json` (p. ej. `husky`), sin pasos manuales adicionales obligatorios salvo la primera clonación del repositorio.

#### Scenario: Onboarding tras clone

- **WHEN** un desarrollador clona el repo y ejecuta `pnpm install`
- **THEN** los archivos en `.husky/` están activos para `git commit` y `git push`
