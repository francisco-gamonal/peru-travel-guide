## Why

La Fase 0 (Foundation) está completada: constitución, OpenSpec y política de idioma están definidos, pero no existe código de aplicación. Sin un scaffold Astro alineado con `specs/tech-stack.md`, no se puede avanzar a la Fase 2 (comparación poblacional).

## What Changes

- Inicializar proyecto **Astro 6** en la raíz del repositorio (conviviendo con `specs/` y `openspec/`).
- Configurar **TypeScript** (`strict`), **Tailwind CSS 4** (`@tailwindcss/vite`) y **pnpm** con versiones verificadas en npm.
- Añadir lint mínimo (ESLint) y scripts `dev` / `build` / `preview`.
- Crear `README.md` de desarrollo con requisitos de Node.js y comandos.
- Página de inicio placeholder que refleje la misión (guía de viaje Perú/Lima vs destino) sin implementar features de producto.
- Actualizar `specs/roadmap.md`: Fase 0 completada; Fase 1 en curso vía este cambio.

## Capabilities

### New Capabilities

- `astro-app-scaffold`: Estructura base del proyecto Astro lista para desarrollo y build de producción según Fase 1 del roadmap.

### Modified Capabilities

<!-- Ninguna en openspec/specs/ -->

## Impact

- Nuevos archivos: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`, `public/`, configuración Tailwind/ESLint, `README.md`.
- Directorios existentes preservados: `specs/`, `openspec/`, `.cursor/`, `.claude/`.
- Sin APIs de población, clima ni cultura (Fases 2–4).
