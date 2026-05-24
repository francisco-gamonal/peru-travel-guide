## 1. Metadatos del cambio

- [x] 1.1 Confirmar `breaking: false` en `openspec/changes/update-roadmap-phases-9-plus/.openspec.yaml`

## 2. Actualizar specs/roadmap.md

- [x] 2.1 Añadir nota transversal **Post-Fase 8**: orden sugerido Fase 9 → 9.5 (SDD) → 10–12 (producto) → 13 (retroadaptación SDD); referencia canvas SDD mayo 2026
- [x] 2.2 Añadir **Fase 9 — SDD Review gate en skills** (pendiente): entregables (`pending-review` en skills/comandos OpenSpec), criterio de salida, OpenSpec `enhance-sdd-review-gate`
- [x] 2.3 Añadir **Fase 9.5 — SDD INP en CI** (pendiente): entregables (assertion INP en LHCI si fiable), criterio de salida, OpenSpec `enhance-performance-inp-ci`, dependencia sugerida respecto a Fase 9
- [x] 2.4 Añadir **Fase 10 — Destinos curados París, Tokio, Nueva York** (pendiente): entregables (población, clima, cultura, banderas `FR`/`JP`/`US`), criterio de salida, OpenSpec `add-curated-destinations-paris-tokyo-nyc`
- [x] 2.5 Añadir **Fase 11 — Landing / home de guía** (pendiente): entregables (página `/` con propósito, enlaces a destinos con banderas), criterio de salida, OpenSpec `add-travel-guide-home`
- [x] 2.6 Añadir **Fase 12 — Entrada libre de ciudad** (pendiente): entregables (UX búsqueda/input, validación, gap vs `mission.md`), criterio de salida, OpenSpec `add-destination-search`
- [x] 2.7 Añadir **Fase 13 — SDD Retroadaptación Scenario IDs legacy** (pendiente / deuda técnica opcional): entregables (IDs en escenarios legacy de `openspec/specs/` pre-Fase 6), criterio de salida, OpenSpec `retroadapt-legacy-scenario-ids`

## 3. Verificación

- [x] 3.1 Ejecutar `openspec validate update-roadmap-phases-9-plus`
- [x] 3.2 Confirmar Review checklist en `design.md` marcado
- [x] 3.3 Tras archivar: `pnpm changelog:generate`; sync `project-constitution` (PCO-14, bump MINOR)
