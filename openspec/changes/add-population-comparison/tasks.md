## 1. Datos y tipos

- [x] 1.1 Crear `src/types/population.ts` con tipos `PopulationPlace`, `PeruReference`, `Destination` y metadatos `source` / `year`
- [x] 1.2 Crear `src/data/peru-references.json` con Perú, provincia de Lima y al menos 2 distritos (INEI; documentar URLs en comentario o README)
- [x] 1.3 Crear `src/data/destinations.json` con al menos Madrid (ciudad + país); opcional: 1–2 destinos extra
- [x] 1.4 Validar en build que los JSON cumplen los tipos (import + aserción o función `loadPopulationData`)

## 2. Lógica de comparación

- [x] 2.1 Implementar `src/lib/population.ts`: `formatPopulation`, `computeRatio`, `getDestinationById`, manejo de id inválido
- [x] 2.2 Añadir prueba manual o comentario de verificación con cifras de Madrid vs Lima

## 3. UI (Astro)

- [x] 3.1 Crear `src/components/DestinationSelect.astro` (selector de destinos curados)
- [x] 3.2 Crear `src/components/PopulationComparison.astro` (tarjetas, barras proporcionales, frase relativa vs Lima)
- [x] 3.3 Crear `src/components/SourceAttribution.astro` (fuente y año por cifra o bloque)
- [x] 3.4 Actualizar `src/pages/index.astro`: integrar selector + comparación; quitar copy «Fase 1 / en construcción»

## 4. Verificación

- [x] 4.1 Ejecutar `pnpm build` y `pnpm lint` sin errores
- [x] 4.2 Verificar en `pnpm dev` el destino de prueba (Madrid): ciudad y país vs referentes peruanos
- [x] 4.3 Ejecutar `openspec validate add-population-comparison`
- [x] 4.4 Comprobar accesibilidad básica (`aria-label` en barras, contraste legible)

## 5. Roadmap

- [x] 5.1 Actualizar `specs/roadmap.md`: marcar Fase 2 en curso durante apply; completada al archivar este cambio
