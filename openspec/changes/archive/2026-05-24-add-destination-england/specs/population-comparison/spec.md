## ADDED Requirements

### Requirement: Destino Londres (Reino Unido) curado

El sistema MUST incluir un destino con `id` **`london`**, ciudad **Londres** y país **Reino Unido**, con población de ciudad y de país documentadas (`source`, `year`, URLs) en `src/data/destinations.json`, visible en el selector y en `/destino/london/`.

#### Scenario: PC-15 — Londres en datos y build

- **ID:** `PC-15`
- **WHEN** se ejecuta `pnpm build`
- **THEN** `loadPopulationData()` incluye el destino `london` con `cityName` Londres y `countryName` Reino Unido sin error de validación

#### Scenario: PC-16 — Comparación poblacional de Londres en E2E

- **ID:** `PC-16`
- **WHEN** el usuario abre `/destino/london/` tras el build estático
- **THEN** ve la comparación poblacional con cifras de Londres y Reino Unido frente a referentes peruanos, con atribución de fuente visible
