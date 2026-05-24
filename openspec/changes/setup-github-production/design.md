## Context

- Astro 6 static output; `pnpm test:verify` = build + lint + coverage + static + E2E.
- Husky local: `pre-push` sin E2E; CI es la fuente de verdad con E2E (`specs/tech-stack.md`).
- Sin `.github/workflows/` hoy; sin `git remote`.
- Usuario indica `gh` configurado en su máquina (apply ejecutará `gh repo create` / `push`).

## Goals / Non-Goals

**Goals:**

- Repo GitHub **`peru-travel-guide`** (owner según cuenta `gh`; público por defecto salvo preferencia contraria).
- CI verde en cada PR y en `main`/`master`.
- Deploy automático a GitHub Pages en cada push a rama principal.
- URL pública: `https://<owner>.github.io/peru-travel-guide/` (project site).
- Fase 5 del roadmap marcada completada.

**Non-Goals:**

- Dominio propio, Vercel, Netlify, SSR.
- Monitoreo APM, Lighthouse CI obligatorio (solo comprobación manual opcional en tasks).
- Renombrar carpeta local `test/astro` (solo remote name).

## Decisions

### 1. Nombre del repositorio

**Decisión:** `peru-travel-guide`

| Criterio | Motivo |
|----------|--------|
| Estándar | kebab-case, sin rutas ni stack en el nombre |
| Global | Describe el producto (guía de viaje), no el experimento local |
| Misión | Referente Perú/Lima es el diferenciador |

**Alternativas descartadas:** `astro-travel-guide` (ligado al framework), `test-astro` (entorno local), `travel-guide` (demasiado genérico y ocupado).

### 2. Rama principal

**Decisión:** Usar la rama actual del repo (`master`); en apply renombrar a `main` solo si `gh`/equipo lo exige — preferir no romper historial local sin necesidad.

### 3. CI workflow (`ci.yml`)

**Decisión:**

```yaml
on:
  pull_request:
  push:
    branches: [master, main]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - pnpm/action-setup@v4 (version 10.33.4)
      - actions/setup-node@v4 (node 22, cache pnpm)
      - pnpm install --frozen-lockfile
      - pnpm exec playwright install chromium
      - pnpm test:verify
```

- `permissions: contents: read` suficiente para CI.
- `CI=true` implícito en Actions (Playwright ya lo usa).

### 4. Deploy workflow (`deploy.yml`)

**Decisión:** GitHub Pages con **artifact** + `actions/deploy-pages@v4`:

- Job `build`: `pnpm build` → subir `dist/` como artifact.
- Job `deploy`: `environment: github-pages`, permisos `pages: write`, `id-token: write`.
- Trigger: `push` a `master`/`main` + `workflow_dispatch` opcional.

**Alternativa descartada:** Vercel/Netlify — el usuario pidió deploy en GitHub Actions; Pages encaja con Astro estático sin tokens extra.

### 5. Astro `site` y `base`

**Decisión:** En `astro.config.mjs`:

```js
site: 'https://<OWNER>.github.io',
base: '/peru-travel-guide/',
```

`<OWNER>` documentado en README como placeholder o variable en workflow si se inyecta — en repo fijar comentario + ejemplo; en apply usar owner real del `gh api user`.

Tras deploy, habilitar Pages en repo: **Source = GitHub Actions** (no branch `gh-pages`).

### 6. Creación del repo (`gh`)

**Decisión:** En apply (task documentada):

```bash
gh repo create peru-travel-guide --public --source=. --remote=origin --push
```

Si el repo existe: `git remote add origin` + `push -u origin master`.

Requiere `gh auth login` válido en la máquina del operador.

### 7. Documentación y roadmap

- README: badge CI, URL de Pages, requisitos Node/pnpm.
- `specs/roadmap.md`: Fase 5 ✅ con enlace al repo y workflow.

## Risks / Trade-offs

| Riesgo | Mitigación |
|--------|------------|
| `base` incorrecto → assets rotos en Pages | Probar URL tras primer deploy; E2E con `baseURL` si hace falta en CI |
| E2E lentos en Actions | `workers: 1`, caché pnpm, chromium solo |
| Nombre `peru-travel-guide` ocupado en GitHub | Sufijo `-app` o owner/org; documentar en apply |
| Token `gh` inválido | Verificar `gh auth status` antes de crear repo |

## Migration Plan

1. Añadir workflows + `astro.config` base/site.
2. Validar `pnpm test:verify` local.
3. Crear repo, push, habilitar Pages (Actions).
4. Verificar URL y pipeline verde.
5. Actualizar roadmap; archivar cambio.

## Open Questions

- ¿Repo bajo organización o usuario personal? **Propuesta:** `gh api user -q .login` en apply.
- ¿Público o privado? **Propuesta:** público (Pages gratuito para repos públicos).
