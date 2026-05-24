## 1. Constitución y OpenSpec

- [x] 1.1 Actualizar `specs/tech-stack.md`: sección «Pruebas y calidad» (Vitest, Playwright, 80 % en `src/lib/`, comandos de verificación)
- [x] 1.2 Refinar `openspec/config.yaml`: contexto de testing + reglas en `proposal`, `design`, `specs`, `tasks` para propuestas futuras
- [x] 1.3 Añadir nota transversal en `specs/roadmap.md` (prácticas de test obligatorias antes de archivar cambios con código)

## 2. Harness unitario (Vitest)

- [x] 2.1 Añadir `vitest`, `@vitest/coverage-v8` y `vitest.config.ts` con umbral ≥ 80 % en `src/lib/**`
- [x] 2.2 Crear tests unitarios para `src/lib/population.ts` (`formatPopulation`, `computeRatio`, `ratioLabel`, `loadPopulationData`, `getDestinationById`)
- [x] 2.3 Añadir scripts `test`, `test:watch`, `test:coverage` en `package.json`

## 3. Harness E2E (Playwright)

- [x] 3.1 Añadir `@playwright/test`, `playwright.config.ts` con `webServer` (`pnpm preview` tras build)
- [x] 3.2 Crear `e2e/destinations.spec.ts`: Madrid, CDMX, Buenos Aires y regresión CDMX ≠ Madrid
- [x] 3.3 Añadir script `test:e2e` en `package.json`

## 4. Documentación y verificación

- [x] 4.1 Actualizar `README.md` con sección de tests y gate recomendado
- [x] 4.2 Ejecutar `pnpm build && pnpm lint && pnpm test:coverage && pnpm test:static` sin errores (`pnpm test:e2e` en local tras `playwright install chromium`)
- [x] 4.3 Ejecutar `openspec validate add-testing-practices`

## 5. Cierre

- [x] 5.1 Verificar que `openspec list` sigue vacío de cambios activos salvo este hasta archivar
