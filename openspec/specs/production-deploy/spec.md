---
version: "1.0.0"
capability: production-deploy
---

# production-deploy Specification

## Purpose
Despliegue continuo del sitio estático en GitHub Pages con CI en GitHub Actions.

## Requirements

### Requirement: Repositorio remoto en GitHub

El proyecto MUST publicarse en un repositorio de GitHub con nombre **`peru-travel-guide`**, con el código fuente actual y historial Git, y un remote `origin` configurado para colaboración y CI.

#### Scenario: Remote configurado

- **WHEN** un desarrollador clona el repositorio desde GitHub
- **THEN** puede instalar dependencias con `pnpm install` y ejecutar `pnpm test:verify` según `README.md`

#### Scenario: Nombre estándar del repositorio

- **WHEN** se consulta la URL del repositorio en GitHub
- **THEN** el slug del repositorio es `peru-travel-guide` (no nombres de carpeta local como `test` o `astro`)

### Requirement: CI en GitHub Actions

El repositorio MUST incluir un workflow de GitHub Actions que ejecute `pnpm test:verify` en cada `pull_request` y en cada `push` a la rama principal (`master` o `main`), usando Node.js ≥ 22.12 y pnpm 10.33.4 alineado a `package.json`.

#### Scenario: Pipeline de verificación en PR

- **WHEN** se abre o actualiza un pull request
- **THEN** el workflow de CI se ejecuta y falla si cualquier paso de `pnpm test:verify` falla

#### Scenario: Playwright en CI

- **WHEN** el workflow de CI corre en GitHub Actions
- **THEN** instala el navegador Chromium de Playwright antes de E2E y ejecuta las pruebas contra el build estático

### Requirement: Despliegue automático a GitHub Pages

El repositorio MUST incluir un workflow de GitHub Actions que, tras un push exitoso a la rama principal, construya el sitio con `pnpm build` y publique el artefacto estático en **GitHub Pages**.

#### Scenario: Sitio accesible públicamente

- **WHEN** el workflow de deploy termina con éxito en la rama principal
- **THEN** el sitio es accesible en una URL `https://<owner>.github.io/peru-travel-guide/` (project site)

#### Scenario: Build estático reproducible

- **WHEN** el workflow de deploy ejecuta el build
- **THEN** usa `pnpm install --frozen-lockfile` y `pnpm build` sin pasos manuales adicionales

### Requirement: Configuración Astro para GitHub Pages

La configuración de Astro MUST declarar `site` y `base` compatibles con el project site de GitHub Pages en `/peru-travel-guide/`, de modo que rutas y assets resuelvan correctamente en producción.

#### Scenario: Rutas de destino en producción

- **WHEN** un usuario visita la URL pública de un destino curado (p. ej. `/destino/madrid/`)
- **THEN** la página carga comparación poblacional, clima y cultura sin errores 404 de assets

### Requirement: Documentación de producción

`README.md` MUST documentar la URL pública de GitHub Pages, el nombre del repositorio, el estado del workflow de CI (badge opcional) y que la verificación completa en servidor es `pnpm test:verify`.

#### Scenario: Onboarding con URL pública

- **WHEN** un visitante lee `README.md` en GitHub
- **THEN** encuentra el enlace al sitio desplegado y los requisitos para contribuir
