## 1. Datos y tipos

- [x] 1.1 Crear `src/data/climate.json` con entradas para `madrid`, `cdmx`, `buenos-aires` (summary, seasons, bestTimeToVisit, source, year, sourceUrl)
- [x] 1.2 Definir tipos en `src/types/climate.ts` alineados al JSON

## 2. Lógica (`src/lib/climate.ts`)

- [x] 2.1 Implementar `loadClimateData()` y `getClimateByDestinationId(id)`
- [x] 2.2 Añadir tests unitarios y de validación JSON (`climate.test.ts`, `climate.validation.test.ts`) con cobertura ≥ 80 % en `src/lib/climate.ts`

## 3. UI Astro

- [x] 3.1 Crear `ClimateAndSeasons.astro` (resumen, estaciones, mejores épocas, atribución)
- [x] 3.2 Pasar props climáticas en `pages/destino/[id].astro` (`getStaticPaths`)
- [x] 3.3 Integrar en `ComparisonLayout.astro` debajo de población; actualizar pie (quitar «Próximamente: clima»; opcional aviso cultura Fase 4)
- [x] 3.4 Ajustar `<title>` y `meta description` para reflejar guía población + clima

## 4. Pruebas de regresión

- [x] 4.1 Ampliar `src/test/static-destinations.test.ts`: sección clima en HTML de Madrid (y regresión CDMX)
- [x] 4.2 Ampliar `e2e/destinations.spec.ts`: visibilidad de «Clima y mejores épocas» y coherencia al cambiar destino (si aplica al selector)

## 5. Roadmap y verificación

- [x] 5.1 Actualizar `specs/roadmap.md`: Fase 3 en progreso durante apply; criterio de salida verificable
- [x] 5.2 Ejecutar `pnpm test:verify` antes de archivar (E2E)
- [x] 5.3 Ejecutar `openspec validate add-destination-climate`
