## ADDED Requirements

### Requirement: Clima y mejores épocas para Londres

El sistema MUST incluir en `src/data/climate.json` un registro con `destinationId: "london"` que describa el clima de Londres (resumen en español), estaciones o patrones estacionales, ventanas `bestTimeToVisit` y metadatos `source`, `year`, `sourceUrl`.

#### Scenario: DC-09 — Datos climáticos de Londres en build

- **ID:** `DC-09`
- **WHEN** se ejecuta `pnpm build`
- **THEN** los datos climáticos de `london` están disponibles y pasan la validación en `src/lib/climate.ts`

#### Scenario: DC-10 — Bloque climático visible para Londres

- **ID:** `DC-10`
- **WHEN** el usuario visita `/destino/london/` en el sitio construido
- **THEN** ve el widget de clima y mejores épocas con contenido específico de Londres (no el de otro destino)
