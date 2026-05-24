## Why

La capability `destination-climate` (Fase 3) cumple funcionalmente, pero `ClimateAndSeasons.astro` apila **tres tarjetas independientes** (resumen, estaciones, mejores épocas) más la fuente al pie. Junto con el widget de población ya refactorizado, eso alarga la ficha y obliga a mucho scroll antes de llegar al pie «Próximamente: cultura» y, en Fase 4, al bloque unificado. El viajero necesita **escanear clima y cuándo viajar en un solo bloque compacto**, con fuentes agrupadas — el mismo criterio de densidad legible que `refactor-population-comparison-ui`.

No es una fase nueva del roadmap: es **refactor de presentación** de `destination-climate` ya archivado en `add-destination-climate`.

## What Changes

- Sustituir las tres tarjetas apiladas por **un único widget** (`<article>`) bajo el mismo `h2` «Clima y mejores épocas», con subsecciones internas ordenadas:
  1. **Resumen** — párrafo climático + disclaimer breve (sin tarjeta propia).
  2. **Estaciones** — tabla o lista compacta (nombre, rango térmico, lluvia) en lugar de un `<li>` expandido por estación con descripción larga en bloque separado.
  3. **Mejores épocas** — ventanas recomendadas en formato compacto (etiqueta, meses, motivo en una o dos líneas).
- Agrupar **fuente y año** al pie del widget (mismo patrón que población), sin `SourceAttribution` suelto debajo de otra tarjeta.
- Opcional en `src/lib/climate.ts`: helper `buildClimateView(climate)` para centralizar filas de estaciones y ventanas (tests Vitest).
- Mantener `section[aria-labelledby="climate-heading"]`, textos en español, coherencia al cambiar destino y estado vacío sin datos.
- Actualizar E2E/estáticos solo si cambian selectores o estructura DOM; **sin** cambiar `climate.json`, rutas ni orden respecto a población.
- **No** incluir cultura (Fase 4) ni gráficos interactivos.

## Capabilities

### New Capabilities

_(ninguna)_

### Modified Capabilities

- `destination-climate`: requisitos de presentación compacta en widget único, atribución de fuente agrupada y escaneabilidad (sin perder resumen, estaciones ni mejores épocas).

## Impact

- `src/components/ClimateAndSeasons.astro`, posible subcomponente `ClimateWidget.astro`.
- `src/lib/climate.ts` (helper de vista opcional) y tests en `climate.test.ts`.
- E2E `e2e/destinations.spec.ts` (selectores `section[aria-labelledby="climate-heading"]` se mantienen; validar snippets climáticos).
- **No** modifica `population-comparison`, `climate.json` ni Fase 4 del roadmap.
- Gates: `pnpm test:verify` antes de archivar.
