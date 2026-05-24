## Context

Los tres destinos actuales comparten el mismo patrón: JSON curados en `src/data/`, carga en `src/lib/`, página SSG `src/pages/destino/[id].astro` y selector `#destination`. Londres debe integrarse sin nuevos componentes ni rutas.

## Goals / Non-Goals

**Goals:**

- Destino `london` con población, clima, cultura y épocas al nivel de calidad de Madrid/CDMX/Buenos Aires.
- Cumplir convenciones SDD: Scenario IDs en deltas, Test traceability, `breaking: false`.
- Mantener cobertura ≥ 80 % en `src/lib/` y E2E post-build.

**Non-Goals:**

- Banderas o iconos optimizados (Fase 8 / `add-destination-visual-assets`).
- Cambiar layout de widgets o añadir React.
- APIs en tiempo de ejecución.

## Decisions

### D1: `id` del destino = `london`

Coherente con `madrid`, `cdmx`, `buenos-aires` (ciudad como clave). El nombre del cambio (`add-destination-england`) refiere al país/región; la URL será `/destino/london/`.

### D2: País mostrado = Reino Unido

En UI y datos, `countryName: "Reino Unido"` con fuente ONS. La fase del roadmap menciona Inglaterra como región de interés; la comparación poblacional usa el país (UK) para alinearse con cifras oficiales.

### D3: Población de referencia

- Ciudad: Greater London o equivalente ONS (documentar cifra y año en JSON).
- País: población UK ONS.
- Incluir `source`, `year`, `sourceUrl` como en destinos existentes.

### D4: Pruebas

- Vitest: extender tests de validación para cuarto destino.
- Static: nueva aserción HTML para `/destino/london/`.
- E2E: añadir `{ id: 'london', city: 'Londres' }` y snippets distintivos en clima/cultura.

## Performance impact

- **Rutas afectadas:** `/destino/london/` (nueva página estática).
- **Riesgo:** bajo (mismo peso HTML que otros destinos, sin imágenes nuevas en esta fase).
- **Mitigación:** sin assets adicionales; revisar LCP en preview si hay duda.

## Risks / Trade-offs

- **Cifras desactualizadas** → Mitigación: año y fuente visibles en UI.
- **Regresión E2E** → Mitigación: mantener lista de destinos en un solo array en `e2e/destinations.spec.ts`.

## Test traceability

| Spec ID | Tipo | Archivo | Test |
|---------|------|---------|------|
| PC-15 | unit | `src/lib/population.validation.test.ts` | `loadPopulationData incluye london...` |
| PC-16 | e2e | `e2e/destinations.spec.ts` | `destino london muestra comparación poblacional...` |
| DC-09 | unit | `src/lib/climate.validation.test.ts` | `loadClimateData incluye london...` |
| DC-10 | e2e | `e2e/destinations.spec.ts` | `destino london muestra clima oceánico...` |
| CU-08 | unit | `src/lib/culture.validation.test.ts` | `loadCultureData incluye london...` |
| CU-09 | e2e | `e2e/destinations.spec.ts` | `destino london muestra cultura...` |

## Review checklist

- [x] Alineado con `specs/mission.md` y Fase 7 del roadmap
- [x] Test traceability definida
- [x] Sin contradicción con capabilities existentes
- [x] Aprobado para implementar y archivar (2026-05-24)
