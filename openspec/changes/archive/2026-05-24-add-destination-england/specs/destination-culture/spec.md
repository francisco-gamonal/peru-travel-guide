## ADDED Requirements

### Requirement: Cultura práctica para viajero en Londres

El sistema MUST incluir en `src/data/culture.json` un registro con `destinationId: "london"` con `summary` y al menos **tres** `tips` prácticos para el viajero desde Perú, más `source`, `year`, `sourceUrl`.

#### Scenario: CU-08 — Datos culturales de Londres en build

- **ID:** `CU-08`
- **WHEN** se ejecuta `pnpm build`
- **THEN** los datos culturales de `london` están disponibles y pasan la validación en `src/lib/culture.ts`

#### Scenario: CU-09 — Bloque cultural visible para Londres

- **ID:** `CU-09`
- **WHEN** el usuario visita `/destino/london/` en el sitio construido
- **THEN** ve el widget de cultura con consejos específicos de Londres/Reino Unido y sin mensaje de cultura pendiente
