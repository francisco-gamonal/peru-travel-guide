## 1. Datos curados

- [x] 1.1 Añadir `paris`, `tokyo`, `new-york` en `src/data/destinations.json` (`countryCode` FR/JP/US, población, fuentes, año)
- [x] 1.2 Añadir entradas climáticas en `src/data/climate.json` para los tres `destinationId`
- [x] 1.3 Añadir entradas culturales en `src/data/culture.json` (summary, ≥3 tips, source)

## 2. Assets visuales

- [x] 2.1 Añadir `src/assets/flags/fr.svg`, `jp.svg`, `us.svg`
- [x] 2.2 Extender `src/lib/flags.ts` si el mapa requiere registro explícito de códigos nuevos

## 3. Tests unitarios

- [x] 3.1 `population.validation.test.ts` con `// @spec PC-17`
- [x] 3.2 `climate.validation.test.ts` con `// @spec DC-11`
- [x] 3.3 `culture.validation.test.ts` con `// @spec CU-10`
- [x] 3.4 `flags.test.ts` con `// @spec DV-09`

## 4. Tests estáticos y E2E

- [x] 4.1 Caso París (u otro) en `src/test/static-destinations.test.ts` con `// @spec DV-10`
- [x] 4.2 Ampliar array `destinations` en `e2e/destinations.spec.ts` con paris, tokyo, new-york
- [x] 4.3 Tests E2E con `// @spec PC-18`, `PC-19`, `PC-20`, `DC-12`–`DC-14`, `CU-11`–`CU-13`, `DV-11`

## 5. Verificación, review gate y cierre

- [x] 5.1 Ejecutar `pnpm test:verify`
- [x] 5.2 Verificar job `lighthouse` / `pnpm lhci` sin regresión LCP/CLS
- [x] 5.3 `openspec validate add-curated-destinations-paris-tokyo-nyc`
- [x] 5.4 Completar Review checklist en `design.md`; `reviewStatus: approved` antes de apply (o confirmación explícita)
- [x] 5.5 `pnpm spec:review-gate` y `pnpm spec:traceability` antes de archivar
- [x] 5.6 Actualizar `specs/roadmap.md`: Fase 10 ✅ (PCO-17); archivar; sync specs; `pnpm changelog:generate`
