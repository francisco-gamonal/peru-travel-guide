## ADDED Requirements

### Requirement: Cultura práctica para París, Tokio y Nueva York

El sistema MUST incluir entradas en `src/data/culture.json` para `destinationId` **`paris`**, **`tokyo`** y **`new-york`**, con `summary`, al menos tres `tips` y `source`, visibles en la ficha de destino.

#### Scenario: CU-10 — Datos culturales de tres destinos en build

- **ID:** `CU-10`
- **WHEN** se ejecuta `pnpm build`
- **THEN** `loadCultureData()` incluye `paris`, `tokyo` y `new-york` con `summary` y ≥3 tips sin error de validación

#### Scenario: CU-11 — Bloque cultural visible para París

- **ID:** `CU-11`
- **WHEN** el usuario abre `/destino/paris/` tras el build estático
- **THEN** ve el bloque cultural con contenido práctico distintivo de París/Francia

#### Scenario: CU-12 — Bloque cultural visible para Tokio

- **ID:** `CU-12`
- **WHEN** el usuario abre `/destino/tokyo/` tras el build estático
- **THEN** ve el bloque cultural con contenido práctico distintivo de Tokio/Japón

#### Scenario: CU-13 — Bloque cultural visible para Nueva York

- **ID:** `CU-13`
- **WHEN** el usuario abre `/destino/new-york/` tras el build estático
- **THEN** ve el bloque cultural con contenido práctico distintivo de Nueva York/Estados Unidos
