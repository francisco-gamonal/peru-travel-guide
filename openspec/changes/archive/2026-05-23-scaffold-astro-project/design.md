## Context

El repositorio contiene gobernanza OpenSpec y constitución en `specs/`, pero no `package.json`. `specs/roadmap.md` define la Fase 1 — Scaffold con criterio de salida: `pnpm dev` sin errores y build de producción exitoso. `specs/tech-stack.md` fija Astro 6.x, TypeScript 6.x, Tailwind 4.x, pnpm 11.x y Node `>=22.12.0`.

## Goals / Non-Goals

**Goals:**

- Proyecto Astro funcional en la raíz, respetando misión y stack de la constitución.
- Versiones pinneadas tras `npm view` en el momento del apply.
- README con instrucciones para desarrolladores.
- Home placeholder en español (UI) con términos técnicos en inglés donde aplique.

**Non-Goals:**

- Comparación poblacional, clima, cultura (Fases 2–4).
- Integración con INEI u otras APIs de datos.
- Deploy a Vercel/Netlify (Fase 5).
- Añadir `React` islands sin spec futura.

## Decisions

### 1. Scaffold en la raíz del repo

**Decisión:** Ejecutar `pnpm create astro@latest` en la raíz (modo no interactivo con flags) para no anidar otro subdirectorio `astro/`.

**Rationale:** El workspace ya se llama `astro`; `specs/` y `openspec/` deben permanecer hermanos de `src/`.

**Alternativa descartada:** Subcarpeta `app/` — rompe convención Astro y complica paths.

### 2. Plantilla y opciones de create

**Decisión:** Plantilla minimal o empty; TypeScript strict; Tailwind vía integración oficial Astro + `@tailwindcss/vite`.

**Comando orientativo (apply):**

```bash
pnpm create astro@latest . -- --template minimal --typescript strict --install --no-git --yes
```

(Ajustar flags según CLI disponible en apply; instalar Tailwind tras create si el template no lo incluye.)

### 3. Versiones

**Decisión:** En apply, ejecutar `npm view` para `astro`, `typescript`, `tailwindcss`, `@tailwindcss/vite`, `pnpm` y fijar en `package.json` + campo `packageManager`.

Referencia constitución (2026-05-23): Astro `6.3.7`, TypeScript `6.0.3`, Tailwind `4.3.0`, pnpm `11.2.2`.

### 4. Lint

**Decisión:** ESLint con configuración recomendada por Astro (`eslint-plugin-astro`, `typescript-eslint`) — mínimo viable, sin Prettier obligatorio en v1.

### 5. Placeholder de home

**Decisión:** `src/pages/index.astro` con título y descripción breve alineados a `specs/mission.md` (guía de viaje, comparación Perú/Lima vs destino). Sin formulario de búsqueda aún.

### 6. README

**Decisión:** Secciones: requisitos (`Node.js >=22.12.0`, `pnpm`), instalación, `pnpm dev`, `pnpm build`, estructura de carpetas (`specs/` vs `openspec/specs/`), enlace a constitución.

## Risks / Trade-offs

- **[Riesgo] `create astro` sobrescribe archivos** → Mitigación: no ejecutar en directorio con `src/` existente; listar archivos antes; preservar `specs/` y `openspec/`.
- **[Riesgo] Versiones npm cambian** → Mitigación: verificar en apply y documentar en README.
- **[Trade-off] Scaffold en raíz mezcla config de app y OpenSpec** → Aceptable; README aclara la estructura.

## Migration Plan

1. Verificar versiones npm.
2. Crear proyecto Astro + Tailwind + TypeScript strict.
3. Configurar ESLint y scripts.
4. Placeholder home + README.
5. `pnpm dev` y `pnpm build` como verificación.
6. Marcar Fase 1 progreso en `specs/roadmap.md` al completar apply/archive.

## Open Questions

- ¿Nombre visible del producto en la UI del placeholder (además del repo `astro`)?
