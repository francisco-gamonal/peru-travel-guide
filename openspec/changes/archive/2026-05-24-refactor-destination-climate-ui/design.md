## Context

- `ClimateAndSeasons.astro` envuelve todo en `section[aria-labelledby="climate-heading"]` pero el contenido con datos son **tres** `<div class="rounded-xl ...">` (resumen, estaciones, mejores épocas) más `SourceAttribution` suelto.
- Tras `refactor-population-comparison-ui`, población ya es un widget único; clima sigue siendo el cuello de botella de scroll en móvil.
- Spec `destination-climate` exige resumen, estaciones, mejores épocas y fuente; no exige una tarjeta por bloque.
- E2E usa `section[aria-labelledby="climate-heading"]` y snippets de texto (Madrid, CDMX, Buenos Aires).

## Goals / Non-Goals

**Goals:**

- Un solo contenedor visual (`<article>` dentro de la section) con `h2#climate-heading`, resumen y disclaimer en el encabezado.
- Subsección **Estaciones** en tabla compacta (`<table>` o grid) con columnas: estación, temperatura, lluvia; descripción en segunda línea o tooltip textual visible sin tarjeta extra.
- Subsección **Mejores épocas** en lista densa (etiqueta + meses + motivo en bloque corto), con acento visual suave (fondo emerald) integrado en el mismo article, no tarjeta flotante separada.
- Fuente climática al pie del widget (mismo patrón que `PopulationComparison`).
- Reducir altura ~35–45 % del bloque climático en viewport móvil (~390px) respecto al layout actual.
- Mantener accesibilidad: `aria-labelledby`, encabezados `h3` para subsecciones, estado vacío sin datos.

**Non-Goals:**

- Cambiar `climate.json`, tipos ni validación de dominio.
- Gráficos de precipitación, Chart.js o tabs que mezclen población y clima.
- Cultura (Fase 4) ni reordenar población/clima en la página.

## Decisions

### 1. Modelo de vista en `climate.ts`

**Decisión:** Añadir:

```ts
export interface ClimateSeasonRow {
  name: string;
  tempRangeC: string;
  rainfall: string;
  description: string;
}

export interface ClimateBestTimeRow {
  label: string;
  monthsFormatted: string;
  reason: string;
}

export interface ClimateWidgetView {
  summary: string;
  seasons: ClimateSeasonRow[];
  bestTimes: ClimateBestTimeRow[];
  sourceFooter: { source: string; year: number; sourceUrl?: string };
}
```

`buildClimateWidgetView(climate: ClimateDestination): ClimateWidgetView` centraliza `formatMonthRange` por ventana.

**Alternativa descartada:** Formatear en la plantilla Astro — dificulta tests y duplica lógica.

### 2. Widget único en `ClimateAndSeasons.astro`

**Decisión:** Una `<article class="rounded-xl border ...">` con:

- **Header:** `h2#climate-heading`, `summary`, disclaimer de una línea.
- **`h3` «Estaciones»** → `<table class="w-full text-sm">` con `<caption class="sr-only">` o `aria-label`; filas con `name`, `tempRangeC · rainfall`, y `description` en `<td colspan="3" class="text-slate-600">` debajo de la fila principal (patrón fila expandida compacta) **o** descripción truncada a una línea con `title` para lectura completa.
- **`h3` «Mejores épocas para viajar»** → `<ul>` con ítems de dos líneas máximo (sin tarjeta emerald separada).
- **Footer:** fuente + año (+ enlace si `sourceUrl`).

Estado vacío: mantener un solo bloque con borde discontinuo (sin tres tarjetas).

### 3. Atribución de fuente

**Decisión:** Pie del widget, texto `text-xs`, enlace opcional. No usar `SourceAttribution` como hermano suelto fuera del article (puede reutilizarse el markup internamente o inline en footer).

Cumple escenario de atribución climática existente.

### 4. Accesibilidad

- Conservar `section[aria-labelledby="climate-heading"]`.
- Tabla de estaciones con `<th scope="col">` para Estación, Temperatura, Lluvia.
- Subsección mejores épocas: `ul role="list"`.

### 5. Pruebas

| Capa | Cambio |
|------|--------|
| Unit | `buildClimateWidgetView` formatea meses y expone filas |
| E2E | Mismos selectores `climateSection` y snippets; opcional comprobar un solo `article` dentro de la section |
| Static | HTML de `/destino/madrid/` contiene `#climate-heading` y texto climático clave |

## Risks / Trade-offs

| Riesgo | Mitigación |
|--------|------------|
| Descripciones de estación menos prominentes | Segunda fila en tabla o `title`; contenido sigue en DOM para E2E |
| Tabla estrecha en móvil | `text-sm`, columnas apilables con `sm:table` o grid responsive |
| E2E frágiles | Mantener `aria-labelledby` y snippets de texto, no contar tarjetas |

## Migration Plan

1. Implementar `buildClimateWidgetView` + tests.
2. Reescribir `ClimateAndSeasons.astro` (widget único).
3. Ajustar E2E solo si fallan selectores.
4. `pnpm test:verify` → archive.

## Open Questions

- ¿Tabla HTML vs grid Tailwind para estaciones? **Propuesta:** tabla semántica en desktop; en móvil filas apiladas con `display: block` en `<tr>` si hace falta — priorizar una sola columna legible antes que tres tarjetas.
- ¿Conservar fondo emerald en mejores épocas? **Propuesta:** banda ligera `bg-emerald-50/50` solo en la subsección interna del article, no tarjeta con borde propio.
