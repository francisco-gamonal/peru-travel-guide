## Why

La **Fase 4** del roadmap (`specs/roadmap.md`) completa la misión (`specs/mission.md`): la ficha debe sentirse como **guía personal** (población + clima + cultura + épocas), no como paneles sueltos. Tras Fases 2–3 y los refactors de UI compacta, la ficha en `/destino/[id]/` aún termina con el aviso «Próximamente: cultura…». Sin cultura curada el viajero no obtiene orientación práctica sobre costumbres, comunicación y convivencia en el destino.

## What Changes

- Añadir datos culturales curados en español para los **mismos destinos** de Fase 2 (Madrid, Ciudad de México, Buenos Aires como mínimo).
- Nueva capability `destination-culture`: `src/data/culture.json`, tipos, `src/lib/culture.ts` con carga/validación y helper de vista para widget compacto (mismo criterio de densidad que población y clima).
- Componente `CultureGuide.astro` integrado en `ComparisonLayout` **debajo** de clima; quitar el pie «Próximamente: cultura».
- Ajustar copy de cabecera, `<title>` y `meta description` para reflejar guía integral (población, clima, cultura).
- Tests Vitest (≥ 80 % en `src/lib/` del alcance), estáticos post-build y E2E ampliados (Madrid/CDMX/BA con snippet cultural; coherencia al cambiar destino).
- Actualizar `specs/roadmap.md` al archivar (Fase 4 completada).
- **No** incluir reservas, itinerarios día a día, calendario exhaustivo de eventos ni APIs en runtime (Fase 5 y alcance fuera de misión).

## Capabilities

### New Capabilities

- `destination-culture`: Datos culturales curados, consejos prácticos para el viajero y presentación en widget único en la ficha estática.

### Modified Capabilities

- `destination-climate`: Eliminar el requisito que prohibía cultura en la misma página; la capability sigue acotada al clima.
- `population-comparison`: Aclarar que la página de destino puede componer cultura sin ampliar el alcance de población.

## Impact

- `src/data/culture.json`, `src/types/culture.ts`, `src/lib/culture.ts`, `CultureGuide.astro`, `ComparisonLayout.astro`, `pages/destino/[id].astro`.
- `e2e/destinations.spec.ts`, `src/test/static-destinations.test.ts`, posible `culture.validation.test.ts`.
- `openspec/specs/destination-culture/spec.md` (nuevo), deltas en `destination-climate` y `population-comparison`.
- `specs/roadmap.md` al archivar.
- Gates: `pnpm test:verify` antes de archivar.
