## Context

- `buildComparisonRows()` devuelve una lista plana: ciudad destino, país destino, Perú, Lima, distritos.
- UI actual: 5+ `<li>` con borde, barra y fuente cada uno → scroll excesivo antes de clima.
- Spec exige barras + números + ratio + fuentes; no exige una tarjeta por entidad.

## Goals / Non-Goals

**Goals:**

- Un solo contenedor visual (`<section id="comparison-heading">`) con título del destino y ratio resumido.
- Subsección **Países** con comparación lado a lado (máx. 2 barras horizontales en el mismo gráfico lógico: Perú vs país destino).
- Subsección **Ciudades** con ciudad destino vs provincia de Lima; distritos en lista compacta (nombre + cifra, sin barra individual opcional o barra única compartida).
- Fuentes al final del widget en `<footer>` o bloque `text-xs` agrupado.
- Reducir altura ~40–50 % respecto al layout actual en viewport móvil (objetivo de diseño, verificable en apply).

**Non-Goals:**

- Cambiar `destinations.json` / `peru-references.json`.
- Gráficos interactivos, librerías de charts (Chart.js).
- Tabs que mezclen clima y población (clima sigue en sección aparte).
- Fase 4 cultura.

## Decisions

### 1. Modelo de datos en `population.ts`

**Decisión:** Añadir:

```ts
export type PopulationTier = 'country' | 'city';

export interface PopulationPairRow {
  labelLeft: string;
  labelRight: string;
  populationLeft: number;
  populationRight: number;
  sourceLeft: string;
  sourceRight: string;
  yearLeft: number;
  yearRight: number;
  sourceUrlLeft?: string;
  sourceUrlRight?: string;
}

export interface PopulationComparisonView {
  destinationTitle: string;
  cityRatioSentence: string;
  countryPair: PopulationPairRow;  // Perú vs país destino
  cityPair: PopulationPairRow;     // Lima vs ciudad destino
  districts: PopulationPlace[];  // solo referentes distrito, compactos
  sourcesFooter: { source: string; year: number; sourceUrl?: string }[];
}
```

`buildPopulationComparisonView(destination, references)` centraliza la vista.

**Alternativa descartada:** Seguir con `buildComparisonRows` en UI — la plantilla seguiría mezclando países y ciudades.

### 2. Widget único y barras horizontales

**Decisión:** Una `<article>` con:

- Encabezado: `h2#comparison-heading`, ratio frase, disclaimer corto.
- `h3` «Por país» → fila con dos barras horizontales apiladas o agrupadas (Perú arriba, destino abajo, misma escala `max = max(populations)`).
- `h3` «Por ciudad» → mismo patrón Lima vs ciudad destino.
- Distritos: `<ul class="text-sm">` sin barra por ítem (o una barra mini opcional si cabe).
- Pie: fuentes únicas deduplicadas por `source`+`year`.

Reutilizar `barWidthPercent` y `formatPopulation`.

### 3. Atribución de fuentes

**Decisión:** Pie del widget:

> Fuentes: INEI (2023), INE España (2024), …

Enlaces cuando hay `sourceUrl`. No repetir bloque bajo cada barra.

Cumple escenario de atribución peruana a nivel de widget (sigue visible INEI para referentes).

### 4. Accesibilidad

- `aria-labelledby="comparison-heading"` en la section.
- Cada grupo de barras: `role="img"` + `aria-label` con ambas cifras.
- Contraste Tailwind existente (sky/slate).

### 5. Pruebas

| Capa | Cambio |
|------|--------|
| Unit | `buildPopulationComparisonView` agrupa país/ciudad correctamente |
| E2E | `#comparison-heading`, textos Madrid/CDMX; opcional «Por país» / «Por ciudad» |
| Static | HTML contiene subsecciones y no N repeticiones de tarjetas `rounded-xl` por fila (heurística) |

## Risks / Trade-offs

| Riesgo | Mitigación |
|--------|------------|
| Distritos menos visibles | Lista compacta con cifras; ratio principal sigue siendo Lima vs ciudad |
| E2E frágiles por copy | Usar `#comparison-heading` y regex de población, no contar `<li>` |
| Pérdida de barra por distrito | Aceptado en v1; spec prioriza país/ciudad |

## Migration Plan

1. Implementar `buildPopulationComparisonView` + tests.
2. Reescribir `PopulationComparison.astro`.
3. Ajustar E2E si hace falta.
4. `pnpm test:verify` → archive.

## Open Questions

- ¿Barras horizontales dobles (Perú/destino en el mismo track) o dos tracks separados? **Propuesta:** dos filas en el mismo bloque, escala común (más legible en móvil).
