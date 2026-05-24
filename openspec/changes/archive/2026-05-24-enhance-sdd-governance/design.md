## Context

El repositorio tiene 11 cambios archivados y un ciclo SDD funcional, pero las convenciones de proceso son tácitas: los escenarios en `openspec/specs/` no tienen IDs únicos, las capabilities no llevan versión semántica, no hay política explícita de breaking changes y el historial de decisiones en `openspec/changes/archive/` no se compila en ningún artefacto legible. El agente de IA lee `openspec/config.yaml` antes de cada proposal, pero ese archivo no referencia ningún documento de convenciones de proceso — solo la constitución de producto. Añadir `specs/sdd-conventions.md` e incluirlo en el contexto cierra esa brecha para todos los cambios futuros sin alterar el flujo existente.

## Goals / Non-Goals

**Goals:**

- Definir y ubicar las convenciones de proceso SDD en `specs/sdd-conventions.md` como cuarto archivo de constitución.
- Registrar la capability `sdd-governance` en `openspec/specs/` como spec normativa del proceso.
- Actualizar `openspec/config.yaml` para inyectar `specs/sdd-conventions.md` en el contexto de cada cambio futuro.
- Actualizar la capability `project-constitution` para reflejar que la constitución ahora son cuatro archivos.
- Agregar el script `changelog:generate` en `package.json` como herramienta de compilación de historial.
- Actualizar `specs/tech-stack.md` y `specs/roadmap.md` mínimamente para reflejar el nuevo archivo y la Fase 6.

**Non-Goals:**

- No cambiar ningún archivo en `src/` ni rutas de la aplicación.
- No migrar retroactivamente los 11 cambios archivados para añadirles IDs de escenario.
- No añadir validación automática de IDs en CI por ahora (checklist manual en `tasks.md` de cada cambio futuro es suficiente para empezar).
- No implementar LHCI ni medición de performance en CI (solo declarar el presupuesto objetivo en las convenciones).

## Decisions

### D1: Nuevo archivo `specs/sdd-conventions.md` en lugar de extender `tech-stack.md`

`specs/tech-stack.md` describe herramientas y versiones (Astro, Vitest, pnpm). Las convenciones de proceso SDD son ortogonales al stack tecnológico: aplican igual si el framework cambia. Mantenerlas separadas permite referenciarlas de forma precisa en `openspec/config.yaml` sin cargar al agente con el contenido completo de `tech-stack.md` cuando solo necesita las reglas de proceso.

Alternativa considerada: sección nueva en `tech-stack.md`. Descartada porque mezcla responsabilidades y dificulta referenciar las convenciones de forma aislada.

### D2: Capability `sdd-governance` en `openspec/specs/` (no solo documentación en `specs/`)

Los archivos en `specs/` son constitución de producto: misión, stack, roadmap y convenciones. Los archivos en `openspec/specs/` son capabilities técnicas normativas. La capability `sdd-governance` vive en `openspec/specs/` porque sus requisitos son verificables por el proceso OpenSpec (el agente puede validar que un proposal cumple con los escenarios de trazabilidad), mientras que `specs/sdd-conventions.md` es la referencia humana y de contexto para el agente.

### D3: Script `changelog:generate` como script Node sin dependencias nuevas

El script lee `openspec/changes/archive/*/proposal.md` con las APIs nativas de Node (`fs`, `path`), ordena por fecha del prefijo de carpeta y genera `CHANGELOG.md`. No agrega dependencias de producción. Se registra como `"changelog:generate": "node scripts/generate-changelog.mjs"` en `package.json`.

Alternativa considerada: usar `conventional-changelog` o `release-it`. Descartada porque el formato de historial del repo es custom (basado en `proposal.md`), no en `git log`.

### D4: Semver de capabilities declarativo (no automatizado en el archivo)

El bump de versión en `openspec/specs/<capability>/spec.md` lo realiza el autor al archivar el cambio, guiado por un checklist en `tasks.md`. Automatizar el bump requeriría parsear los deltas y determinar si son additive o breaking, lo que agrega complejidad innecesaria en esta etapa.

Regla: `MAJOR` si se elimina o cambia un requisito observable; `MINOR` si se añaden requisitos; `PATCH` si solo se aclara redacción.

### D5: Review checklist en `design.md` como gate de proceso

El flujo `opsx:apply` no tiene gate nativo de revisión. La convención es: `design.md` incluye una sección `## Review checklist` al final; el autor (o el agente al ejecutar `opsx:apply`) verifica que esté marcada antes de implementar. En un proyecto personal, el revisor es el mismo autor. En equipo, se exige firma.

## Risks / Trade-offs

- **Adopción incremental** → Las convenciones solo aplican a cambios futuros; los cambios archivados no se retroadaptan. Riesgo: inconsistencia temporal entre archivo histórico y nuevo estándar. Mitigación: documentar explícitamente en `sdd-conventions.md` que los IDs aplican desde el primer cambio post-Fase 6.
- **Complejidad percibida** → Añadir IDs, semver y review checklist puede sentirse como burocracia. Mitigación: las convenciones son mínimas y el agente las aplica automáticamente al leer `config.yaml`; el autor humano solo revisa el output.
- **Script `changelog:generate` frágil** → Si el formato de `proposal.md` cambia, el script puede fallar silenciosamente. Mitigación: el script falla con `process.exit(1)` si no encuentra secciones esperadas, y se ejecuta manualmente (no en CI por ahora).

## Review checklist

- [x] Alineado con `specs/mission.md` (cambio de proceso, no de producto)
- [x] Sin contradicción con capabilities existentes
- [x] `specs/sdd-conventions.md` cubre todas las convenciones acordadas en el análisis
- [x] Aprobado para implementar (2026-05-24, `/opsx:apply`)
