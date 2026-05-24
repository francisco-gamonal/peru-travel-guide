# test-harness Specification

## Purpose
TBD - created by archiving change add-testing-practices. Update Purpose after archive.

## Requirements

### Requirement: Pruebas unitarias con Vitest

El repositorio MUST incluir **Vitest** configurado para ejecutar pruebas unitarias de módulos TypeScript en `src/lib/` mediante `pnpm test`.

#### Scenario: Ejecutar unit tests

- **WHEN** el desarrollador ejecuta `pnpm test` desde la raíz
- **THEN** se ejecutan las pruebas unitarias y el proceso termina con código de salida `0` si todas pasan

#### Scenario: Fallo unitario

- **WHEN** una prueba unitaria falla
- **THEN** `pnpm test` termina con código de salida distinto de `0`

### Requirement: Cobertura mínima del 80 %

El repositorio MUST aplicar un umbral mínimo de **80 %** de cobertura (líneas o statements, según configuración documentada en `specs/tech-stack.md`) sobre el alcance `src/lib/**/*.ts`, excluyendo archivos `*.test.ts`, verificable con `pnpm test:coverage`.

#### Scenario: Cobertura suficiente

- **WHEN** el desarrollador ejecuta `pnpm test:coverage` con el código actual del alcance
- **THEN** el comando termina con código `0` y el informe indica cobertura ≥ 80 % en ese alcance

#### Scenario: Cobertura insuficiente

- **WHEN** el código del alcance cae por debajo del 80 % sin actualizar umbrales vía cambio OpenSpec
- **THEN** `pnpm test:coverage` falla con código distinto de `0`

### Requirement: Pruebas E2E con Playwright

El repositorio MUST incluir **Playwright** y pruebas E2E ejecutables con `pnpm test:e2e` que validen el sitio **después de build estático** (p. ej. contra `pnpm preview` vía `webServer`).

#### Scenario: Destinos estáticos distintos

- **WHEN** se ejecuta `pnpm test:e2e` tras un `pnpm build` exitoso
- **THEN** cada ruta `/destino/<id>/` de los destinos curados en datos muestra en el HTML el nombre de su ciudad (no el de otro destino)

#### Scenario: Ruta raíz

- **WHEN** se ejecuta la suite E2E
- **THEN** la navegación a `/` conduce a una comparación poblacional usable (redirect o contenido por defecto), sin error fatal

### Requirement: Documentación de comandos de test

`README.md` y `specs/tech-stack.md` MUST documentar `pnpm test`, `pnpm test:coverage`, `pnpm test:e2e` y el orden recomendado con `pnpm build` y `pnpm lint`.

#### Scenario: Onboarding con tests

- **WHEN** un desarrollador nuevo lee `README.md`
- **THEN** encuentra cómo ejecutar tests y el umbral de cobertura del 80 %

### Requirement: Regresión del bug de sitio estático

La suite E2E MUST incluir al menos un caso que hubiera fallado con query strings en `index` estático (p. ej. CDMX distinto de Madrid en `/destino/cdmx/`).

#### Scenario: Regresión CDMX vs Madrid

- **WHEN** la suite E2E visita `/destino/cdmx/`
- **THEN** el contenido incluye «Ciudad de México» y no presenta la comparación como si fuera únicamente Madrid

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

- **WHEN** `pnpm test:verify:push` falla (p. ej. cobertura < 80 % o `test:static` falla)
- **THEN** el hook aborta el push con código distinto de `0`

### Requirement: Gate completo test:verify para CI y archive

El script `pnpm test:verify` MUST seguir existiendo e incluir `pnpm test:e2e` además de los pasos de `test:verify:push`. La documentación MUST indicar que CI y el archive de cambios OpenSpec con código de aplicación usan `pnpm test:verify`, no solo `test:verify:push`.

El repositorio MUST incluir un archivo `.github/workflows/ci.yml` (o equivalente) que invoque `pnpm test:verify` en GitHub Actions en `pull_request` y en `push` a la rama principal, de modo que CI sea la fuente de verdad con E2E en el servidor.

#### Scenario: Verificación completa manual o CI

- **WHEN** se ejecuta `pnpm test:verify` en un entorno con dependencias de Playwright instaladas
- **THEN** se ejecutan build, lint, cobertura, pruebas estáticas y E2E, y el proceso termina con código `0` solo si todos pasan

#### Scenario: CI en GitHub Actions

- **WHEN** se hace push o se abre un pull request en el repositorio remoto
- **THEN** el workflow de CI configurado en `.github/workflows/` ejecuta `pnpm test:verify` y reporta éxito o fallo en GitHub

### Requirement: Instalación automática de hooks

Tras `pnpm install`, los hooks MUST quedar instalados mediante el script `prepare` del `package.json` (p. ej. `husky`), sin pasos manuales adicionales obligatorios salvo la primera clonación del repositorio.

#### Scenario: Onboarding tras clone

- **WHEN** un desarrollador clona el repo y ejecuta `pnpm install`
- **THEN** los archivos en `.husky/` están activos para `git commit` y `git push`
