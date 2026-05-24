## Why

La **Fase 5** del roadmap exige URL pública y build reproducible en CI. El código vive solo en Git local sin `remote`; `tech-stack.md` ya prevé CI en GitHub Actions pero el workflow **no existe** en el repo. El producto (Fases 0–4) está listo; falta publicarlo con un nombre de repositorio **estándar y reconocible** (no `test/astro`) y automatizar verificación + despliegue en **GitHub Actions**.

## What Changes

- Crear repositorio remoto en GitHub con nombre propuesto **`peru-travel-guide`** (guía de viaje con referente Perú/Lima; nombre global y descriptivo).
- Configurar `origin` y primer `push` de `master`/`main`.
- Workflow **CI** (`.github/workflows/ci.yml`): en `pull_request` y `push` a rama principal — Node 22+, pnpm 10.33.4, caché, `playwright install chromium`, `pnpm test:verify`.
- Workflow **Deploy** (`.github/workflows/deploy.yml`): en `push` a rama principal — `pnpm build`, publicación en **GitHub Pages** vía `actions/deploy-pages` (sitio estático Astro).
- Ajustar `astro.config.mjs` con `site` y `base` acordes a GitHub Pages (`/peru-travel-guide/` en project site).
- Documentar en `README.md` URL pública, badges de CI y pasos para colaboradores.
- Actualizar `specs/roadmap.md` (Fase 5 completada al archivar).
- **No** incluir dominio custom en v1 (opcional del roadmap); **no** Vercel/Netlify en esta entrega (todo en GitHub).

## Capabilities

### New Capabilities

- `production-deploy`: Repositorio remoto, CI en GitHub Actions, despliegue a GitHub Pages y URL pública verificable.

### Modified Capabilities

- `test-harness`: Requisito explícito de workflow CI que ejecute `pnpm test:verify` en GitHub Actions.
- `astro-app-scaffold`: Configuración de build para hosting estático en subruta de GitHub Pages (si aplica).

## Impact

- `.github/workflows/`, `astro.config.mjs`, `README.md`, `specs/roadmap.md`, posible `package.json` (sin cambiar nombre del paquete npm salvo documentación).
- Operación con `gh` CLI (crear repo, secrets si hicieran falta — Pages usa `GITHUB_TOKEN` por defecto).
- Gates: primer pipeline verde en GitHub; `openspec validate setup-github-production` antes de archivar.
