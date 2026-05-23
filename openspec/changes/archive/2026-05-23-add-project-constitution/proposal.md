## Why

El repositorio tiene OpenSpec configurado pero carece de una constitución del proyecto: documentos fundacionales que alinean misión, stack y roadmap antes de escribir código. Sin ellos, cada cambio spec-driven carece de contexto estratégico y los agentes improvisan decisiones de arquitectura.

Un único archivo monolítico dificulta iterar con el usuario; separar la constitución en especificaciones por dominio y redactarlas de forma interactiva permite validar cada decisión antes de pasar a la siguiente.

## What Changes

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

## Capabilities

### New Capabilities

- `project-constitution`: Constitución del proyecto bajo spec-driven development, distribuida en `specs/mission.md`, `specs/tech-stack.md` y `specs/roadmap.md`, con redacción interactiva secuencial.

### Modified Capabilities

<!-- Ninguna -->

## Impact

- Nueva carpeta `specs/` en la raíz con tres archivos (contenido inicial vía sesión interactiva, no plantillas vacías sin contexto).
- Actualización de `openspec/config.yaml` para apuntar a `specs/mission.md`, `specs/tech-stack.md` y `specs/roadmap.md`.
- Artefactos del cambio (`design.md`, `specs/project-constitution/spec.md`, `tasks.md`) alineados con esta estructura.
- Sin impacto en código de aplicación hasta la fase Scaffold del roadmap.

## Nota sobre nombres

| Ruta | Rol |
|------|-----|
| `specs/` (raíz) | Constitución del producto: misión, stack, roadmap |
| `openspec/specs/` | Specs normativas de capabilities (OpenSpec) |
