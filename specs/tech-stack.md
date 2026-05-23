# Tech Stack

> **Política de versiones:** Antes del scaffold, verificar la última versión estable en el registro npm (`npm view <paquete> version`) y fijar versiones exactas en `package.json`. Los valores de la tabla inferior reflejan la comprobación del **2026-05-23**.

## Aplicación web

| Tecnología | Versión objetivo | Notas |
|------------|------------------|--------|
| **Astro** | `6.3.7` (rama 6.x) | Framework principal; crear proyecto con `pnpm create astro@latest` |
| **TypeScript** | `6.0.3` | Modo `strict`; alinear con compatibilidad de Astro 6 |
| **Tailwind CSS** | `4.3.0` | Integración recomendada vía `@tailwindcss/vite@4.3.0` con Vite/Astro |
| **Node.js** | `>=22.12.0` | Requerido por Astro 6 (`engines`); usar LTS activo (22.x o superior compatible) |
| **pnpm** | `11.2.2` | Package manager; fijar con `packageManager` en `package.json` vía Corepack |

### Comandos de verificación (antes de cada release mayor)

```bash
npm view astro version
npm view typescript version
npm view tailwindcss version
npm view @tailwindcss/vite version
npm view pnpm version
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
