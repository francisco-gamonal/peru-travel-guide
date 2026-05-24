# Roadmap

> Fases ordenadas. Criterio de salida verificable por fase.

> **Calidad transversal:** Todo cambio OpenSpec con código en `src/` debe cumplir `specs/tech-stack.md` (Vitest, cobertura ≥ 80 % en `src/lib/`, E2E Playwright post-`build`) antes de archivar. Ver capability `test-harness` tras el cambio `add-testing-practices`.
>
> **Post-Fase 6 (SDD Governance):** Cada fase nueva se implementa con un cambio OpenSpec dedicado, siguiendo `specs/sdd-conventions.md` (Scenario IDs, `## Test traceability` en `design.md`, `// @spec <ID>` en tests, `breaking:` en `.openspec.yaml`, review checklist antes de `/opsx:apply`).
>
> **Post-Fase 8 (backlog planificado):** Orden sugerido **Fase 9 → 9.5 (SDD) → 10–12 (producto) → 13 (retroadaptación SDD)**. Brechas residuales del análisis SDD (canvas, mayo 2026): review gate en skills (#3), INP en CI (#4), trazabilidad legacy; gaps de producto vs `specs/mission.md`: home, más destinos, entrada libre de ciudad.

## Fase 0 — Foundation ✅ Completada

**Entregables:** OpenSpec, política de idioma, constitución (`specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md`).

**Criterio de salida:** Constitución validada; `openspec/config.yaml` referencia los tres archivos; cambio `add-project-constitution` archivado.

**Estado:** Completada (2026-05-23).

---

## Fase 1 — Scaffold ✅ Completada

**Entregables:** Proyecto Astro 6 con TypeScript strict, Tailwind 4, pnpm; lint mínimo; README de desarrollo.

**Criterio de salida:** `pnpm dev` arranca sin errores; build de producción exitoso.

**OpenSpec:** Cambio `scaffold-astro-project` archivado (`openspec/changes/archive/2026-05-23-scaffold-astro-project/`). Capability `astro-app-scaffold` en `openspec/specs/`.

**Estado:** Completada (2026-05-23).

---

## Fase 2 — Comparación poblacional (MVP) ✅ Completada

**Entregables:** Flujo: usuario indica ciudad/país destino → comparación con Perú, Lima y distritos relevantes; visualización clara de habitantes.

**Criterio de salida:** Al menos un destino internacional de prueba con datos de población mostrados y contrastados con el referente peruano.

**OpenSpec:** Cambio `add-population-comparison` archivado (`openspec/changes/archive/2026-05-24-add-population-comparison/`). Capability `population-comparison` en `openspec/specs/`.

**Estado:** Completada (2026-05-24).

---

## Fase 3 — Clima y mejores épocas ✅ Completada

**Entregables:** Ficha de destino con resumen climático y ventanas recomendadas para viajar.

**Criterio de salida:** Misma ciudad de prueba de Fase 2 muestra clima y épocas junto a la comparación poblacional.

**OpenSpec:** Cambio `add-destination-climate` archivado (`openspec/changes/archive/2026-05-24-add-destination-climate/`). Capability `destination-climate` en `openspec/specs/`.

**Estado:** Completada (2026-05-24).

---

## Fase 4 — Cultura y guía personal ✅ Completada

**Entregables:** Bloque cultural práctico para el viajero; experiencia unificada (población + clima + cultura + épocas).

**Criterio de salida:** Usuario percibe la página como guía personal, no como panel de datos sueltos.

**OpenSpec:** Cambio `add-destination-culture` archivado (`openspec/changes/archive/2026-05-24-add-destination-culture/`). Capability `destination-culture` en `openspec/specs/`.

**Estado:** Completada (2026-05-24).

---

## Fase 5 — Production ✅ Completada

**Entregables:** Deploy en GitHub Pages vía GitHub Actions; CI con `pnpm test:verify`; repositorio público `peru-travel-guide`.

**Criterio de salida:** URL pública accesible; build reproducible en CI.

**OpenSpec:** Cambio `setup-github-production` (archivar tras implementación). Capability `production-deploy` en `openspec/specs/`.

**Sitio:** [francisco-gamonal.github.io/peru-travel-guide/](https://francisco-gamonal.github.io/peru-travel-guide/)

**Estado:** Completada (2026-05-24).

---

## Fase 6 — SDD Governance ✅ Completada

**Entregables:** `specs/sdd-conventions.md`; `openspec/config.yaml` con contexto ampliado; script `pnpm changelog:generate`; cabeceras `version:` en capabilities; capability `sdd-governance`; convenciones de Scenario IDs, review gate y breaking changes.

**Criterio de salida:** El primer feature post-Fase 6 usa Scenario IDs en delta specs, `## Test traceability` en `design.md` y `// @spec <ID>` en tests; cambio `enhance-sdd-governance` archivado.

**OpenSpec:** Cambio `enhance-sdd-governance`. Capability `sdd-governance` en `openspec/specs/`.

**Estado:** Completada (2026-05-24).

---

## Fase 7 — Destino Inglaterra (Londres) ✅ Completada

**Entregables:** Destino curado `london` (Londres, Reino Unido) con población, clima, cultura y épocas; ruta `/destino/london/`; selector actualizado.

**Criterio de salida:** `pnpm test:verify` en verde; cambio `add-destination-england` archivado con Scenario IDs y trazabilidad en tests.

**OpenSpec:** Cambio `add-destination-england` archivado (`openspec/changes/archive/2026-05-24-add-destination-england/`). Capabilities `population-comparison`, `destination-climate`, `destination-culture` en `1.1.0`.

**Estado:** Completada (2026-05-24).

---

## Fase 7.5 — SDD Executable Governance ✅ Completada

**Entregables:** Capability `performance-budget` con LHCI en CI; hook `pre-commit` con `openspec validate` condicional; script `pnpm spec:traceability` integrado en `test:verify:push` y CI; `scripts/run-lhci.mjs` (Chromium Playwright en WSL).

**Criterio de salida:** Job `lighthouse` en verde en CI; `pnpm spec:traceability` pasa con cambio activo; brechas del canvas (LHCI, validate, trazabilidad ejecutable) cerradas; cambio `enhance-sdd-executable-governance` archivado.

**OpenSpec:** Cambio `enhance-sdd-executable-governance` archivado. Capabilities `performance-budget` (nueva, `1.0.0`), `sdd-governance`, `test-harness`, `project-constitution` (bumps MINOR).

**Estado:** Completada (2026-05-24).

---

## Fase 8 — Iconos y banderas con imágenes optimizadas ✅ Completada

**Entregables:** Selector de destinos y fichas con **banderas** optimizadas (SVG en build estático); **bandera de Perú** en la comparación poblacional «Por país»; campo `countryCode` en destinos curados; componente `DestinationFlag.astro`.

**Criterio de salida:** `pnpm test:verify` en verde; job `lighthouse` sin regresión LCP/CLS; cambio `add-destination-visual-assets` archivado con convenciones SDD (`DV-*`, trazabilidad).

**OpenSpec:** Cambio `add-destination-visual-assets` archivado (`openspec/changes/archive/2026-05-24-add-destination-visual-assets/`). Capability `destination-visuals` en `openspec/specs/` (`1.0.0`).

**Notas técnicas:** SVG importados desde `src/assets/flags/`; `alt` en español; selector accesible con `role="listbox"`.

**Estado:** Completada (2026-05-24).

---

## Fase 9 — SDD Review gate en skills ✅ Completada

**Entregables:** Campo `reviewStatus` (`pending-review` | `approved`) en `.openspec.yaml`; script `pnpm spec:review-gate`; skills/comandos `continue` y `apply` actualizados (Cursor + Claude); documentación en `specs/sdd-conventions.md`.

**Criterio de salida:** Flujo documentado y probado; `pnpm spec:review-gate` y tests en verde; cambio `enhance-sdd-review-gate` archivado; cierra recomendación canvas SDD #3.

**OpenSpec:** Cambio `enhance-sdd-review-gate` archivado (`openspec/changes/archive/2026-05-24-enhance-sdd-review-gate/`). Capabilities `sdd-governance` (`1.2.0`), `test-harness` (`1.2.0`), `project-constitution` (`1.6.0`, PCO-15).

**Estado:** Completada (2026-05-24).

---

## Fase 9.5 — SDD INP en CI ✅ Completada

**Entregables:** Spike LHCI documentado en `design.md`; excepción INP manual en `specs/sdd-conventions.md` y escenario **PB-07** en `performance-budget`; test `lighthouse-config.test.ts` con trazabilidad PB-07.

**Criterio de salida:** Spike confirmó que INP no es fiable en LHCI headless sobre rutas estáticas; excepción documentada (Rama B); cambio `enhance-performance-inp-ci` archivado; cierra recomendación canvas SDD #4.

**OpenSpec:** Cambio `enhance-performance-inp-ci` archivado (`openspec/changes/archive/2026-05-24-enhance-performance-inp-ci/`). Capability `performance-budget` (`1.1.0`, PB-06/PB-07), `project-constitution` (`1.7.0`, PCO-16).

**Estado:** Completada (2026-05-24).

---

## Fase 10 — Destinos curados París, Tokio, Nueva York ⬜ Pendiente

**Entregables:** Tres destinos curados (`paris`, `tokyo`, `new-york`) con población, clima, cultura y épocas; banderas `FR`, `JP`, `US`; rutas `/destino/paris/`, `/destino/tokyo/`, `/destino/new-york/`; selector actualizado.

**Criterio de salida:** `pnpm test:verify` en verde; job `lighthouse` sin regresión; cambio `add-curated-destinations-paris-tokyo-nyc` archivado con Scenario IDs y trazabilidad.

**OpenSpec:** Cambio propuesto `add-curated-destinations-paris-tokyo-nyc`. Reutiliza patrón Fase 7 + banderas Fase 8.

**Estado:** Pendiente.

---

## Fase 11 — Landing / home de guía ⬜ Pendiente

**Entregables:** Página `/` con propósito claro (guía personal, referente peruano); enlaces a destinos curados con banderas; sin depender solo de redirect a un destino por defecto.

**Criterio de salida:** E2E de home en verde; `pnpm test:verify`; cambio `add-travel-guide-home` archivado; `## Performance impact` en `design.md`.

**OpenSpec:** Cambio propuesto `add-travel-guide-home`.

**Dependencia sugerida:** Tras Fase 10 (más destinos enlazables desde home).

**Estado:** Pendiente.

---

## Fase 12 — Entrada libre de ciudad ⬜ Pendiente

**Entregables:** UX de búsqueda o input para indicar ciudad/país destino; validación de entrada; cierre parcial del gap vs `specs/mission.md` (MVP acotado en el cambio de implementación).

**Criterio de salida:** Flujo E2E demostrable; `pnpm test:verify`; cambio `add-destination-search` archivado.

**OpenSpec:** Cambio propuesto `add-destination-search`.

**Dependencia sugerida:** Tras Fase 11; mayor complejidad que destinos curados.

**Estado:** Pendiente.

---

## Fase 13 — SDD Retroadaptación Scenario IDs legacy ⬜ Pendiente (deuda técnica opcional)

**Entregables:** Identificadores `**ID:**` en escenarios legacy de `openspec/specs/` pre-Fase 6 (~15 escenarios sin ID en capabilities como `population-comparison`, `destination-climate`, etc.); sin modificar `openspec/changes/archive/`.

**Criterio de salida:** Specs principales con IDs coherentes con prefijos de `specs/sdd-conventions.md`; cambio `retroadapt-legacy-scenario-ids` archivado. Excepción planificada a la política «no retroadaptar» de `specs/sdd-conventions.md`.

**OpenSpec:** Cambio propuesto `retroadapt-legacy-scenario-ids`.

**Dependencia sugerida:** Al final del ciclo (después de Fases 10–12); prioridad baja, no bloquea producto.

**Estado:** Pendiente (opcional).
