## 1. Datos y lógica

- [x] 1.1 Crear `src/data/culture.json` con entradas para `madrid`, `cdmx` y `buenos-aires` (summary, tips[], source, year, sourceUrl)
- [x] 1.2 Añadir tipos en `src/types/culture.ts` y `src/lib/culture.ts` (`loadCultureData`, `getCultureByDestinationId`, `buildCultureWidgetView`)
- [x] 1.3 Añadir `culture.validation.test.ts` y tests unitarios en `culture.test.ts` (cobertura ≥ 80 % en el alcance de `src/lib/culture.ts`)

## 2. UI e integración

- [x] 2.1 Crear `CultureGuide.astro` (widget único, `section[aria-labelledby="culture-heading"]`, estado vacío)
- [x] 2.2 Integrar en `ComparisonLayout.astro` debajo de clima; pasar `culture` desde `pages/destino/[id].astro` en `getStaticPaths`
- [x] 2.3 Quitar pie «Próximamente: cultura»; actualizar copy de cabecera, `<title>` y `meta description`

## 3. Pruebas y cierre

- [x] 3.1 Ampliar `e2e/destinations.spec.ts` y `static-destinations.test.ts` (sección cultura, coherencia al cambiar destino)
- [x] 3.2 Ejecutar `pnpm test:verify`
- [x] 3.3 Actualizar `specs/roadmap.md` (Fase 4 completada) al archivar
- [x] 3.4 Ejecutar `openspec validate add-destination-culture`
