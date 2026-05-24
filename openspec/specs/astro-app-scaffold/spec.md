---
version: "1.0.0"
capability: astro-app-scaffold
---

# astro-app-scaffold Specification

## Purpose
TBD - created by archiving change scaffold-astro-project. Update Purpose after archive.

## Requirements

### Requirement: Proyecto Astro en la raíz

El repositorio MUST incluir un proyecto Astro válido en la raíz con `package.json`, `astro.config.mjs` (o equivalente) y directorio `src/`, sin eliminar `specs/` ni `openspec/`.

#### Scenario: Desarrollo local

- **WHEN** el desarrollador ejecuta `pnpm install` y `pnpm dev`
- **THEN** el servidor de desarrollo arranca sin errores fatales

#### Scenario: Build de producción

- **WHEN** el desarrollador ejecuta `pnpm build`
- **THEN** el build completa con código de salida `0`

### Requirement: Build de producción estático

El proyecto MUST generar un sitio estático con `pnpm build` listo para hosting en **GitHub Pages** (project site), con `site` y `base` en `astro.config.mjs` alineados al path `/peru-travel-guide/`.

#### Scenario: Artefacto de build

- **WHEN** se ejecuta `pnpm build` tras configurar `base` para GitHub Pages
- **THEN** el directorio `dist/` contiene HTML y assets con rutas prefijadas correctamente para `/peru-travel-guide/`

#### Scenario: Preview local sigue funcionando

- **WHEN** el desarrollador ejecuta `pnpm preview` o `pnpm test:e2e` en local
- **THEN** el sitio y las pruebas siguen siendo ejecutables sin regresión por la configuración de `base` (usar `base` coherente o documentar comando de preview con base)

### Requirement: Stack alineado con tech-stack

El `package.json` MUST usar **Astro** 6.x, **TypeScript** en modo `strict`, **Tailwind CSS** 4.x integrado vía `@tailwindcss/vite`, y **pnpm** como package manager (campo `packageManager` recomendado).

#### Scenario: Verificación de versiones

- **WHEN** se completa el scaffold
- **THEN** las versiones principales coinciden con `specs/tech-stack.md` o documentan la comprobación `npm view` en el README

#### Scenario: Node.js engines

- **WHEN** se revisa `package.json`
- **THEN** declara `engines.node` compatible con `>=22.12.0` según requisitos de Astro 6

### Requirement: Lint mínimo

El proyecto MUST incluir configuración ESLint ejecutable (script `pnpm lint` o equivalente) que valide archivos Astro y TypeScript principales.

#### Scenario: Ejecutar lint

- **WHEN** el desarrollador ejecuta el script de lint documentado
- **THEN** el comando termina sin errores en el código generado por el scaffold

### Requirement: README de desarrollo

El repositorio MUST incluir `README.md` en la raíz con requisitos de entorno, comandos `install` / `dev` / `build`, y distinción entre `specs/` (constitución) y `openspec/` (workflow OpenSpec).

#### Scenario: Onboarding de desarrollador

- **WHEN** un desarrollador nuevo lee `README.md`
- **THEN** puede arrancar el proyecto sin documentación externa obligatoria

### Requirement: Página de inicio placeholder

`src/pages/index.astro` MUST integrar el flujo de comparación poblacional de la capability `population-comparison`: selector de destino, visualización comparativa y atribución de fuentes. La página MUST mantener copy en español alineado con `specs/mission.md` y MUST NOT limitarse al mensaje estático «en construcción» de la Fase 1.

#### Scenario: Contenido de home

- **WHEN** el usuario abre `/` en `pnpm dev`
- **THEN** ve el propósito del producto y puede usar la comparación poblacional sin navegar a otra ruta

#### Scenario: Coherencia con misión

- **WHEN** el usuario selecciona un destino de prueba
- **THEN** la home muestra contraste con referentes peruanos (Perú, Lima y distritos), no solo texto promocional

### Requirement: Preservación de constitución y OpenSpec

El scaffold MUST NOT borrar ni mover `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md` ni el árbol `openspec/`.

#### Scenario: Archivos de gobernanza intactos

- **WHEN** finaliza el cambio `scaffold-astro-project`
- **THEN** los archivos de constitución y OpenSpec siguen en sus rutas originales
