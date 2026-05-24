## Why

La **Fase 8** del roadmap (`specs/roadmap.md`) planifica iconografía y banderas optimizadas para el selector y las fichas de destino. Tras completar la Fase 7.5 (LHCI activo en CI), es el momento de añadir identidad visual sin regresión de LCP/CLS: los cuatro destinos curados (Madrid, CDMX, Buenos Aires, Londres) y el **referente peruano** en la comparación poblacional siguen mostrando solo texto, lo que dificulta escaneo rápido y coherencia con la misión («referente peruano primero»).

## What Changes

- Añadir capability **`destination-visuals`**: banderas de país por destino curado **y bandera de Perú** como referente en comparación poblacional, assets optimizados en build estático y `alt` en español.
- Extender el modelo de datos con código ISO de país (p. ej. `countryCode`) para mapear banderas de forma estable.
- Mostrar bandera en la cabecera de la ficha (`ComparisonLayout`), en el selector de destinos (`DestinationSelect`) y junto a **Perú** en el widget de comparación (`PopulationComparison` / `PopulationBarRow`).
- Incorporar SVGs (o pipeline `astro:assets` si se usan raster) bajo `src/assets/flags/` con dimensiones fijas y `loading`/`decoding` adecuados.
- Actualizar `specs/roadmap.md`: marcar Fase 8 completada al archivar.
- Registrar prefijo **`DV`** en `specs/sdd-conventions.md` para la nueva capability.

## Capabilities

### New Capabilities

- `destination-visuals`: banderas e iconografía de destinos curados, optimización de imágenes, accesibilidad (`alt`) y coherencia visual en selector y ficha.

### Modified Capabilities

- `project-constitution`: actualizar estado de Fase 8 en `specs/roadmap.md` al archivar este cambio (escenario PCO-13).

## Impact

- **Datos:** `src/data/destinations.json` (+ `countryCode` por destino); validación en `src/lib/population.ts`.
- **UI:** `ComparisonLayout.astro`, `DestinationSelect.astro`; nuevo componente `DestinationFlag.astro` (o equivalente).
- **Assets:** `src/assets/flags/*.svg` (PE, ES, MX, AR, GB).
- **UI adicional:** `PopulationComparison.astro`, `PopulationBarRow.astro` (bandera `PE` en fila país Perú).
- **Tests:** unitarios en `src/lib/` (validación + helper de banderas), estáticos post-build, E2E Playwright con `// @spec DV-*`.
- **Performance:** documentar `## Performance impact` en `design.md`; job `lighthouse` en CI MUST seguir en verde (LCP ≤ 2.5 s, CLS ≤ 0.1).
- **Gates:** `pnpm test:verify` y LHCI antes de archivar.
- **Roadmap:** Fase 8 pasa a ✅ completada al archivar.
