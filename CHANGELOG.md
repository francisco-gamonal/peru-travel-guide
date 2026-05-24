# Changelog

> Generado con `pnpm changelog:generate` desde `openspec/changes/archive/*/proposal.md`.

## 2026-05-24 — setup-github-production

- Crear repositorio remoto en GitHub con nombre propuesto **`peru-travel-guide`** (guía de viaje con referente Perú/Lima; nombre global y descriptivo).
- Configurar `origin` y primer `push` de `master`/`main`.
- Workflow **CI** (`.github/workflows/ci.yml`): en `pull_request` y `push` a rama principal — Node 22+, pnpm 10.33.4, caché, `playwright install chromium`, `pnpm test:verify`.
- Workflow **Deploy** (`.github/workflows/deploy.yml`): en `push` a rama principal — `pnpm build`, publicación en **GitHub Pages** vía `actions/deploy-pages` (sitio estático Astro).
- Ajustar `astro.config.mjs` con `site` y `base` acordes a GitHub Pages (`/peru-travel-guide/` en project site).
- Documentar en `README.md` URL pública, badges de CI y pasos para colaboradores.
- Actualizar `specs/roadmap.md` (Fase 5 completada al archivar).
- **No** incluir dominio custom en v1 (opcional del roadmap); **no** Vercel/Netlify en esta entrega (todo en GitHub).

---

## 2026-05-24 — refactor-destination-climate-ui

- Sustituir las tres tarjetas apiladas por **un único widget** (`<article>`) bajo el mismo `h2` «Clima y mejores épocas», con subsecciones internas ordenadas:
  1. **Resumen** — párrafo climático + disclaimer breve (sin tarjeta propia).
  2. **Estaciones** — tabla o lista compacta (nombre, rango térmico, lluvia) en lugar de un `<li>` expandido por estación con descripción larga en bloque separado.
  3. **Mejores épocas** — ventanas recomendadas en formato compacto (etiqueta, meses, motivo en una o dos líneas).
- Agrupar **fuente y año** al pie del widget (mismo patrón que población), sin `SourceAttribution` suelto debajo de otra tarjeta.
- Opcional en `src/lib/climate.ts`: helper `buildClimateView(climate)` para centralizar filas de estaciones y ventanas (tests Vitest).
- Mantener `section[aria-labelledby="climate-heading"]`, textos en español, coherencia al cambiar destino y estado vacío sin datos.
- Actualizar E2E/estáticos solo si cambian selectores o estructura DOM; **sin** cambiar `climate.json`, rutas ni orden respecto a población.
- **No** incluir cultura (Fase 4) ni gráficos interactivos.

---

## 2026-05-24 — enhance-sdd-governance

- Crear `specs/sdd-conventions.md`: nuevo archivo de constitución con las convenciones del proceso SDD (Scenario IDs, semver de capabilities, review gate, breaking flag, changelog, performance budget).
- Actualizar `specs/tech-stack.md`: agregar referencia a `specs/sdd-conventions.md` en la sección "Desarrollo y gobernanza".
- Actualizar `specs/roadmap.md`: registrar Fase 6 — SDD Governance como completada al archivar este cambio.
- Actualizar `openspec/config.yaml`: incluir `specs/sdd-conventions.md` en el bloque `context:` para que el agente lo lea en cada proposal futuro.
- Agregar script `changelog:generate` en `package.json` (script Node mínimo que compila `CHANGELOG.md` desde los `proposal.md` archivados).
- Crear capability `sdd-governance` en `openspec/specs/`: spec normativa que rige el proceso de desarrollo del propio repositorio.
- Actualizar capability `project-constitution`: agregar `specs/sdd-conventions.md` como archivo de constitución requerido.

---

## 2026-05-24 — add-testing-practices

- Ampliar `specs/tech-stack.md` con stack de pruebas: **Vitest** (unit), umbral de **cobertura ≥ 80 %** en código bajo test, **Playwright** (E2E contra `preview` o artefacto estático).
- Añadir scripts `pnpm test`, `pnpm test:coverage`, `pnpm test:e2e` y gate documentado antes de archivar cambios con código de aplicación.
- Refinar `openspec/config.yaml`: reglas en `proposal`, `design`, `specs` y `tasks` para exigir pruebas en propuestas futuras con lógica o UI.
- Implementar harness inicial + tests de regresión (p. ej. cada `/destino/<id>/` muestra su ciudad tras `build`).
- Actualizar `README.md` con comandos de test y requisitos de cobertura.

---

## 2026-05-24 — add-population-comparison

- Añadir datos de referencia peruanos (país, provincia de Lima, distritos seleccionados) y al menos **un destino internacional de prueba** con población de ciudad y país.
- Implementar flujo en la home: el usuario elige un destino (selector o lista curada en MVP) y ve comparación visual y numérica de habitantes frente a los referentes.
- Incluir ratios o frases comprensibles (p. ej. «X veces la población de Lima») además de cifras absolutas.
- Mostrar fuente y año de los datos en la UI.
- Actualizar `src/pages/index.astro` para integrar la comparación (sustituye el mensaje «en construcción» de Fase 1).
- Actualizar `specs/roadmap.md`: Fase 2 en curso vía este cambio.

---

## 2026-05-24 — add-git-quality-hooks

- Añadir **Husky** y scripts versionados en `.husky/` activados con `prepare` en `package.json`.
- **`pre-commit`:** `pnpm lint` (rápido, segundos).
- **`pre-push`:** nuevo script `pnpm test:verify:push` = `build` + `lint` + `test:coverage` + `test:static` (sin E2E).
- Mantener **`pnpm test:verify`** como gate completo (incluye E2E) para archive manual, CI y documentación.
- Documentar la política en `specs/tech-stack.md` y `README.md` (instalación de hooks, bypass con `--no-verify`, CI como fuente de verdad).
- Ampliar capability `test-harness` con requisitos de hooks; actualizar `project-constitution` para que `tech-stack` describa la estrategia en tres capas.
- **Opcional en este cambio:** workflow de GitHub Actions con `pnpm test:verify` (si no, dejar documentado para Fase 5).

