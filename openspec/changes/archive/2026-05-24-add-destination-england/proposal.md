## Why

La Fase 7 del roadmap planifica un cuarto destino internacional para viajeros con referente en Perú/Lima. Hoy solo existen Madrid, CDMX y Buenos Aires; añadir **Londres (Reino Unido)** amplía la guía hacia un destino europeo de alto interés y valida el flujo SDD post-Fase 6 (Scenario IDs, trazabilidad, `pnpm test:verify`).

## What Changes

- Añadir destino curado con `id` **`london`**, ciudad **Londres**, país **Reino Unido** en `src/data/destinations.json` (población ciudad y país con fuente ONS u equivalente y año).
- Añadir bloques de clima y cultura en `src/data/climate.json` y `src/data/culture.json` para `destinationId: "london"`.
- Generar ruta estática `/destino/london/` vía `getStaticPaths` existente.
- Incluir Londres en el selector de destinos y en pruebas E2E/estáticas.
- Actualizar `specs/roadmap.md`: marcar Fase 7 en curso durante apply y completada al archivar.

## Capabilities

### New Capabilities

_(ninguna)_

### Modified Capabilities

- `population-comparison`: destino Londres con población ciudad/país y comparación vs referentes peruanos.
- `destination-climate`: datos climáticos y mejores épocas para `london`.
- `destination-culture`: bloque cultural práctico para `london`.

## Impact

- **Datos:** `src/data/destinations.json`, `climate.json`, `culture.json`.
- **Tests:** ampliar `src/lib/*.test.ts` (validación), `src/test/static-destinations.test.ts`, `e2e/destinations.spec.ts` con `// @spec <ID>`.
- **UI:** sin nuevo componente; reutiliza widgets existentes en `/destino/[id]/`.
- **Gates:** `pnpm test:verify` obligatorio antes de archivar.
- **Roadmap:** Fase 7 pasa a completada al archivar este cambio.
