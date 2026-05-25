## ADDED Requirements

### Requirement: Clima y épocas para París, Tokio y Nueva York

El sistema MUST incluir entradas en `src/data/climate.json` para `destinationId` **`paris`**, **`tokyo`** y **`new-york`**, con resumen climático, estaciones o ventanas y `bestTimeToVisit`, visibles en la ficha de destino.

#### Scenario: DC-11 — Datos climáticos de tres destinos en build

- **ID:** `DC-11`
- **WHEN** se ejecuta `pnpm build`
- **THEN** `loadClimateData()` incluye `paris`, `tokyo` y `new-york` con resumen y `bestTimeToVisit` sin error de validación

#### Scenario: DC-12 — Bloque climático visible para París

- **ID:** `DC-12`
- **WHEN** el usuario abre `/destino/paris/` tras el build estático
- **THEN** ve el bloque «Clima y mejores épocas» con contenido distintivo de clima oceánico/templado parisino

#### Scenario: DC-13 — Bloque climático visible para Tokio

- **ID:** `DC-13`
- **WHEN** el usuario abre `/destino/tokyo/` tras el build estático
- **THEN** ve el bloque «Clima y mejores épocas» con contenido distintivo de clima subtropical/húmedo japonés

#### Scenario: DC-14 — Bloque climático visible para Nueva York

- **ID:** `DC-14`
- **WHEN** el usuario abre `/destino/new-york/` tras el build estático
- **THEN** ve el bloque «Clima y mejores épocas» con contenido distintivo de clima continental húmedo
