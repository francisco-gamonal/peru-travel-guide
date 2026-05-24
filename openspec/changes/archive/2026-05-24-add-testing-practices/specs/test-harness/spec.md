## ADDED Requirements

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
