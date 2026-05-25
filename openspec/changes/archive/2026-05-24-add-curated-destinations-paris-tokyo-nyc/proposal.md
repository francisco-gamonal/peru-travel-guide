## Why

La **Fase 10** del roadmap amplía la guía con tres destinos internacionales de alto interés (**París**, **Tokio**, **Nueva York**) para viajeros con referente en Perú/Lima. Tras Fases 7 y 8, el patrón de destino curado (datos JSON, SSG, banderas, trazabilidad SDD) está probado; este cambio escala el catálogo de cuatro a **siete** destinos sin nuevas capabilities de producto.

## What Changes

- Añadir destinos curados con `id` **`paris`**, **`tokyo`**, **`new-york`** en `src/data/destinations.json` (población ciudad/país, `countryCode` **`FR`**, **`JP`**, **`US`**, fuentes y año).
- Añadir bloques de clima y cultura en `src/data/climate.json` y `src/data/culture.json` para cada `destinationId`.
- Generar rutas estáticas `/destino/paris/`, `/destino/tokyo/`, `/destino/new-york/` vía `getStaticPaths` existente.
- Añadir SVG de banderas `fr.svg`, `jp.svg`, `us.svg` en `src/assets/flags/` e integrarlas en selector y ficha.
- Actualizar selector, tests unitarios, estáticos post-build y E2E con Scenario IDs nuevos.
- Delta **`project-constitution`**: **PCO-17** — Fase 10 completada al archivar.
- `breaking: false` en `.openspec.yaml`.

## Capabilities

### New Capabilities

_(ninguna)_

### Modified Capabilities

- `population-comparison`: destinos París, Tokio y Nueva York con población y comparación vs referentes peruanos.
- `destination-climate`: datos climáticos y mejores épocas para `paris`, `tokyo`, `new-york`.
- `destination-culture`: bloques culturales prácticos para los tres destinos.
- `destination-visuals`: banderas `FR`, `JP`, `US` en assets y UI.
- `project-constitution`: Fase 10 completada en roadmap al archivar.

## Impact

- **Datos:** `src/data/destinations.json`, `climate.json`, `culture.json`.
- **Assets:** `src/assets/flags/fr.svg`, `jp.svg`, `us.svg`.
- **Tests:** `src/lib/*.validation.test.ts`, `src/test/static-destinations.test.ts`, `e2e/destinations.spec.ts` con `// @spec <ID>`.
- **UI:** reutiliza widgets existentes; selector con siete destinos.
- **Gates:** `pnpm test:verify` y job `lighthouse` sin regresión LCP/CLS antes de archivar.
- **Roadmap:** Fase 10 pasa a ✅ completada al archivar.
