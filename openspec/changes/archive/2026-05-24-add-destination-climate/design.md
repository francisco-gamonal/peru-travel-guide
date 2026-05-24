## Context

- Rutas estáticas `/destino/<id>/` con `getStaticPaths`; datos de población en JSON; UI en `ComparisonLayout` + `PopulationComparison`.
- Fase 3 del roadmap: «Misma ciudad de prueba de Fase 2 muestra clima y épocas junto a la comparación poblacional».
- `population-comparison` spec incluye requisito legacy «sin clima» — se acota la capability, no la página completa.
- MVP sin fetch en cliente: datos climáticos curados en repo, validados en build.

## Goals / Non-Goals

**Goals:**

- Bloque visible «Clima y mejores épocas» en cada destino curado (mín. Madrid, CDMX, Buenos Aires).
- Resumen en español (patrón estacional, rangos térmicos orientativos) y lista de **mejores meses** o estaciones con breve motivo.
- Atribución de fuente (p. ej. AEMET, datos agregados documentados) y año.
- Lógica testeable en `src/lib/climate.ts`; E2E post-build.

**Non-Goals:**

- Cultura, gastronomía, eventos locales detallados (Fase 4).
- API meteorológica en tiempo real o pronóstico a 14 días.
- Mapas interactivos, gráficos SVG complejos (tabla o lista es suficiente en v1).
- Cambiar el flujo de selección de destino ni las rutas existentes.

## Decisions

### 1. Datos estáticos por destino

**Decisión:** Archivo `src/data/climate.json` (o `climate-by-destination.json`) con entradas keyed por `destination.id` alineado a `destinations.json`.

**Campos mínimos por destino:**

- `summary`: párrafo corto en español.
- `seasons[]`: `{ name, tempRangeC, rainfall, description }` (2–4 estaciones).
- `bestTimeToVisit[]`: `{ label, months, reason }` (1–3 ventanas).
- `source`, `year`, `sourceUrl` (reutilizar patrón de `SourceAttribution`).

**Alternativa descartada:** Extender `destinations.json` — mezcla dominios; separar facilita validación y Fase 4.

### 2. Tipos y carga en `src/lib/climate.ts`

**Decisión:** Tipos en `src/types/climate.ts`; funciones `loadClimateData()`, `getClimateByDestinationId(id)`, `formatMonthRange(months)` si aplica.

Validación en tests (JSON schema ligero o asserts en `climate.validation.test.ts`).

### 3. UI en la ficha de destino

**Decisión:** Componente `ClimateAndSeasons.astro` recibe `climate` por props desde `[id].astro` (mismo patrón que población).

Orden en `ComparisonLayout`:

1. Header + `DestinationSelect`
2. `PopulationComparison` (sin cambios de comportamiento)
3. `ClimateAndSeasons` (nuevo)
4. Pie: quitar «Próximamente clima»; opcional «Próximamente: cultura» para Fase 4.

**Título de sección:** «Clima y mejores épocas» (`h2`).

### 4. Reglas de «mejor época» (MVP)

**Decisión:** Datos curados manualmente en JSON (no algoritmo complejo). Opcional: helper `isPeakHeat(month)` solo si simplifica tests — preferir datos explícitos `bestTimeToVisit` para transparencia.

### 5. Pruebas

| Capa | Qué |
|------|-----|
| Vitest | `loadClimateData`, `getClimateByDestinationId`, validación, formateo |
| Static | HTML de `/destino/madrid/` contiene texto climático clave |
| E2E | Madrid + al menos un destino más muestran sección clima; cambio de destino mantiene población **y** clima coherente |

### 6. SEO y meta

Actualizar `meta description` y `<title>` para mencionar guía de viaje (población + clima), sin exagerar keywords.

## Risks / Trade-offs

| Riesgo | Mitigación |
|--------|------------|
| Datos climáticos desactualizados | `year` + fuente visible; disclaimer de referencia orientativa |
| Página más larga en móvil | Secciones con espaciado Tailwind; contenido escaneable |
| Duplicar lógica con población | Capabilities separadas; props independientes en `getStaticPaths` |

## Migration Plan

1. Añadir JSON + lib + tests.
2. Componente + integración en layout.
3. Actualizar E2E/static; `pnpm test:verify`.
4. Marcar Fase 3 en `roadmap.md` al archivar.

## Open Questions

- ¿Incluir gráfico de barras de precipitación en v1? **Propuesta:** no; lista/texto basta para MVP del roadmap.
