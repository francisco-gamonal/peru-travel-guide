# Roadmap

> Fases ordenadas. Criterio de salida verificable por fase.

## Fase 0 — Foundation ✅ (en curso)

**Entregables:** OpenSpec, política de idioma, constitución (`specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md`).

**Criterio de salida:** Constitución validada; `openspec/config.yaml` referencia los tres archivos; cambio `add-project-constitution` listo para archivar.

---

## Fase 1 — Scaffold

**Entregables:** Proyecto Astro 6 con TypeScript strict, Tailwind 4, pnpm; lint mínimo; README de desarrollo.

**Criterio de salida:** `pnpm dev` arranca sin errores; build de producción exitoso.

---

## Fase 2 — Comparación poblacional (MVP)

**Entregables:** Flujo: usuario indica ciudad/país destino → comparación con Perú, Lima y distritos relevantes; visualización clara de habitantes.

**Criterio de salida:** Al menos un destino internacional de prueba con datos de población mostrados y contrastados con el referente peruano.

**OpenSpec:** Cambio dedicado (p. ej. `add-population-comparison`).

---

## Fase 3 — Clima y mejores épocas

**Entregables:** Ficha de destino con resumen climático y ventanas recomendadas para viajar.

**Criterio de salida:** Misma ciudad de prueba de Fase 2 muestra clima y épocas junto a la comparación poblacional.

---

## Fase 4 — Cultura y guía personal

**Entregables:** Bloque cultural práctico para el viajero; experiencia unificada (población + clima + cultura + épocas).

**Criterio de salida:** Usuario percibe la página como guía personal, no como panel de datos sueltos.

---

## Fase 5 — Production

**Entregables:** Deploy en Vercel o Netlify; dominio (opcional); comprobación básica de rendimiento.

**Criterio de salida:** URL pública accesible; build reproducible en CI.
