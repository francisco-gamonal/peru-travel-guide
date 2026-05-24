## 1. Datos y assets

- [x] 1.1 Añadir `countryCode` (ES, MX, AR, GB) a cada entrada en `src/data/destinations.json`
- [x] 1.2 Extender tipo `Destination` y validación en `src/lib/population.ts` para `countryCode`
- [x] 1.3 Añadir SVGs de bandera en `src/assets/flags/` (pe, es, mx, ar, gb)
- [x] 1.4 Implementar `src/lib/flags.ts` con `getFlagAsset(countryCode)` incluyendo `PE` y tests `// @spec DV-01`

## 2. UI

- [x] 2.1 Crear `src/components/DestinationFlag.astro` (alt en español, dimensiones fijas)
- [x] 2.2 Mostrar bandera en cabecera de `ComparisonLayout.astro`
- [x] 2.3 Reemplazar `DestinationSelect.astro` por selector accesible con banderas (lista/botones)
- [x] 2.4 Extender `PopulationBarItem` y `buildPopulationComparisonView` con `countryCode` (PE + destino) `// @spec DV-07`
- [x] 2.5 Mostrar banderas en `PopulationBarRow.astro` (Perú y país destino en «Por país»)
- [x] 2.6 Verificar navegación a `/destino/<id>/` sin regresión de rutas estáticas

## 3. Tests y SDD

- [x] 3.1 Tests de validación `countryCode` con `// @spec DV-02` en `population.validation.test.ts`
- [x] 3.2 Test unitario de vista comparación con `countryCode` PE `// @spec DV-07` en `population.test.ts`
- [x] 3.3 Ampliar `static-destinations.test.ts` para banderas destino y Perú (`// @spec DV-04`, `// @spec DV-08`)
- [x] 3.4 E2E en `e2e/destinations.spec.ts` — cambio de destino con banderas (`// @spec DV-05`)
- [x] 3.5 Registrar prefijo `DV` en tabla de `specs/sdd-conventions.md`
- [x] 3.6 Marcar review checklist en `design.md` antes de apply

## 4. Roadmap, changelog y cierre

- [x] 4.1 Actualizar `specs/roadmap.md`: Fase 8 ✅ completada; entregables mencionan bandera de Perú en comparación poblacional
- [x] 4.2 Ejecutar `pnpm test:verify` y `ASTRO_BASE=/peru-travel-guide/ pnpm lhci` (`// @spec DV-06`)
- [x] 4.3 `pnpm changelog:generate` y `openspec validate add-destination-visual-assets`
- [x] 4.4 Archivar cambio; sync `destination-visuals` `1.0.0` y `project-constitution` (PCO-13)
