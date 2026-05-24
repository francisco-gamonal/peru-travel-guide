## 1. Archivo de convenciones SDD

- [x] 1.1 Crear `specs/sdd-conventions.md` con las secciones: Scenario IDs (formato, prefijos de capabilities existentes), Semver de capabilities (reglas de bump MAJOR/MINOR/PATCH), Review gate (checklist mínima en `design.md`), Breaking changes (campo `breaking:` en `.openspec.yaml` + Migration Guide), Changelog (instrucciones de `pnpm changelog:generate`) y Performance budget (umbrales LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms para `/` y `/destino/[id]/`)
- [x] 1.2 Verificar que el archivo esté redactado en español (narrativa) con términos técnicos en inglés conforme a `artifact-language-policy`

## 2. Actualización de la constitución existente

- [x] 2.1 Actualizar `specs/tech-stack.md`: agregar en la sección "Desarrollo y gobernanza" una fila o nota que referencia `specs/sdd-conventions.md` como documento de convenciones del proceso SDD
- [x] 2.2 Actualizar `specs/roadmap.md`: agregar **Fase 6 — SDD Governance** con entregables, criterio de salida (primer feature post-Fase 6 usa Scenario IDs y Review checklist) y estado "Completada" al archivar este cambio
- [x] 2.3 Agregar `breaking: false` al archivo `.openspec.yaml` de este cambio (`openspec/changes/enhance-sdd-governance/.openspec.yaml`)

## 3. Actualización de openspec/config.yaml

- [x] 3.1 Agregar `specs/sdd-conventions.md` al bloque `context:` de `openspec/config.yaml`, después de `specs/roadmap.md`, con una línea descriptiva (p. ej. `- specs/sdd-conventions.md — convenciones del proceso SDD: Scenario IDs, semver, review gate, breaking changes, changelog, performance budget`)

## 4. Script de changelog

- [x] 4.1 Crear el directorio `scripts/` en la raíz si no existe
- [x] 4.2 Crear `scripts/generate-changelog.mjs`: script Node (ES module) que lee todos los `openspec/changes/archive/*/proposal.md`, ordena por fecha del prefijo de carpeta (`YYYY-MM-DD`), extrae el título del cambio y la sección "What Changes", y genera `CHANGELOG.md` en la raíz con entradas ordenadas de más reciente a más antigua; termina con `process.exit(1)` si no encuentra archivos de archive
- [x] 4.3 Agregar el script `"changelog:generate": "node scripts/generate-changelog.mjs"` en `package.json`
- [x] 4.4 Ejecutar `pnpm changelog:generate` y verificar que `CHANGELOG.md` se genera correctamente con los 11 cambios archivados

## 5. Semver inicial en capabilities existentes

- [x] 5.1 Agregar cabecera YAML `version: "1.0.0"` al inicio de cada spec en `openspec/specs/` (8 capabilities: `project-constitution`, `artifact-language-policy`, `astro-app-scaffold`, `population-comparison`, `destination-climate`, `destination-culture`, `test-harness`, `production-deploy`)

## 6. Verificación del cambio

- [x] 6.1 Ejecutar `pnpm build && pnpm lint` y verificar que no hay errores (sin cambios en `src/`, es la verificación mínima)
- [x] 6.2 Ejecutar `openspec validate enhance-sdd-governance`
- [x] 6.3 Confirmar que `design.md` tiene el Review checklist marcado antes de archivar
- [x] 6.4 Actualizar `specs/roadmap.md` Fase 6 a estado "Completada" con la fecha del día

## 7. Verificación de trazabilidad (primer feature post-Fase 6)

> Esta sección es una referencia para el próximo cambio de producto, no una tarea de este cambio.

- Tabla de Scenario IDs disponibles en `specs/sdd-conventions.md` (prefijos por capability)
- En el próximo delta spec, cada `#### Scenario:` MUST incluir el ID en el título
- En el próximo `design.md`, incluir `## Test traceability` con tabla ID → archivo de test
- En los tests nuevos o modificados, agregar `// @spec <ID>` antes del bloque `it`/`test`
