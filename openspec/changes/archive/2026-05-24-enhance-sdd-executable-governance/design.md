## Context

La Fase 6 (`enhance-sdd-governance`) documentó Scenario IDs, semver, review gate, breaking flag, changelog y performance budget en `specs/sdd-conventions.md`. La Fase 7 (`add-destination-england`) demostró que el flujo post-governance funciona en un feature real. El análisis SDD del canvas (mayo 2026) identificó brechas **residuales** que no bloquean producto pero sí madurez del proceso:

| Brecha canvas | Estado actual | Objetivo de este cambio |
|---------------|---------------|-------------------------|
| Performance budget ejecutable (LHCI) | Umbrales solo en texto | Job CI que falle si LCP/CLS/INP superan umbrales |
| `openspec validate` en feedback loop | Manual al archivar | `pre-commit` condicional si hay cambio activo |
| Trazabilidad spec → test verificable | Convención + checklist manual | Script `pnpm spec:traceability` |

La Fase 8 (`add-destination-visual-assets`) añadirá imágenes optimizadas — el momento natural para tener LHCI **antes** de ese trabajo, no después.

## Goals / Non-Goals

**Goals:**

- Capability `performance-budget` con medición LHCI en `.github/workflows/ci.yml` (post-build, rutas `/` y `/destino/london/` como representativa post-Fase 7).
- Hook `pre-commit` ampliado: `pnpm lint` + validación OpenSpec de cambios activos en `openspec/changes/` (excluyendo `archive/`).
- Script `scripts/verify-spec-traceability.mjs` + `pnpm spec:traceability` que lea la tabla `## Test traceability` del cambio activo y compruebe `// @spec <ID>` en los archivos listados.
- Actualizar `specs/sdd-conventions.md`, `specs/tech-stack.md` y `specs/roadmap.md` (Fase 7.5).
- Registrar prefijo `PB` en tabla de Scenario IDs de `specs/sdd-conventions.md`.

**Non-Goals:**

- Retroadaptar ~15 escenarios legacy sin ID en `openspec/specs/` (política explícita post-Fase 6).
- Implementar Fase 8 (iconos/banderas).
- Automatizar el review gate humano en skills Cursor (sigue siendo checklist + confirmación).
- Medir INP en LHCI de forma estricta si el entorno headless no lo reporta de forma fiable — documentar umbral como aspiracional o usar métricas disponibles (LCP, CLS, TBT como proxy documentado).

## Decisions

### D1: LHCI en el workflow `ci.yml` existente, no en `deploy.yml`

El gate de calidad ya vive en `ci.yml` (`pnpm test:verify`). Añadir un job `lighthouse` que dependa de artefactos del build evita duplicar install y mantiene deploy.yml enfocado en Pages.

**Alternativa:** job único secuencial en `test:verify`. Descartada porque LHCI requiere servidor estático (`astro preview` o `serve dist`) y alargaría el hook local; solo CI.

### D2: Configuración `lighthouserc.cjs` con umbrales de `specs/sdd-conventions.md`

```javascript
// Umbrales (error level en assert):
// LCP ≤ 2500 ms, CLS ≤ 0.1
// Rutas: /peru-travel-guide/ y /peru-travel-guide/destino/london/
```

Usar `ASTRO_BASE=/peru-travel-guide/` en CI para reflejar GitHub Pages. Servir `dist/` con `pnpm exec serve` o `astro preview` en puerto fijo antes de `lhci autorun`.

**Alternativa:** medir solo `/` sin base path. Descartada — el sitio publicado usa subpath.

### D3: `pre-commit` condicional para OpenSpec

Script wrapper `scripts/pre-commit-openspec.sh` (o inline en `.husky/pre-commit`):

1. Si `openspec/changes/*/` tiene directorios distintos de `archive`, ejecutar `openspec validate <change>` por cada cambio activo.
2. Si no hay cambios activos, omitir (commit de docs o hotfix sin OpenSpec).

Mantener tiempo de commit ≤ ~30 s: `openspec validate` es rápido; no incluir LHCI en pre-commit.

