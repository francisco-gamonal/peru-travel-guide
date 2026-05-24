## Context

El repo ya expone `pnpm test:verify` (`build`, `lint`, `test:coverage`, `test:static`, `test:e2e`). Playwright y `build` pueden tardar varios minutos; forzar `test:verify` en cada `pre-commit` penalizaría commits frecuentes y favorecería `--no-verify`. La práctica habitual (Husky, lint-staged, guías 2024–2026) separa checks rápidos en commit y checks pesados en push o CI.

## Goals / Non-Goals

**Goals:**

- Hooks versionados que ejecuten automáticamente la política acordada en `test-harness`.
- `pre-commit` ≤ ~30 s en condiciones normales (`pnpm lint` sobre el repo).
- `pre-push` ejecute validación post-build sin E2E (`test:verify:push`).
- Documentar que **CI** (cuando exista) MUST ejecutar `pnpm test:verify` completo.
- `pnpm prepare` → `husky` tras `pnpm install`.

**Non-Goals:**

- `lint-staged` en v1 (se puede añadir después si el lint completo resulta lento).
- E2E en `pre-push` (queda en `test:verify` / CI).
- Sustituir CI por hooks locales (hooks son bypassables).
- Cambios en features de producto (Fase 3 clima).

## Decisions

### 1. Husky como gestor de hooks

**Decisión:** `husky` en `devDependencies`, carpeta `.husky/`, script `"prepare": "husky"`.

**Alternativas:** Lefthook (más rápido en monorepos); `simple-git-hooks` (mínimo). Husky es el estándar en ecosistema Node/pnpm y encaja con documentación existente del equipo.

### 2. Capas de verificación (tabla acordada)

| Etapa | Comando | Contenido |
|-------|---------|-----------|
| `pre-commit` | `pnpm lint` | ESLint; fallo → abort commit |
| `pre-push` | `pnpm test:verify:push` | `pnpm build && pnpm lint && pnpm test:coverage && pnpm test:static` |
| CI / archive | `pnpm test:verify` | Lo anterior + `pnpm test:e2e` |

**Rationale:** E2E requiere Chromium y preview; no bloquea commits locales ni cada push si el desarrollador trabaja offline, pero CI/archive siguen exigiendo suite completa.

### 3. Script `test:verify:push`

**Decisión:** Añadir en `package.json`:

```json
"test:verify:push": "pnpm build && pnpm lint && pnpm test:coverage && pnpm test:static"
```

**Rationale:** Un solo entrypoint para el hook y para documentación; evita duplicar cadena en `.husky/pre-push`.

### 4. Archivos Husky

```sh
# .husky/pre-commit
pnpm lint

# .husky/pre-push
pnpm test:verify:push
```

Ejecutar desde raíz del repo (Husky ya fija `cwd`).

### 5. CI (opcional en apply)

**Decisión:** Incluir en tasks como opcional `.github/workflows/verify.yml` con `pnpm install`, Node 22+, `pnpm exec playwright install chromium`, `pnpm test:verify`. Si se pospone, documentar en `tech-stack` que Fase 5 lo añadirá.

### 6. Constitución vs roadmap

**Decisión:** Solo `specs/tech-stack.md` + delta `test-harness`; **no** nueva fase en `roadmap.md`.

## Risks / Trade-offs

| Riesgo | Mitigación |
|--------|------------|
| `pre-push` lento (build + tests) | Aceptable antes de push; documentar en README |
| WSL sin deps de Playwright solo afecta E2E en CI/`test:verify` manual | README ya cubre `playwright install-deps` |
| `--no-verify` omite hooks | Branch protection + CI obligatorio en Fase 5 |
| Node &lt; 22 rompe `build` en hook | `engines` en `package.json`; mensaje claro en fallo |

## Migration Plan

1. Añadir `husky` y scripts; `pnpm install` instala hooks.
2. Comunicar en README: primer clone → `pnpm install`; probar con `git commit` / `git push` de prueba.
3. Sin migración de datos ni rutas.

## Open Questions

- ¿Incluir workflow de GitHub Actions en este cambio o solo documentar? (tasks lo dejan como opcional 4.x)
