# Guía de viaje (Astro)

Web para comparar la población de destinos internacionales con el referente de **Perú** y **Lima**, y planificar viajes con contexto de clima, cultura y mejores épocas. Ver `specs/mission.md`.

## Requisitos

| Herramienta | Versión |
|-------------|---------|
| **Node.js** | `>=22.12.0` |
| **pnpm** | `10.33.4` (instalado en `PNPM_HOME`, ver `~/.zshrc`) |

Versiones principales: Astro `6.3.7`, TypeScript `6.0.3`, Tailwind CSS `4.3.0`, pnpm `10.33.4`.

## Instalación

Requiere `pnpm` en el PATH (configuración habitual en zsh con `PNPM_HOME`).

```bash
pnpm install
```

### Si aparece `libatomic.so.1` con pnpm 11.x

Ese error viene del binario **pnpm 11** (p. ej. vía Corepack). Este proyecto usa **pnpm@10.33.4** (`packageManager` en `package.json`). Opciones recomendadas:

- Usar el `pnpm` de `PNPM_HOME` (configurado en `~/.zshrc`), no Corepack 11.
- `corepack disable pnpm` si Corepack intercepta el comando.
- No usar `npm install` en este repo; el lockfile es `pnpm-lock.yaml`.

Opcional solo si insistes en pnpm 11: `sudo apt install libatomic1`.

## Comandos

```bash
pnpm dev            # servidor de desarrollo
pnpm build          # build de producción
pnpm preview        # previsualizar build
pnpm lint           # ESLint (Astro + TypeScript)
pnpm test           # pruebas unitarias (Vitest)
pnpm test:coverage  # unit tests + cobertura (mínimo 80 % en src/lib/)
pnpm test:static    # rutas estáticas en dist/ (tras build; regresión CDMX)
pnpm test:e2e       # E2E en navegador (Playwright; build + preview)
pnpm test:verify    # gate completo (build, lint, coverage, static, e2e)
```

### Primera vez con E2E

Tras `pnpm install`, instalar el navegador y dependencias de sistema (WSL/Linux):

```bash
pnpm exec playwright install chromium
pnpm exec playwright install-deps chromium
```

No uses `sudo pnpm` (root no tiene tu `PATH`). Si falla, instala libs con `apt` (ver `specs/tech-stack.md`).

E2E corre en **headless** (sin ventana). Para ver el navegador: `pnpm exec playwright test --headed`.

## Validar el proyecto

Desde la raíz, con **pnpm 10.33.4** en el PATH:

```bash
node -v && pnpm -v && pnpm install && pnpm test:verify
```

Esperado: Node `>=22.12`, pnpm `10.33.4`, build, lint, cobertura ≥ 80 % en `src/lib/` y E2E en verde. Para desarrollo interactivo: `pnpm dev` → `http://localhost:4321/`.

Detalle de compatibilidad (pnpm, Vite 7, versiones fijadas): `specs/tech-stack.md`.

## Estructura del repositorio

| Ruta | Contenido |
|------|-----------|
| `src/` | Código de la aplicación Astro |
| `specs/` | Constitución del producto (`mission.md`, `tech-stack.md`, `roadmap.md`) |
| `openspec/` | Workflow OpenSpec (cambios, capabilities, `config.yaml`) |

## Desarrollo spec-driven

Los cambios de producto se gestionan con [OpenSpec](https://github.com/Fission-AI/OpenSpec). Antes de implementar features, revisar `specs/` y proponer un cambio con `/opsx-propose`.

## Verificar versiones (antes de upgrades)

```bash
npm view astro version
npm view typescript version
npm view tailwindcss version
npm view @tailwindcss/vite version
npm view pnpm version
```
