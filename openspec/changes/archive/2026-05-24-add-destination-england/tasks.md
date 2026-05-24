## 1. Metadatos y datos

- [x] 1.1 Añadir `breaking: false` en `.openspec.yaml`
- [x] 1.2 Añadir entrada `london` en `src/data/destinations.json` (Londres, Reino Unido, población ciudad/país, fuentes ONS, año)
- [x] 1.3 Añadir entrada `london` en `src/data/climate.json` (resumen, seasons, bestTimeToVisit, source)
- [x] 1.4 Añadir entrada `london` en `src/data/culture.json` (summary, ≥3 tips, source)

## 2. Tests unitarios y validación

- [x] 2.1 Extender `population.validation.test.ts` y/o `population.test.ts` con `// @spec PC-15`
- [x] 2.2 Extender `climate.validation.test.ts` con `// @spec DC-09`
- [x] 2.3 Extender `culture.validation.test.ts` con `// @spec CU-08`

## 3. Tests estáticos y E2E

- [x] 3.1 Añadir caso Londres en `src/test/static-destinations.test.ts` (HTML post-build)
- [x] 3.2 Añadir `london` a la lista de destinos en `e2e/destinations.spec.ts` con snippets de clima y cultura; comentarios `// @spec PC-16`, `DC-10`, `CU-09`

## 4. Verificación y roadmap

- [x] 4.1 Ejecutar `pnpm test:verify`
- [x] 4.2 Ejecutar `openspec validate add-destination-england`
- [x] 4.3 Marcar Review checklist en `design.md` antes de archivar
- [x] 4.4 Actualizar `specs/roadmap.md`: Fase 7 completada al archivar
