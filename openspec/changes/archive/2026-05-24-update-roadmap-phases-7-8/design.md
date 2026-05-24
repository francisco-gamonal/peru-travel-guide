## Context

Se editó `specs/roadmap.md` directamente fuera de OpenSpec; eso contradice `specs/sdd-conventions.md` y `openspec/specs/sdd-governance/spec.md`. Este cambio revierte esa edición implícita (vía `git restore` previo) y reaplica el mismo contenido planificado mediante el flujo spec-driven.

## Goals / Non-Goals

**Goals:**

- Dejar Fases 7 y 8 documentadas en `specs/roadmap.md` con entregables, criterios de salida y nombres de cambios OpenSpec futuros.
- Añadir nota de que toda fase nueva post-Fase 6 exige su propio cambio OpenSpec.
- Reforzar en `project-constitution` que el roadmap es la fuente de planificación verificable.

**Non-Goals:**

- Implementar datos de Londres, UI con banderas o código en `src/`.
- Modificar `specs/mission.md` o `specs/tech-stack.md` (salvo referencia cruzada ya existente a `sdd-conventions.md`).

## Decisions

### D1: Fase 7 — ciudad Londres, país Reino Unido

Los destinos existentes usan ciudad + país (`madrid` / España, etc.). Para «Inglaterra» el viajero peruano suele pensar en Londres; el `id` propuesto para implementación futura: `london` (o `england` si el equipo prefiere país como etiqueta — dejar decidido en `add-destination-england`).

### D2: Fase 8 — assets optimizados en build Astro

La Fase 8 se planifica después de la 7 para poder incluir la bandera del Reino Unido en el mismo patrón visual que el resto. Tecnología: componente `Image` de Astro u optimización equivalente documentada en el futuro `design.md` de implementación.

### D3: Sin delta en capabilities de producto (población, clima)

Las capabilities de aplicación no cambian hasta los cambios `add-destination-england` y `add-destination-visual-assets`.

## Risks / Trade-offs

- **Roadmap desactualizado si no se archiva este cambio** → Mitigación: no editar `specs/roadmap.md` fuera de OpenSpec.
- **Ambigüedad Inglaterra vs Reino Unido** → Mitigación: nota en Fase 7; decisión final en cambio de implementación.

## Test traceability

| Spec ID | Tipo | Archivo |
|---------|------|---------|
| PCO-09 | manual | Revisión de `specs/roadmap.md` tras apply |
| PCO-10 | manual | `openspec validate update-roadmap-phases-7-8` |

## Review checklist

- [x] Alineado con `specs/mission.md` (planificación de producto, no implementación)
- [x] Test traceability definida (verificación manual documentada)
- [x] Sin contradicción con capabilities existentes
- [x] Aprobado para implementar (corrección de proceso SDD, 2026-05-24)
