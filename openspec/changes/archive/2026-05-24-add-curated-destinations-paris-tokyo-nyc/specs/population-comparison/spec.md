## ADDED Requirements

### Requirement: Destinos París, Tokio y Nueva York curados

El sistema MUST incluir destinos con `id` **`paris`**, **`tokyo`** y **`new-york`**, con ciudad/país en español, `countryCode` (`FR`, `JP`, `US`), población de ciudad y país documentadas (`source`, `year`, URLs) en `src/data/destinations.json`, visibles en el selector y en `/destino/<id>/`.

#### Scenario: PC-17 — Tres destinos en datos y build

- **ID:** `PC-17`
- **WHEN** se ejecuta `pnpm build`
- **THEN** `loadPopulationData()` incluye `paris`, `tokyo` y `new-york` con `cityName`/`countryName` correctos y `countryCode` válido sin error de validación

#### Scenario: PC-18 — Comparación poblacional de París en E2E

- **ID:** `PC-18`
- **WHEN** el usuario abre `/destino/paris/` tras el build estático
- **THEN** ve la comparación poblacional con cifras de París y Francia frente a referentes peruanos

#### Scenario: PC-19 — Comparación poblacional de Tokio en E2E

- **ID:** `PC-19`
- **WHEN** el usuario abre `/destino/tokyo/` tras el build estático
- **THEN** ve la comparación poblacional con cifras de Tokio y Japón frente a referentes peruanos

#### Scenario: PC-20 — Comparación poblacional de Nueva York en E2E

- **ID:** `PC-20`
- **WHEN** el usuario abre `/destino/new-york/` tras el build estático
- **THEN** ve la comparación poblacional con cifras de Nueva York y Estados Unidos frente a referentes peruanos
