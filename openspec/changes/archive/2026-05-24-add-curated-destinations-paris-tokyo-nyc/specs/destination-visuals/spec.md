## ADDED Requirements

### Requirement: Banderas FR, JP y US para nuevos destinos

Los destinos `paris`, `tokyo` y `new-york` MUST tener assets SVG en `src/assets/flags/` (`fr.svg`, `jp.svg`, `us.svg`) mapeados por `countryCode`, con el mismo criterio de optimización y accesibilidad que banderas existentes.

#### Scenario: DV-09 — Mapeo countryCode FR, JP, US

- **ID:** `DV-09`
- **WHEN** se invoca el helper de banderas con `countryCode` `FR`, `JP` o `US`
- **THEN** devuelve la referencia al SVG correspondiente en `src/assets/flags/` sin error

#### Scenario: DV-10 — Banderas en HTML estático de destino nuevo

- **ID:** `DV-10`
- **WHEN** se ejecuta `pnpm build` y se inspecciona `dist/destino/paris/index.html`
- **THEN** el HTML contiene la bandera de Francia con `alt` en español y dimensiones explícitas

#### Scenario: DV-11 — Selector con banderas de siete destinos (E2E)

- **ID:** `DV-11`
- **WHEN** un usuario en E2E abre `/destino/paris/` y selecciona Tokio en el selector
- **THEN** la URL cambia a `/destino/tokyo/` y la bandera de cabecera corresponde a Japón