---

## 2026-05-24 — add-destination-culture

- Añadir datos culturales curados en español para los **mismos destinos** de Fase 2 (Madrid, Ciudad de México, Buenos Aires como mínimo).
- Nueva capability `destination-culture`: `src/data/culture.json`, tipos, `src/lib/culture.ts` con carga/validación y helper de vista para widget compacto (mismo criterio de densidad que población y clima).
- Componente `CultureGuide.astro` integrado en `ComparisonLayout` **debajo** de clima; quitar el pie «Próximamente: cultura».
- Ajustar copy de cabecera, `<title>` y `meta description` para reflejar guía integral (población, clima, cultura).
- Tests Vitest (≥ 80 % en `src/lib/` del alcance), estáticos post-build y E2E ampliados (Madrid/CDMX/BA con snippet cultural; coherencia al cambiar destino).
- Actualizar `specs/roadmap.md` al archivar (Fase 4 completada).
- **No** incluir reservas, itinerarios día a día, calendario exhaustivo de eventos ni APIs en runtime (Fase 5 y alcance fuera de misión).

---

## 2026-05-24 — add-destination-climate

- Añadir datos curados de clima y ventanas de viaje para los **mismos destinos** de Fase 2 (Madrid, CDMX, Buenos Aires como mínimo).
- Nueva lógica en `src/lib/` (carga, validación, reglas de «mejor época») con tests Vitest y cobertura ≥ 80 % en el alcance acordado.
- Componentes Astro en la ficha de destino: resumen climático + recomendación de meses/estaciones en español, con fuente y año.
- Integrar el bloque en `ComparisonLayout` / `/destino/[id]/` **debajo** de la comparación poblacional (sin quitar ni romper Fase 2).
- Ampliar E2E y pruebas estáticas post-build para que Madrid (y el resto de destinos curados) muestren clima y épocas en el HTML.
- Actualizar `specs/roadmap.md` marcando Fase 3 en progreso/completada al archivar.
- Quitar o sustituir el pie «Próximamente: clima…» por contenido real; **no** incluir cultura (Fase 4).

---

## 2026-05-23 — scaffold-astro-project

- Inicializar proyecto **Astro 6** en la raíz del repositorio (conviviendo con `specs/` y `openspec/`).
- Configurar **TypeScript** (`strict`), **Tailwind CSS 4** (`@tailwindcss/vite`) y **pnpm** con versiones verificadas en npm.
- Añadir lint mínimo (ESLint) y scripts `dev` / `build` / `preview`.
- Crear `README.md` de desarrollo con requisitos de Node.js y comandos.
- Página de inicio placeholder que refleje la misión (guía de viaje Perú/Lima vs destino) sin implementar features de producto.
- Actualizar `specs/roadmap.md`: Fase 0 completada; Fase 1 en curso vía este cambio.

---

## 2026-05-23 — refactor-population-comparison-ui

- Sustituir la lista de tarjetas en `PopulationComparison.astro` por **un único widget** con dos subsecciones ordenadas:
  1. **Países** — país del destino frente a Perú (población + barras horizontales comparativas).
  2. **Ciudades** — ciudad del destino frente a provincia de Lima; distritos de Lima en formato compacto (misma subsección, sin tarjeta por distrito).
- Agrupar **fuentes y años** al pie del widget (bloque de atribución único o por subsección), no repetir `SourceAttribution` en cada fila.
- Ajustar helpers en `src/lib/population.ts` para exponer filas agrupadas (`country` / `city`) sin cambiar datos JSON.
- Mantener locale `es-PE`, frase de ratio respecto a Lima y accesibilidad (`aria-labelledby`, `role="img"` en barras).
- Actualizar E2E/estáticos si cambian selectores o textos estructurales; **sin** cambiar rutas ni selector de destino.
- Opcional: una línea en `specs/mission.md` (principio de densidad legible) — solo si se acuerda en apply.

---

## 2026-05-23 — configure-spanish-requirements

- Añadir `context` global en `openspec/config.yaml` con la política de idioma del proyecto.
- Definir reglas por artefacto (`proposal`, `design`, `specs`, `tasks`) que refuercen español en narrativa y inglés en términos técnicos.
- Documentar criterios concretos: qué va en español, qué permanece en inglés, y ejemplos para evitar ambigüedad.
- No se modifica el schema `spec-driven` ni la CLI de OpenSpec.

---

## 2026-05-23 — add-project-constitution

- Crear la carpeta `specs/` en la **raíz del proyecto** (no confundir con `openspec/specs/`, que almacena capabilities de OpenSpec).
- Añadir tres archivos de especificación constitucional:
  - `specs/mission.md` — propósito, usuarios, principios de desarrollo
  - `specs/tech-stack.md` — tecnologías, herramientas y convenciones
  - `specs/roadmap.md` — fases, entregables y criterios de salida
- **Flujo interactivo de redacción** (orden obligatorio):
  1. `mission.md` primero — sin avanzar hasta validación del usuario
  2. `tech-stack.md` segundo — informado por la misión acordada
  3. `roadmap.md` tercero — alineado con misión y stack
- Referenciar los tres archivos desde `openspec/config.yaml` para que los artefactos OpenSpec hereden el contexto del proyecto.
- Definir requisitos normativos en la capability `project-constitution` para mantener estructura, orden y actualización de estos archivos.
- **No** se crea `openspec/CONSTITUTION.md` monolítico.

---
