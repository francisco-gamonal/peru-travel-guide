## Context

El sitio tiene cuatro destinos curados (Madrid, CDMX, Buenos Aires, Londres) con datos en `src/data/`, página SSG `src/pages/destino/[id].astro`, selector `#destination` y banderas vía `countryCode` + `src/assets/flags/`. La Fase 10 añade tres destinos siguiendo el mismo patrón de Fase 7 (`add-destination-england`) y Fase 8 (`add-destination-visual-assets`).

## Goals / Non-Goals

**Goals:**

- Destinos `paris`, `tokyo`, `new-york` con población, clima, cultura, épocas y banderas al nivel de calidad de los existentes.
- Cumplir SDD post-Fase 9: Scenario IDs, `## Test traceability`, `reviewStatus`, `breaking: false`.
- Mantener cobertura ≥ 80 % en `src/lib/` y `pnpm test:verify` en verde.

**Non-Goals:**

- Landing/home dedicada (Fase 11).
- Búsqueda libre de ciudad (Fase 12).
- Cambiar layout de widgets o añadir frameworks UI.
- APIs en tiempo de ejecución.

## Decisions

### D1: Identificadores de destino

| `id` | Ciudad UI | País UI | `countryCode` |
|------|-----------|---------|---------------|
| `paris` | París | Francia | `FR` |
| `tokyo` | Tokio | Japón | `JP` |
| `new-york` | Nueva York | Estados Unidos | `US` |

Coherente con `madrid`, `london`, `buenos-aires` (slug kebab-case). URL: `/destino/new-york/`.

### D2: Fuentes de población

- **París:** INSEE (aire urbain / commune selon cifra documentada en JSON).
- **Tokio:** Statistics Bureau of Japan / Tokyo Metropolitan Government (metrópolis documentada).
- **Nueva York:** US Census Bureau (NYC proper o área documentada).

Cada entrada MUST incluir `source`, `year`, `sourceUrl` como en destinos existentes.

### D3: Banderas SVG

Añadir `fr.svg`, `jp.svg`, `us.svg` bajo `src/assets/flags/` con el mismo patrón que `gb.svg` (dimensiones 32×24, `alt` en español vía componente existente). Extender el mapa en el helper de banderas si usa registro explícito.

### D4: Pruebas

- **Unit:** extender tests de validación para los tres `destinationId` (`PC-17`, `DC-11`, `CU-10`, `DV-09`).
- **Estático:** casos post-build para al menos un destino nuevo con bandera (`DV-10`).
- **E2E:** añadir entradas al array `destinations` y tests distintivos de clima/cultura por destino (`PC-18`–`PC-20`, `DC-12`–`DC-14`, `CU-11`–`CU-13`, `DV-11`).

### D5: Performance y LHCI

Siete páginas de destino; riesgo bajo (HTML + 3 SVG ligeros). Documentar `## Performance impact`. No modificar `lighthouserc.cjs` salvo que LHCI falle; rutas bajo gate siguen siendo home + `/destino/london/` (PB-03).

## Risks / Trade-offs

- **[Riesgo] Cifras desactualizadas** → Mitigación: año y fuente visibles en UI.
- **[Riesgo] Regresión E2E por selector con 7 opciones** → Mitigación: array centralizado en `e2e/destinations.spec.ts`.
- **[Riesgo] LCP por más banderas en selector** → Mitigación: SVG inline/import estático; revisar job `lighthouse`.

## Performance impact

- **Rutas afectadas:** `/destino/paris/`, `/destino/tokyo/`, `/destino/new-york/` (nuevas); selector en todas las fichas.
- **Riesgo:** bajo (mismo peso HTML que destinos actuales + 3 SVG).
- **Mitigación:** dimensiones fijas en banderas; sin imágenes raster; LHCI post-apply.

## Test traceability

| Spec ID | Tipo | Archivo |
|---------|------|---------|
| PC-17 | unit | `src/lib/population.validation.test.ts` |
| PC-18 | e2e | `e2e/destinations.spec.ts` |
| PC-19 | e2e | `e2e/destinations.spec.ts` |
| PC-20 | e2e | `e2e/destinations.spec.ts` |
| DC-11 | unit | `src/lib/climate.validation.test.ts` |
| DC-12 | e2e | `e2e/destinations.spec.ts` |
| DC-13 | e2e | `e2e/destinations.spec.ts` |
| DC-14 | e2e | `e2e/destinations.spec.ts` |
| CU-10 | unit | `src/lib/culture.validation.test.ts` |
| CU-11 | e2e | `e2e/destinations.spec.ts` |
| CU-12 | e2e | `e2e/destinations.spec.ts` |
| CU-13 | e2e | `e2e/destinations.spec.ts` |
| DV-09 | unit | `src/lib/flags.test.ts` |
| DV-10 | unit | `src/test/static-destinations.test.ts` |
| DV-11 | e2e | `e2e/destinations.spec.ts` |

## Review checklist

- [x] Alineado con `specs/mission.md` y Fase 10 del roadmap
- [x] Test traceability definida
- [x] Sin contradicción con capabilities en `openspec/specs/`
- [x] `breaking: false` en `.openspec.yaml`
- [x] Aprobado para implementar
