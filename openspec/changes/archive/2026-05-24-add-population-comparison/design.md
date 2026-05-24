## Context

El repo tiene Astro 6, Tailwind 4 y una home placeholder (`src/pages/index.astro`). `specs/roadmap.md` define la Fase 2: comparación poblacional MVP con criterio de salida «al menos un destino internacional de prueba contrastado con el referente peruano». `specs/tech-stack.md` indica datos estáticos o fetch en build, fuentes **INEI** para Perú/Lima/distritos y agregadores públicos para destinos.

## Goals / Non-Goals

**Goals:**

- Permitir elegir un destino (MVP: lista curada, no geocoding libre).
- Mostrar población de **ciudad** y **país** del destino vs Perú, provincia de Lima y 2–3 distritos de Lima (p. ej. Miraflores, San Isidro, Cercado de Lima).
- Presentar comparaciones legibles: números formateados, barras proporcionales o tarjetas, y al menos una frase relativa (ratio o múltiplo).
- Atribuir fuente y año en español.
- Cumplir criterio de salida del roadmap con un destino de prueba documentado (p. ej. **Madrid, España** o **Ciudad de México, México**).

**Non-Goals:**

- Búsqueda libre de cualquier ciudad del mundo.
- APIs en tiempo real o base de datos.
- Clima, cultura, mejores épocas (Fases 3–4).
- Islas React (mantener componentes Astro).
- Autenticación, historial de búsquedas o favoritos.

## Decisions

### 1. Datos estáticos en JSON (build time)

**Decisión:** Curar `src/data/population.json` (o archivos separados `references.json` + `destinations.json`) con tipos TypeScript en `src/types/population.ts`.

**Rationale:** Alineado con «sin BD en v1»; build estático rápido; control de calidad y fuentes.

**Alternativa descartada:** Fetch a World Bank en build — añade red y fragilidad; evaluar en cambio futuro.

### 2. Referentes peruanos fijos

**Decisión:** Conjunto fijo en datos:

| Clave | Entidad |
|-------|---------|
| `peru` | Perú (país) |
| `lima-province` | Provincia de Lima |
| `lima-district-*` | 2–3 distritos con datos INEI recientes |

**Rationale:** Misión exige referente peruano primero; distritos aportan escala local familiar.

### 3. Destinos MVP: lista curada

**Decisión:** Array de destinos con `id`, `cityName`, `countryName`, `cityPopulation`, `countryPopulation`, `source`, `year`. Mínimo **1** destino internacional para salida; recomendado **2–3** para demostrar el selector.

**Destino de prueba sugerido:** Madrid (España) — ciudad y país con fuentes ONU/INE claras.

**Alternativa descartada:** Input de texto libre — requiere validación y datos no disponibles en MVP.

### 4. Flujo de UI en la home

**Decisión:** `index.astro` con formulario `GET` (`?destination=madrid`) o `<select>` que recarga la misma página; componente `PopulationComparison.astro` recibe props del destino seleccionado.

**Rationale:** Sin JS cliente obligatorio; compatible con static output; suficiente para MVP.

**Alternativa descartada:** Página `/compare/[slug]` — válida pero más rutas; se puede añadir en iteración si el formulario queda limitado.

### 5. Visualización

**Decisión:** Tarjetas con población formateada (`Intl.NumberFormat` `es-PE`) + barras horizontales normalizadas al máximo del conjunto mostrado + línea de texto con ratio respecto a Lima (provincia) como referente principal.

**Rationale:** Cumple «claridad sobre precisión absoluta» de la misión.

### 6. Formato y utilidades

**Decisión:** `src/lib/population.ts` con `formatPopulation(n)`, `ratioLabel(destination, reference)` y validación de `id` de destino.

### 7. Accesibilidad y copy

**Decisión:** Textos en español; `aria-label` en barras; pie con «Fuente: … · Año: …».

## Risks / Trade-offs

- **[Riesgo] Datos desactualizados** → Mitigación: campo `year` obligatorio en JSON; nota en UI «cifras aproximadas según fuente».
- **[Riesgo] Distritos con cifras distintas según fuente** → Mitigación: documentar URL INEI en comentario del JSON y en UI.
- **[Trade-off] Pocos destinos** → Aceptable en MVP; extensión vía más entradas JSON sin cambiar arquitectura.
- **[Trade-off] Sin búsqueda global** → Aceptable; Fase 2 solo exige un destino de prueba verificable.

## Migration Plan

1. Añadir datos y tipos.
2. Implementar utilidades y componentes.
3. Reemplazar contenido placeholder en `index.astro`.
4. Verificar `pnpm build`, `pnpm lint`, destino de prueba en navegador.
5. Actualizar roadmap al archivar el cambio.

## Open Questions

- ¿Destinos adicionales en MVP además de Madrid (p. ej. CDMX, Buenos Aires)? — Propuesta: incluir **Madrid** obligatorio y hasta 2 opcionales si el apply tiene tiempo.
- ¿Distritos exactos de Lima? — Propuesta: Miraflores, San Isidro, Cercado de Lima (ajustables con datos INEI disponibles en apply).
