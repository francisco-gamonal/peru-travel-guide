## Why

La **Fase 3** del roadmap exige completar la guía de destino con **clima** y **mejores épocas**, además de la comparación poblacional ya entregada (Fase 2). Hoy la ficha en `/destino/[id]/` solo muestra población y un aviso «Próximamente: clima…». Sin esta fase no se cumple la misión (`specs/mission.md`) de orientar *cuándo* viajar, solo *qué tan grande* es el destino.

## What Changes

- Añadir datos curados de clima y ventanas de viaje para los **mismos destinos** de Fase 2 (Madrid, CDMX, Buenos Aires como mínimo).
- Nueva lógica en `src/lib/` (carga, validación, reglas de «mejor época») con tests Vitest y cobertura ≥ 80 % en el alcance acordado.
- Componentes Astro en la ficha de destino: resumen climático + recomendación de meses/estaciones en español, con fuente y año.
- Integrar el bloque en `ComparisonLayout` / `/destino/[id]/` **debajo** de la comparación poblacional (sin quitar ni romper Fase 2).
- Ampliar E2E y pruebas estáticas post-build para que Madrid (y el resto de destinos curados) muestren clima y épocas en el HTML.
- Actualizar `specs/roadmap.md` marcando Fase 3 en progreso/completada al archivar.
- Quitar o sustituir el pie «Próximamente: clima…» por contenido real; **no** incluir cultura (Fase 4).

## Capabilities

### New Capabilities

- `destination-climate`: Datos climáticos curados, resumen para el viajero y ventanas recomendadas para viajar por destino, integrados en la ficha estática.

### Modified Capabilities

- `population-comparison`: Ajustar el requisito que prohibía clima en la misma entrega; la capability sigue acotada a población, pero la **página** de destino puede componer clima como capability separada.

## Impact

- `src/data/` (nuevo JSON o extensión tipada), `src/types/`, `src/lib/climate.ts`, componentes `Climate*.astro`, `ComparisonLayout.astro`, `pages/destino/[id].astro`.
- Tests unitarios, `src/test/static-destinations.test.ts`, `e2e/destinations.spec.ts`.
- `specs/roadmap.md`, posible nota en `specs/tech-stack.md` sobre fuentes de datos climáticos (estáticos en MVP).
- Sin APIs en runtime ni SSR; build estático igual que población.
- Gates: `pnpm test:verify` / hooks existentes antes de archivar.
