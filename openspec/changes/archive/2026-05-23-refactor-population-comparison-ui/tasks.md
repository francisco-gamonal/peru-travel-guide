## 1. Lógica de vista agrupada

- [x] 1.1 Añadir tipos `PopulationComparisonView`, `PopulationPairRow` en `src/types/population.ts` (o archivo dedicado si se prefiere)
- [x] 1.2 Implementar `buildPopulationComparisonView(destination, references)` en `src/lib/population.ts`
- [x] 1.3 Tests unitarios: país = Perú vs país destino; ciudad = Lima vs ciudad destino; distritos listados; `collectSourcesFooter` sin duplicados

## 2. Widget UI

- [x] 2.1 Reescribir `PopulationComparison.astro` como widget único: encabezado, subsección «Por país», subsección «Por ciudad» + distritos compactos
- [x] 2.2 Barras horizontales comparativas por par (escala común por subsección) con `barWidthPercent` / `formatPopulation`
- [x] 2.3 Pie de fuentes agrupado (sin `SourceAttribution` por fila); mantener `#comparison-heading` para E2E

## 3. Regresión y calidad

- [x] 3.1 Revisar/ajustar `e2e/destinations.spec.ts` y `static-destinations.test.ts` si cambia estructura HTML
- [x] 3.2 Verificar cobertura ≥ 80 % en `src/lib/` tras nuevos helpers
- [x] 3.3 Ejecutar `pnpm test:verify`

## 4. Cierre OpenSpec

- [x] 4.1 _(Opcional)_ Añadir principio de densidad legible en `specs/mission.md` (una línea)
- [x] 4.2 Ejecutar `openspec validate refactor-population-comparison-ui`
