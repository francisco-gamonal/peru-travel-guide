## Context

El roadmap termina en Fase 8 ✅ sin backlog visible. El análisis SDD del canvas cerró trazabilidad ejecutable, semver, changelog, LHCI (LCP/CLS) y banderas, pero dejó fuera de alcance: review gate automatizado en skills, gate duro de INP, retroadaptación de ~15 escenarios legacy sin `**ID:**` en `openspec/specs/`, y features de producto (home, búsqueda, más destinos). La misión sigue prometiendo que el usuario puede *indicar una ciudad*; el MVP solo ofrece destinos curados.

La numeración MUST continuar en secuencia tras Fase 8 (como 7 / 7.5), sin reutilizar el número 8 ni prefijos «SDD 8» que colisionan con la Fase 8 de producto ya completada.

## Goals / Non-Goals

**Goals:**

- Documentar en `specs/roadmap.md` las fases 9, 9.5, 10, 11, 12 y 13 pendientes con entregables, criterio de salida y cambio OpenSpec propuesto.
- Cumplir **PCO-09** y **PCO-14** (roadmap post-Fase 8).
- Orden sugerido: gobernanza SDD (9, 9.5) → producto (10–12) → retroadaptación SDD (13).

**Non-Goals:**

- Implementar skills, LHCI INP, destinos, home, búsqueda ni retroadaptar specs legacy.
- Modificar `specs/mission.md` o `specs/sdd-conventions.md` (salvo referencias en notas del roadmap).
- Branch protection en GitHub (fuera de este cambio).

## Decisions

### D1: Fases 9 y 9.5 para SDD (no «SDD 8»)

Tras Fase 8 ✅ (banderas), las mejoras de proceso se numeran **Fase 9** (review gate) y **Fase 9.5** (INP en CI), replicando el patrón 7 / 7.5 entre fases de producto y gobernanza SDD.

**Alternativa descartada:** «Fase SDD 8 / 8.5» — colisiona semánticamente con Fase 8 completada (iconos y banderas).

### D2: Fases 10–12 para producto

| Fase | Entrega | Cambio OpenSpec |
|------|---------|-----------------|
| 10 | París, Tokio, NYC | `add-curated-destinations-paris-tokyo-nyc` |
| 11 | Home `/` | `add-travel-guide-home` |
| 12 | Entrada libre de ciudad | `add-destination-search` |

Home (11) antes que búsqueda (12): menor riesgo y mejor descubrimiento de destinos curados antes del gap grande vs misión.

### D3: Fase 13 — retroadaptación SDD al final

Normalizar ~15 escenarios legacy en `openspec/specs/` pre-Fase 6 sin `**ID:**`. Prioridad baja; va **después** del producto 10–12. Excepción planificada a la política «no retroadaptar» de `specs/sdd-conventions.md`.

### D4: Fase 10 — batch de tres destinos

París (`paris`), Tokio (`tokyo`), Nueva York (`new-york`); `countryCode` `FR`, `JP`, `US`. Patrón Fase 7 + banderas Fase 8.

### D5: Fase 9 — estado `pending-review` en skills

`enhance-sdd-review-gate` extiende skills/comandos para revisión humana tras `design.md` antes de `tasks.md` / código (canvas #3).

### D6: Fase 9.5 — INP condicionado a fiabilidad LHCI

Spike en implementación: assertion INP en LHCI solo si headless es estable; si no, documentar en `performance-budget`.

## Risks / Trade-offs

- **[Riesgo] Roadmap largo** → Mitigación: editar solo vía OpenSpec; marcar ✅ al archivar cada cambio de implementación.
- **[Riesgo] Fase 12 ambiciosa** → Mitigación: MVP acotado en criterio de salida del cambio futuro.
- **[Riesgo] Fase 13 vs política no retroadaptar** → Mitigación: fase explícita, opt-in, sin tocar `archive/`.

## Test traceability

| Spec ID | Tipo | Archivo |
|---------|------|---------|
| PCO-09 | manual | Revisión de fases pendientes en `specs/roadmap.md` tras apply |
| PCO-14 | manual | Revisión de fases 9–13 en roadmap tras apply |

## Review checklist

- [x] Alineado con `specs/mission.md` (Fase 12 cierra gap ciudad libre)
- [x] Numeración coherente tras Fase 8 (9 / 9.5, no SDD 8)
- [x] Test traceability definida (verificación manual)
- [x] `breaking: false` en `.openspec.yaml`
- [x] Aprobado para implementar (documentación roadmap, 2026-05-24)
