## Context

Fase 7.5 introdujo LHCI con assertions **LCP** y **CLS** (`lighthouserc.cjs`). El trade-off documentado en `enhance-sdd-executable-governance` dejó **INP** como validación manual porque LHCI headless puede no reportar `interaction-to-next-paint` de forma estable. La Fase 9.5 del roadmap pide cerrar esa brecha o formalizar la excepción.

Stack actual: `@lhci/cli` 0.14.x, Chromium Playwright vía `scripts/run-lhci.mjs`, rutas `/peru-travel-guide/` y `/destino/london/`.

## Goals / Non-Goals

**Goals:**

- Determinar en apply si INP es medible en el entorno CI/local headless.
- Si sí: assertion `interaction-to-next-paint` ≤ 200 ms en `lighthouserc.cjs`.
- Si no: actualizar specs y `sdd-conventions.md` con razón técnica (PB-07).
- Criterio de salida Fase 9.5 cumplido al archivar.

**Non-Goals:**

- Cambios en UI o interactividad de la app para “forzar” INP bajo.
- Medir INP en pre-commit/pre-push (solo CI, como LCP/CLS).
- Fase 10+ (destinos, home).

## Decisions

### D1: Audit ID `interaction-to-next-paint`

Lighthouse 10+ expone INP como **`interaction-to-next-paint`** en informes LHCI. El spike MUST confirmar presencia y valor numérico en al menos una URL bajo gate.

**Alternativa:** TBT como proxy. Descartada salvo fallback documentado en PB-07 — no es INP.

### D2: Rama A — INP en gate (si spike OK)

Añadir en `lighthouserc.cjs`:

```javascript
'interaction-to-next-paint': ['error', { maxNumericValue: THRESHOLDS.inpMs }],
```

Actualizar `specs/sdd-conventions.md`: INP pasa a gate duro junto a LCP/CLS.

### D3: Rama B — INP manual (si spike falla)

No modificar assertions. Delta `performance-budget` PB-07 exige sección en `design.md` y nota en `sdd-conventions.md` con razón (p. ej. audit ausente o `null` en headless). Fase 9.5 igual se considera completada si el criterio de salida del roadmap (“gate **o** documentado por qué manual”) se cumple.

### D4: Tests en `lighthouse-config.test.ts`

- **PB-06**: si Rama A — config incluye `interaction-to-next-paint` y umbral 200.
- **PB-07**: si Rama B — test verifica que `design.md` / spec documentan excepción; o test de que config NO incluye INP gate pero spec PB-07 escenario pasa.

El apply elige rama según spike; tasks.md incluye ambas rutas marcando la no usada como N/A.

### D5: Sin bump MAJOR

Solo MINOR en `performance-budget` (`1.0.0` → `1.1.0`) y MINOR en `project-constitution` (PCO-16).

## Risks / Trade-offs

- **[Riesgo] INP flaky en CI** → Mitigación: spike con 1 run como LCP/CLS; si flaky, Rama B.
- **[Riesgo] Sitio estático con INP siempre 0/N/A** → Gate trivial; aceptable como regresión detector.

## Spike (2026-05-24)

Comando: `ASTRO_BASE=/peru-travel-guide/ pnpm build && ASTRO_BASE=/peru-travel-guide/ pnpm lhci`.

| Aspecto | Resultado |
|---------|-----------|
| Exit code | `0` — `Done running autorun` |
| URLs medidas | `/peru-travel-guide/destino/madrid/`, `/peru-travel-guide/destino/london/` |
| Assertions LCP/CLS | Pasaron |
| `interaction-to-next-paint` en viewer LHCI | **No aparece** en métricas comparadas (solo FCP, TBT, Speed Index, TTI) |
| Valor numérico INP | **No observable** en informe headless sin interacción simulada |

Conclusión: LHCI headless sobre páginas estáticas sin interacción de usuario **no reporta INP de forma fiable** para gate automático. Criterio D1 (presencia + valor numérico) **no cumplido**.

## Rama elegida: B (INP manual documentado)

- **No** añadir assertion `interaction-to-next-paint` en `lighthouserc.cjs`.
- Actualizar `specs/sdd-conventions.md` con referencia a este spike.
- Escenario **PB-07** verificable en tests; **PB-06** N/A (spike negativo).

## Test traceability

| Spec ID | Tipo | Archivo |
|---------|------|---------|
| PB-07 | unit | `src/test/lighthouse-config.test.ts` |

PB-06 N/A (spike negativo; Rama B).

## Review checklist

- [x] Alineado con `specs/mission.md` (proceso/CI, sin producto)
- [x] Alineado con `specs/roadmap.md` (Fase 9.5)
- [x] Test traceability definida
- [x] Sin contradicción con PB-03/PB-04 existentes
- [x] `breaking: false` en `.openspec.yaml`
- [x] Aprobado para implementar

## Performance impact

- Rutas afectadas: ninguna en UI; solo medición CI.
- Riesgo: bajo para producto; medio para pipeline si INP flaky.
- Mitigación: Rama B documentada.
