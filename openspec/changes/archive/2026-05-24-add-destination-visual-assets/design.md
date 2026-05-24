## Context

La Fase 8 del roadmap exige banderas e iconos optimizados en selector y fichas. Hoy `DestinationSelect.astro` es un `<select>` nativo con texto (`cityName, countryName`) y `ComparisonLayout.astro` no muestra iconografía. Los cuatro destinos curados tienen datos de población, clima y cultura; la Fase 7.5 dejó LHCI activo como red de regresión LCP/CLS antes de añadir assets visuales.

Restricciones: build estático (`output: "static"`), `ASTRO_BASE=/peru-travel-guide/`, convenciones SDD post-Fase 6 (Scenario IDs `DV-*`, trazabilidad, review checklist).

## Goals / Non-Goals

**Goals:**

- Banderas de país visibles en cabecera de ficha y en el selector de destinos para los cuatro destinos curados.
- **Bandera de Perú (`PE`)** visible en la sección «Por país» del widget de comparación poblacional, junto al referente Perú.
- Assets en SVG servidos vía pipeline de Astro (`import` desde `src/assets/flags/`) con dimensiones fijas (p. ej. 24×18 px en selector, 32×24 px en cabecera).
- `alt` descriptivo en español (p. ej. «Bandera de España»).
- Campo `countryCode` (ISO 3166-1 alpha-2) en `destinations.json` como fuente de verdad del mapeo bandera.
- LHCI en verde tras el cambio; documentar impacto en performance.

**Non-Goals:**

- Banderas animadas, spritesheets complejos o CDN externo de flags.
- Iconos por ciudad distintos de la bandera nacional (solo bandera de país en esta fase).
- Rediseño completo del layout o nuevos destinos.
- Gate duro de INP en LHCI (sigue como referencia en `performance-budget`).

## Decisions

### D1: SVG importado con `astro:assets` en lugar de `<img src="/flags/...">` en `public/`

**Rationale:** SVG es vectorial, peso bajo y no requiere conversión WebP; importarlo desde `src/assets/flags/` permite hashing en build y evita rutas rotas con `ASTRO_BASE`. Alternativa descartada: emoji de bandera (sin control de renderizado, accesibilidad inconsistente).

### D2: Campo `countryCode` en `destinations.json` y constante `PE` para referente Perú

**Rationale:** Desacopla el `id` de destino (`london`) del código ISO (`GB`). Mapeo explícito: `madrid→ES`, `cdmx→MX`, `buenos-aires→AR`, `london→GB`. El referente país Perú no vive en `destinations.json` sino en `peru-references.json`; la bandera `PE` se asigna en `buildPopulationComparisonView` a la barra de país Perú y a la barra del país destino vía `destination.countryCode`. Helper `getFlagAsset(countryCode)` en `src/lib/flags.ts` con validación en tests.

### D3: Selector — lista accesible con banderas en lugar de `<select>` nativo

**Rationale:** HTML `<option>` no admite imágenes de forma fiable. Reemplazar por `<ul role="listbox">` / botones con bandera + texto, manteniendo navegación por teclado y `aria-selected`. Alternativa descartada: solo bandera en cabecera (no cumple «selector de destinos» del roadmap).

### D4: Componente `DestinationFlag.astro`

Props: `countryCode`, `size` (`sm` | `md`), `countryName` (para `alt`). Usa `Image` de `astro:assets` solo si en el futuro se añaden raster; en Fase 8 SVG inline vía `<img>` del asset importado con `width`/`height` fijos, `loading="lazy"` en selector y `loading="eager"` + `decoding="async"` en cabecera (LCP).

### D6: Bandera de Perú en barras de comparación país

**Rationale:** La misión prioriza el referente peruano; la fila «Perú» en «Por país» MUST mostrar `pe.svg` junto a la etiqueta. La fila del país destino muestra su bandera. Las filas «Por ciudad» (Lima vs ciudad destino) no llevan bandera en Fase 8 para evitar ruido visual y duplicar `PE` innecesariamente.

Extender `PopulationBarItem` con `countryCode?: string` opcional; `PopulationBarRow.astro` renderiza `DestinationFlag` cuando `countryCode` está presente.

### D5: Sin bump MAJOR en capabilities de producto existentes

Solo nueva capability `destination-visuals` (`1.0.0`) y delta menor en `project-constitution` (roadmap Fase 8).

## Risks / Trade-offs

- **[Riesgo] Regresión LCP por imagen en cabecera** → Mitigación: SVG pequeño, dimensiones explícitas, `fetchpriority="high"` solo en bandera de cabecera; verificar LHCI local y en CI.
- **[Riesgo] Selector custom menos familiar que `<select>`** → Mitigación: E2E que cubra cambio de destino; estilos claros de foco.
- **[Riesgo] Código ISO incorrecto** → Mitigación: validación Zod-like en `loadPopulationData` + test unitario por destino.

## Performance impact

- **Rutas afectadas:** `/destino/[id]/` (cabecera + selector + widget población), impacto indirecto en `/` (redirect).
- **Riesgo:** bajo — cinco SVGs (PE + cuatro destinos) < 6 KB total, sin layout shift si width/height fijos.
- **Medición:** `pnpm lhci` antes y después del apply; job `lighthouse` en CI MUST pasar (LCP ≤ 2500 ms, CLS ≤ 0.1 en `/peru-travel-guide/` y `/peru-travel-guide/destino/london/`).

## Test traceability

| Spec ID | Tipo | Archivo |
|---------|------|---------|
| DV-01 | unit | `src/lib/flags.test.ts` |
| DV-02 | unit | `src/lib/population.validation.test.ts` |
| DV-03 | static | `src/test/static-destinations.test.ts` |
| DV-04 | static | `src/test/static-destinations.test.ts` |
| DV-05 | e2e | `e2e/destinations.spec.ts` |
| DV-06 | unit | `src/test/lighthouse-config.test.ts` |
| DV-07 | unit | `src/lib/population.test.ts` |
| DV-08 | static | `src/test/static-destinations.test.ts` |

Nota: **PCO-13** (roadmap Fase 8 ✅) se verifica manualmente al archivar (`tasks.md` §4.1).

## Review checklist

- [x] Alineado con `specs/mission.md` (guía personal, claridad visual)
- [x] Test traceability definida (tabla anterior)
- [x] `## Performance impact` documentado
- [x] `breaking: false` en `.openspec.yaml`
- [x] Aprobado para implementar
