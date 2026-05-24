# Roadmap

> Fases ordenadas. Criterio de salida verificable por fase.

> **Calidad transversal:** Todo cambio OpenSpec con código en `src/` debe cumplir `specs/tech-stack.md` (Vitest, cobertura ≥ 80 % en `src/lib/`, E2E Playwright post-`build`) antes de archivar. Ver capability `test-harness` tras el cambio `add-testing-practices`.

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

## Fase 5 — Production 🔄 (siguiente)

**Entregables:** Deploy en Vercel o Netlify; dominio (opcional); comprobación básica de rendimiento.

**Criterio de salida:** URL pública accesible; build reproducible en CI.
