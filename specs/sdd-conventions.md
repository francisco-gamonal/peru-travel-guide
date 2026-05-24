# Convenciones SDD

> Convenciones del proceso **spec-driven development** para este repositorio. Complementa `specs/mission.md` (producto), `specs/tech-stack.md` (herramientas) y `specs/roadmap.md` (fases). La capability normativa vive en `openspec/specs/sdd-governance/spec.md`.

**Ámbito:** Aplica a todos los cambios OpenSpec creados **después de la Fase 6 — SDD Governance**. Los cambios archivados antes de esa fase no se retroadaptan.

---

## Scenario IDs

Cada escenario en delta specs (`openspec/changes/<change>/specs/`) y en specs principales (`openspec/specs/<capability>/spec.md`) MUST tener un identificador único.

### Formato

- Patrón: `<PREFIJO>-<NN>` (dos dígitos, p. ej. `PC-01`).
- `PREFIJO`: 2–4 letras en mayúsculas, único por capability.
- `NN`: secuencial por capability; no reutilizar IDs obsoletos.

### En el spec

```markdown
#### Scenario: PC-01 — Referentes disponibles en build

- **ID:** `PC-01`
- **WHEN** se ejecuta `pnpm build`
- **THEN** los referentes peruanos están disponibles sin error de validación
```

### En tests

```typescript
// @spec PC-01
it('referentes disponibles en build', () => { ... });
```

```typescript
// e2e/destinations.spec.ts
// @spec PC-07
test('cambiar destino actualiza comparación', async ({ page }) => { ... });
```

### Tabla de prefijos (capabilities actuales)

| Capability | Prefijo |
|------------|---------|
| `project-constitution` | PCO |
| `artifact-language-policy` | ALP |
| `astro-app-scaffold` | AAS |
| `population-comparison` | PC |
| `destination-climate` | DC |
| `destination-culture` | CU |
| `test-harness` | TH |
| `production-deploy` | PD |
| `sdd-governance` | SG |
| `performance-budget` | PB |
| `destination-visuals` | DV |

Al crear una capability nueva, registrar su prefijo en esta tabla mediante un cambio OpenSpec.

### Trazabilidad en `design.md`

Todo `design.md` que añada o modifique escenarios MUST incluir:

```markdown
## Test traceability

| Spec ID | Tipo | Archivo |
|---------|------|---------|
| PC-08 | unit | `src/lib/population.test.ts` |
| PC-09 | e2e | `e2e/destinations.spec.ts` |
```

Si un escenario no tiene test automatizado, documentar en `tasks.md` la verificación manual.

---

## Semver de capabilities

Cada `openspec/specs/<capability>/spec.md` MUST comenzar con cabecera YAML:

```yaml
---
version: "1.0.0"
capability: population-comparison
---
```

### Reglas de bump (al archivar un cambio)

| Cambio en el delta | Bump |
|--------------------|------|
| Solo `ADDED` (requisitos o escenarios nuevos) | **MINOR** (`1.0.0` → `1.1.0`) |
| `MODIFIED` que altera comportamiento observable | **MINOR** o **MAJOR** según impacto |
| `REMOVED` o contrato roto (URL, shape JSON, UI obligatoria) | **MAJOR** (`1.1.0` → `2.0.0`) |
| Solo aclaración de redacción, mismo comportamiento | **PATCH** (`1.1.0` → `1.1.1`) |

El autor actualiza `version:` en el spec main al sincronizar deltas en `/opsx:archive`.

---

## Review gate

Antes de `/opsx:apply`, el `design.md` MUST incluir al final:

```markdown
## Review checklist

- [ ] Alineado con `specs/mission.md` y `specs/roadmap.md`
- [ ] Test traceability definida (si hay escenarios nuevos)
- [ ] Sin contradicción con capabilities en `openspec/specs/`
- [ ] Aprobado para implementar
```

El agente o implementador MUST tener todos los items marcados (`- [x]`) o confirmación explícita del autor antes de escribir código.

---

## Breaking changes

En `.openspec.yaml` de cada cambio:

```yaml
schema: spec-driven
created: 2026-05-24
breaking: false
```

| Valor | Efecto |
|-------|--------|
| `breaking: false` | Cambio aditivo o interno |
| `breaking: true` | Obligatorio: `## Migration Guide` en `design.md` + bump **MAJOR** en la capability afectada |

Ejemplos de breaking: renombrar `id` en `destinations.json`, eliminar ruta `/destino/<id>/`, cambiar campos obligatorios en datos curados.

---

## Changelog

Tras archivar uno o más cambios:

```bash
pnpm changelog:generate
```

Genera `CHANGELOG.md` desde `openspec/changes/archive/*/proposal.md`, ordenado por fecha del prefijo de carpeta (`YYYY-MM-DD-<name>`). Commitear `CHANGELOG.md` si se publica una release.

---

## Performance budget

Umbrales objetivo para rutas públicas (medición post-`pnpm build`, p. ej. Lighthouse o Web Vitals en preview):

| Métrica | Umbral | Rutas |
|---------|--------|-------|
| **LCP** | ≤ 2.5 s | `/`, `/destino/[id]/` |
| **CLS** | ≤ 0.1 | `/`, `/destino/[id]/` |
| **INP** | ≤ 200 ms | `/`, `/destino/[id]/` |

Cambios que toquen páginas, CSS o assets MUST documentar en `design.md`:

```markdown
## Performance impact

- Rutas afectadas: …
- Riesgo: bajo / medio / alto
- Mitigación: …
```

La medición automática en CI MUST cumplir la capability `performance-budget` en `openspec/specs/performance-budget/spec.md` (Lighthouse CI con `@lhci/cli` en `.github/workflows/ci.yml`). Umbrales con gate duro en CI: **LCP** y **CLS**; **INP** se valida manualmente en preview hasta soporte estable en LHCI headless.

Para reproducir localmente:

```bash
ASTRO_BASE=/peru-travel-guide/ pnpm build
ASTRO_BASE=/peru-travel-guide/ pnpm lhci
```

---

## Trazabilidad ejecutable

Tras un cambio OpenSpec activo con tabla `## Test traceability` en `design.md`:

```bash
pnpm spec:traceability
```

El script verifica que cada Spec ID listado tenga `// @spec <ID>` en el archivo indicado. Se ejecuta en `pnpm test:verify:push`, CI y antes de archivar cuando hay un único cambio activo.

---

## Flujo resumido (feature post-Fase 6)

1. Leer `specs/mission.md`, `roadmap.md`, `sdd-conventions.md`.
2. `/opsx:propose <nombre>` — escenarios con IDs, `breaking: false` en `.openspec.yaml`.
3. Completar `design.md` + Review checklist + Test traceability.
4. `/opsx:apply` — código y tests con `// @spec <ID>`.
5. `pnpm test:verify` (si hay cambios en `src/`).
6. `openspec validate <nombre>` (también en `pre-commit` si hay cambio activo).
7. `pnpm spec:traceability` cuando la tabla de trazabilidad esté completa.
8. `/opsx:archive` — sync specs, bump semver, `pnpm changelog:generate`.
