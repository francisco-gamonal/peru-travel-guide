## 1. Vista y lógica en `src/lib`

- [x] 1.1 Añadir tipos `ClimateWidgetView`, `ClimateSeasonRow`, `ClimateBestTimeRow` en `src/types/climate.ts` (o junto a `climate.ts` según convención del repo)
- [x] 1.2 Implementar `buildClimateWidgetView(climate)` en `src/lib/climate.ts` usando `formatMonthRange` para cada ventana
- [x] 1.3 Añadir tests unitarios en `src/lib/climate.test.ts` para el helper (meses formateados, filas de estaciones y mejores épocas)

## 2. Widget único en UI

- [x] 2.1 Reescribir `ClimateAndSeasons.astro`: un `<article>` con encabezado (resumen + disclaimer), subsección estaciones (tabla o lista densa), subsección mejores épocas y pie de fuente agrupado
- [x] 2.2 Mantener `section[aria-labelledby="climate-heading"]` y estado vacío en un solo bloque (sin tres tarjetas)
- [x] 2.3 Eliminar o integrar `SourceAttribution` suelto fuera del article (fuente solo en footer del widget)

## 3. Pruebas y verificación

- [x] 3.1 Revisar `e2e/destinations.spec.ts`: confirmar snippets climáticos y selector `section[aria-labelledby="climate-heading"]`; ajustar solo si cambia el DOM
- [x] 3.2 Actualizar prueba estática de destinos si aplica (HTML de `/destino/madrid/`)
- [x] 3.3 Ejecutar `pnpm build && pnpm lint && pnpm test:coverage && pnpm test:e2e`
- [x] 3.4 Ejecutar `openspec validate refactor-destination-climate-ui`