### D4: `spec:traceability` acotado al cambio activo

El script:

1. Detecta el único directorio en `openspec/changes/` (excl. `archive`). Si hay 0 o >1, sale con mensaje claro (0 = skip OK; >1 = error listando nombres).
2. Parsea `design.md` → tabla `## Test traceability` (columnas Spec ID, Archivo).
3. Para cada fila, busca `// @spec <ID>` en el archivo indicado.
4. `process.exit(1)` si falta algún enlace.

No escanea todo `openspec/specs/` — evita falsos positivos en escenarios legacy.

**Alternativa:** lint global de todos los specs. Descartada por política de no retroadaptar.

### D5: `spec:traceability` en `test:verify:push`, no en pre-commit

El script requiere `design.md` del cambio activo; en commits intermedios puede no estar completo. Se ejecuta en `test:verify:push` y CI solo si existe cambio activo (mismo patrón condicional).

### D6: Fase 7.5 en roadmap (no renumerar Fase 8)

Insertar **Fase 7.5 — SDD Executable Governance** entre Fase 7 y Fase 8 para no invalidar referencias existentes a `add-destination-visual-assets`.

## Risks / Trade-offs

- **[Riesgo] LHCI flaky en CI** → Repetir 1 vez en caso de fallo transitorio; umbrales ligeramente por encima del budget documentado solo si el sitio actual ya falla (ajustar en apply con medición baseline).
- **[Riesgo] `pre-commit` más lento** → Solo validate cuando hay cambio activo; típicamente <5 s.
- **[Riesgo] Parser frágil de tabla markdown** → Formato fijo documentado en `specs/sdd-conventions.md`; tests unitarios del script con fixtures.
- **[Trade-off] INP no medido en LHCI headless** → Documentar en `performance-budget` spec que INP se valida manualmente en preview hasta soporte estable; LCP+CLS como gate duro en CI.

## Migration Plan

1. Implementar scripts y config LHCI en rama de trabajo.
2. Ejecutar LHCI localmente (`pnpm build && pnpm preview` + `lhci autorun`) para baseline.
3. Ajustar umbrales si el sitio actual ya cumple con margen.
4. Actualizar hooks y CI; verificar `pnpm test:verify` en verde.
5. Archivar cambio; marcar Fase 7.5 completada en roadmap.

**Rollback:** revertir job LHCI y hooks; las convenciones en `sdd-conventions.md` siguen siendo válidas como documentación.

## Open Questions

- ¿Incluir `/destino/cdmx/` además de `london` en LHCI? **Propuesta:** una ruta de destino es suficiente; `london` es el destino más reciente y representativo.
- ¿Añadir `spec:traceability` al workflow de archive skill? **Propuesta:** documentar en `tasks.md`; opcional en skill en cambio futuro.

## Test traceability

| Spec ID | Tipo | Archivo |
|---------|------|---------|
| PB-01 | unit | `src/test/lighthouse-config.test.ts` |
| PB-02 | unit | `src/test/lighthouse-config.test.ts` |
| SG-17 | unit | `src/test/spec-traceability.test.ts` |
| SG-18 | unit | `src/test/spec-traceability.test.ts` |
| TH-09 | unit | `src/test/pre-commit-openspec.test.ts` |
| TH-10 | unit | `src/test/pre-commit-openspec.test.ts` |

Nota: los escenarios TH-09/TH-10 validan la lógica del wrapper mediante tests del script, no el hook Husky en sí (verificación manual documentada en `tasks.md`).

## Performance impact

- Rutas afectadas: ninguna en `src/`; este cambio **añade** medición, no modifica UI.
- Riesgo: bajo para el producto; medio para tiempo de CI (+1–3 min por job LHCI).
- Mitigación: job paralelo a `verify`; caché de dependencias; no ejecutar LHCI en pre-commit/pre-push.

## Review checklist

- [x] Alineado con `specs/mission.md` y `specs/roadmap.md`
- [x] Test traceability definida (si hay escenarios nuevos)
- [x] Sin contradicción con capabilities en `openspec/specs/`
- [x] Aprobado para implementar
