## MODIFIED Requirements

### Requirement: Página de inicio placeholder

`src/pages/index.astro` MUST integrar el flujo de comparación poblacional de la capability `population-comparison`: selector de destino, visualización comparativa y atribución de fuentes. La página MUST mantener copy en español alineado con `specs/mission.md` y MUST NOT limitarse al mensaje estático «en construcción» de la Fase 1.

#### Scenario: Contenido de home

- **WHEN** el usuario abre `/` en `pnpm dev`
- **THEN** ve el propósito del producto y puede usar la comparación poblacional sin navegar a otra ruta

#### Scenario: Coherencia con misión

- **WHEN** el usuario selecciona un destino de prueba
- **THEN** la home muestra contraste con referentes peruanos (Perú, Lima y distritos), no solo texto promocional
