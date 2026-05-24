## Why

La Fase 1 (scaffold Astro) está completada, pero la home sigue siendo un placeholder: no cumple el núcleo de `specs/mission.md` — comparar la escala humana de un destino con **Perú**, **Lima** y distritos relevantes. Sin esta comparación poblacional (MVP de Fase 2), el producto no entrega valor al viajero peruano.

## What Changes

- Añadir datos de referencia peruanos (país, provincia de Lima, distritos seleccionados) y al menos **un destino internacional de prueba** con población de ciudad y país.
- Implementar flujo en la home: el usuario elige un destino (selector o lista curada en MVP) y ve comparación visual y numérica de habitantes frente a los referentes.
- Incluir ratios o frases comprensibles (p. ej. «X veces la población de Lima») además de cifras absolutas.
- Mostrar fuente y año de los datos en la UI.
- Actualizar `src/pages/index.astro` para integrar la comparación (sustituye el mensaje «en construcción» de Fase 1).
- Actualizar `specs/roadmap.md`: Fase 2 en curso vía este cambio.

## Capabilities

### New Capabilities

- `population-comparison`: Selección de destino, datos de población (ciudad y país), referentes peruanos, visualización comparativa y atribución de fuentes.

### Modified Capabilities

- `astro-app-scaffold`: La home deja de ser solo placeholder; MUST integrar el flujo de comparación poblacional definido en `population-comparison`.

## Impact

- Nuevos módulos en `src/` (datos estáticos, tipos, componentes Astro, utilidades de comparación).
- Posible `src/data/` con JSON curado (INEI y fuentes internacionales documentadas).
- Sin backend ni base de datos en este MVP (datos en build, alineado con `specs/tech-stack.md`).
- Sin clima, cultura ni mejores épocas (Fases 3–4).
- Sin React islands salvo que el diseño lo exija explícitamente (preferir Astro + HTML forms/query en MVP).
