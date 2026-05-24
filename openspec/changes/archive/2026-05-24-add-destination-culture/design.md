## Context

- Ficha `/destino/<id>/` con widgets compactos: `PopulationComparison`, `ClimateAndSeasons` (post-refactors).
- Pie actual: «Próximamente: cultura…» en `ComparisonLayout.astro`.
- Patrón establecido: JSON estático por `destination.id`, lib testeable, props en `getStaticPaths`, sección con `aria-labelledby`.
- Misión: cultura **práctica y respetuosa** (principio 5), no estereotipada.

## Goals / Non-Goals

**Goals:**

- Bloque «Cultura y consejos prácticos» en destinos curados (mín. Madrid, CDMX, Buenos Aires).
- Widget **único** (`<article>`): resumen + lista densa de consejos por tema + pie de fuente (sin tarjetas apiladas).
- Orden en página: selector → población → clima → cultura.
- Copy de página que unifique la narrativa («guía personal»).
- Coherencia al cambiar destino (E2E).
- Criterio roadmap: usuario percibe guía integrada, no panel de datos sueltos.

**Non-Goals:**

- Calendario de festivales detallado, gastronomía exhaustiva o mapas.
- Reservas, pagos, asesoría legal/sanitaria oficial.
- Refactor adicional de población/clima (salvo copy/meta en layout).
- Deploy/CI (Fase 5).

## Decisions

### 1. Datos estáticos `src/data/culture.json`

**Decisión:** Entradas keyed por `destinationId` alineado a `destinations.json`.

**Campos mínimos por destino:**

- `summary`: párrafo orientativo en español (tono respetuoso, para viajero desde Perú/Lima).
- `tips[]`: `{ title, body }` (3–6 ítems: comunicación, horarios, propinas/transporte, etc.).
- `source`, `year`, `sourceUrl` opcional.

**Alternativa descartada:** Mezclar en `climate.json` — dominios distintos.

### 2. Tipos y `src/lib/culture.ts`

**Decisión:** Tipos en `src/types/culture.ts`; `loadCultureData()`, `getCultureByDestinationId(id)`, `buildCultureWidgetView(culture)` para filas de tips y `sourceFooter`.

Validación en `culture.validation.test.ts` (mismo patrón que clima).

### 3. UI `CultureGuide.astro`

**Decisión:** Una `<section aria-labelledby="culture-heading">` con un `<article>`:

- `h2#culture-heading` «Cultura y consejos prácticos»
- Resumen + disclaimer breve (orientación general, no sustituye investigación local).
- `h3` «Consejos prácticos» → `<ul>` compacto (título + cuerpo en pocas líneas).
- Footer con fuente/año (enlace si `sourceUrl`).

Estado vacío: mensaje en un solo bloque si no hay datos.

### 4. Integración y guía unificada

**Decisión:** `ComparisonLayout` recibe prop `culture`; `[id].astro` carga cultura en `getStaticPaths`.

- Quitar párrafo «Próximamente: cultura».
- Actualizar intro del `<header>` y meta para mencionar cultura.
- Mantener `gap-8` entre widgets; sin tabs ni mezcla de dominios en un solo componente.

### 5. Contenido editorial (MVP)

**Decisión:** Textos curados manualmente; evitar generalizaciones negativas o estereotipos; enfocar en utilidad (saludos, horarios de comida, transporte, seguridad general).

### 6. Pruebas

| Capa | Qué |
|------|-----|
| Vitest | `loadCultureData`, `getCultureByDestinationId`, `buildCultureWidgetView`, validación JSON |
| Static | HTML `/destino/madrid/` contiene `#culture-heading` y texto cultural clave |
| E2E | Sección cultura visible; selector actualiza cultura al cambiar destino |

### 7. Specs y roadmap

Al archivar: sync `destination-culture` a main; delta `destination-climate` (quitar «sin cultura»); marcar Fase 4 ✅ en `specs/roadmap.md`.

## Risks / Trade-offs

| Riesgo | Mitigación |
|--------|------------|
| Contenido cultural sensible | Revisión editorial; tips prácticos; disclaimer |
| Página más larga | Widget único compacto; sin tarjetas repetidas |
| Solapamiento con «mejores épocas» | Cultura ≠ calendario; clima conserva ventanas de viaje |

## Migration Plan

1. JSON + types + lib + tests.
2. `CultureGuide.astro` + layout + `[id].astro`.
3. E2E/static; meta/copy.
4. `pnpm test:verify`; sync specs; roadmap.

## Open Questions

- ¿Incluir comparación cultural Perú↔destino? **Propuesta:** no en v1; el referente peruano ya está en población.
- ¿Iconos por tip? **Propuesta:** no; lista textual basta para MVP.
