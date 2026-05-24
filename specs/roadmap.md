# Roadmap

> Fases ordenadas. Criterio de salida verificable por fase.

> **Calidad transversal:** Todo cambio OpenSpec con código en `src/` debe cumplir `specs/tech-stack.md` (Vitest, cobertura ≥ 80 % en `src/lib/`, E2E Playwright post-`build`) antes de archivar. Ver capability `test-harness` tras el cambio `add-testing-practices`.
>
> **Post-Fase 6 (SDD Governance):** Cada fase nueva se implementa con un cambio OpenSpec dedicado, siguiendo `specs/sdd-conventions.md` (Scenario IDs, `## Test traceability` en `design.md`, `// @spec <ID>` en tests, `breaking:` en `.openspec.yaml`, review checklist antes de `/opsx:apply`).

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

## Fase 8 — Iconos y banderas con imágenes optimizadas ⬜ Pendiente

**Entregables:** Selector de destinos y fichas usan **iconos** y **banderas** con **optimización de imágenes** en build estático (p. ej. `Image` de Astro, formatos modernos, dimensiones fijas, `loading`/`decoding` adecuados).

**Criterio de salida:** Destinos curados muestran bandera/iconografía acordada sin regresión de contenido textual; `pnpm test:verify` en verde; `## Performance impact` en `design.md` según `specs/sdd-conventions.md`; cambio OpenSpec archivado con convenciones SDD.

**OpenSpec:** Cambio `add-destination-visual-assets` (implementación futura). Capability sugerida: `destination-visuals`.

**Notas técnicas:** Preferir SVG o pipeline Astro; `alt` en español.

**Dependencia sugerida:** Tras Fase 7, o en paralelo si se unifican assets para todos los destinos.

**Estado:** Pendiente.
