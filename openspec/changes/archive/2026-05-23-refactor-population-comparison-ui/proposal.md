## Why

La comparación poblacional (Fase 2) cumple funcionalmente, pero la UI actual apila **una tarjeta + barra + fuente por cada fila** (ciudad destino, país destino, Perú, Lima, distritos). Eso empuja clima y el resto de la ficha muy abajo y dificulta el escaneo. El usuario debe ver **países vs países** y **ciudades vs ciudades** en **un solo widget**, con menos scroll y fuentes agrupadas.

No es una fase nueva del roadmap (no es cultura ni clima): es **refactor de presentación** de la capability `population-comparison` ya entregada.

## What Changes

- Sustituir la lista de tarjetas en `PopulationComparison.astro` por **un único widget** con dos subsecciones ordenadas:
  1. **Países** — país del destino frente a Perú (población + barras horizontales comparativas).
  2. **Ciudades** — ciudad del destino frente a provincia de Lima; distritos de Lima en formato compacto (misma subsección, sin tarjeta por distrito).
- Agrupar **fuentes y años** al pie del widget (bloque de atribución único o por subsección), no repetir `SourceAttribution` en cada fila.
- Ajustar helpers en `src/lib/population.ts` para exponer filas agrupadas (`country` / `city`) sin cambiar datos JSON.
- Mantener locale `es-PE`, frase de ratio respecto a Lima y accesibilidad (`aria-labelledby`, `role="img"` en barras).
- Actualizar E2E/estáticos si cambian selectores o textos estructurales; **sin** cambiar rutas ni selector de destino.
- Opcional: una línea en `specs/mission.md` (principio de densidad legible) — solo si se acuerda en apply.

## Capabilities

### New Capabilities

_(ninguna)_

### Modified Capabilities

- `population-comparison`: requisitos de comparación visual y atribución de fuentes; presentación en widget único por capas país/ciudad.

## Impact

- `src/lib/population.ts`, `PopulationComparison.astro`, posible subcomponente `PopulationComparisonWidget.astro`.
- Tests unitarios de agrupación; E2E (`#comparison-heading`, contenido Madrid/CDMX).
- **No** modifica `destination-climate`, datos JSON ni Fase 4 del roadmap.
- **No** reabre el archive `add-population-comparison`; este cambio es el sucesor de UI.
