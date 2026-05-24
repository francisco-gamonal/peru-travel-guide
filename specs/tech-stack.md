# Tech Stack

> **Política de versiones:** Antes de upgrades mayores, verificar la última versión estable en npm (`npm view <paquete> version`) y fijar versiones exactas en `package.json`. Los valores de la tabla inferior reflejan la comprobación del **2026-05-23** y la validación del scaffold del **2026-05-24**.

## Aplicación web

| Tecnología | Versión objetivo | Notas |
|------------|------------------|--------|
| **Astro** | `6.3.7` (rama 6.x) | Framework principal; `engines.pnpm >= 7.1.0` en el paquete Astro |
| **TypeScript** | `6.0.3` | `extends: astro/tsconfigs/strict` en `tsconfig.json` |
| **Tailwind CSS** | `4.3.0` | Plugin `@tailwindcss/vite@4.3.0` en `astro.config.mjs` |
| **Vite** | `7.3.x` (transitivo) | Resuelto por Astro 6 + `@tailwindcss/vite`; **no forzar Vite 8** en upgrades hasta que el ecosistema lo soporte |
| **Node.js** | `>=22.12.0` | `engines` en `package.json`; probado con Node 24.x |
| **pnpm** | `10.33.4` | `packageManager` + `engines.pnpm`; binario en `PNPM_HOME` (zsh). **No** usar npm ni Corepack pnpm 11 como flujo principal |
| **ESLint** | `9.x` + `eslint-plugin-astro` | Script `pnpm lint`; ignora `dist/`, `.astro/`, `openspec/`, `specs/` |

### Compatibilidad verificada (scaffold Fase 1, 2026-05-24)

| Comprobación | Resultado |
|--------------|-----------|
| `pnpm install` / `build` / `lint` / `dev` con pnpm **10.33.4** | OK |
| `openspec validate scaffold-astro-project` | OK |
| Lockfile (`pnpm-lock.yaml`) | Vite **7.3.3** bajo Astro 6.3.7 + Tailwind 4.3.0 |
| Último `pnpm` en npm registry | `11.2.2` — **no** alineado con este repo; el proyecto fija **10.33.4** |

**pnpm 10.33.4 en este repo**

- Campo `packageManager: "pnpm@10.33.4"` y `engines.pnpm: "10.33.4"` en `package.json`.
- Instalación y scripts: solo `pnpm` del entorno del desarrollador (`PNPM_HOME`), no `npm install`.
- En WSL, **pnpm 11** vía Corepack puede fallar con `libatomic.so.1`; preferir el binario 10.33.4 de `PNPM_HOME` o `corepack disable pnpm`.
- Builds nativos: `esbuild` y `sharp` permitidos en `.npmrc` / `pnpm-workspace.yaml` (`allowBuilds`).

**Vite 7 vs 8**

- Astro 6 y `@tailwindcss/vite` 4.3.0 están validados con **Vite 7.x** en el lockfile.
- Al actualizar dependencias, revisar que no se suba Vite 8 de forma accidental hasta confirmar compatibilidad upstream.

### Comandos de verificación (antes de cada release mayor)

```bash
# Versiones en npm (referencia; el repo puede fijar otras en packageManager)
npm view astro version
npm view typescript version
npm view tailwindcss version
npm view @tailwindcss/vite version
npm view pnpm version

# Validación local del proyecto (desde la raíz)
node -v && pnpm -v && pnpm install && pnpm build && pnpm lint && openspec validate scaffold-astro-project
```

## Datos y dominio (producto)

| Área | Enfoque |
|------|---------|
| Población | Fuentes públicas: **INEI** (Perú, Lima, distritos), datos nacionales del país destino, agregadores (ONU / World Bank) cuando aplique |
| Clima y épocas | APIs o datasets de clima; reglas de “mejores épocas” definidas en capabilities futuras |
| Cultura | Contenido curado alineado con `specs/mission.md`; tono práctico para viajeros |

## Desarrollo y gobernanza

| Práctica | Herramienta / versión |
|----------|------------------------|
| Spec-driven development | **OpenSpec** `1.3.1`, schema `spec-driven` |
| Constitución del producto | `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md` |
| Scaffold aplicación | Raíz del repo: `src/`, `astro.config.mjs`, `package.json`, `pnpm-lock.yaml` |
| Control de versiones | Git |
| Commits | Conventional Commits |
| Idioma de artefactos | Español (narrativa); inglés (código, APIs, identificadores) — ver `openspec/specs/artifact-language-policy/` |

## UI e interactividad

| Decisión | Elección inicial |
|----------|------------------|
| Componentes | Priorizar componentes **Astro**; añadir islas **React** solo si un cambio OpenSpec lo exige (comparadores muy interactivos) |
| Estilos | Utilidades **Tailwind CSS** v4 |

## Despliegue (objetivo)

| Entorno | Opción |
|---------|--------|
| Hosting | Static hosting — **Vercel** o **Netlify** |
| Build | Salida estática de Astro salvo que un cambio futuro requiera SSR |

## Fuera del stack inicial (v1)

- Backend monolítico propio (evaluar edge functions o APIs externas solo bajo spec).
- Base de datos relacional en la primera entrega (priorizar datos estáticos o fetch en build).
- Reservas o pagos integrados (fuera de `specs/mission.md`).

## Referencias

- Astro releases: https://github.com/withastro/astro/releases  
- Tailwind CSS: https://tailwindcss.com/blog  
- pnpm: https://pnpm.io/installation  
