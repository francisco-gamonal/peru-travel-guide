## MODIFIED Requirements

### Requirement: Sin funcionalidades de otras fases

El alcance de la capability `population-comparison` MUST limitarse a datos, lógica y presentación de **población**. La ficha de destino en `/destino/<id>/` MAY componer otras capabilities (p. ej. `destination-climate`) en la misma página sin que formen parte del alcance de población.

#### Scenario: Módulo de población acotado

- **WHEN** se implementa o modifica código bajo la capability `population-comparison`
- **THEN** no se añade lógica de clima, cultura ni calendario de épocas en `src/lib/population.ts` ni en componentes dedicados solo a población

#### Scenario: Página compuesta en Fase 3+

- **WHEN** el usuario visita `/destino/madrid/` tras la entrega de clima
- **THEN** puede ver población y clima en la misma ficha, cada uno como sección distinta
