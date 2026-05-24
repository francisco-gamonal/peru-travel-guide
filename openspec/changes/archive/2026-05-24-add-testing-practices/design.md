## Context

El proyecto es Astro 6 estático con lógica en `src/lib/population.ts`, rutas `src/pages/destino/[id].astro` y sin dependencias de test. OpenSpec `config.yaml` referencia constitución pero no menciona testing. El bug Madrid/CDMX demostró que `pnpm dev` no sustituye validación post-`build`.

## Goals / Non-Goals

**Goals:**

- Política explícita en constitución: unit tests + **cobertura global ≥ 80 %** (líneas o statements, configurado en Vitest) sobre el alcance acordado.
- E2E que verifiquen rutas estáticas generadas para todos los destinos curados.
- Reglas en `openspec/config.yaml` para que propuestas futuras incluyan tareas y specs de test cuando aplique.
- Harness ejecutable en local y preparado para CI (Fase 5).

**Non-Goals:**

- 100 % cobertura ni tests de cada componente `.astro` en v1 (priorizar `src/lib/` y smoke E2E).
- CI en GitHub Actions en este cambio (solo scripts; CI puede ser cambio posterior).
- Tests de clima/cultura (Fases 3–4).

## Decisions

### 1. Vitest para unit/integration de TypeScript

**Decisión:** Vitest con entorno `node`, tests en `src/lib/**/*.test.ts` o `tests/unit/`.

**Rationale:** Alineado con Vite/Astro; rápido; cobertura vía `@vitest/coverage-v8`.

**Umbral:** `coverage.lines` (o `statements`) **≥ 80 %** en el glob acordado: inicialmente `src/lib/**`.

### 2. Playwright para E2E

**Decisión:** Playwright; flujo `pnpm build && pnpm preview` (o `webServer` en config) y tests en `e2e/`.

**Casos mínimos:**

- `/` redirige o lleva a comparación con destino por defecto.
- `/destino/madrid/`, `/destino/cdmx/`, `/destino/buenos-aires/` muestran el nombre de ciudad en el HTML.

**Rationale:** Reproduce el fallo de static output que `dev` no detectó.

### 3. Scripts en `package.json`

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage",
"test:e2e": "playwright test"
```

**Gate recomendado (documentado en tech-stack y README):**

```bash
pnpm build && pnpm lint && pnpm test:coverage && pnpm test:e2e
```

### 4. Alcance de cobertura 80 %

**Decisión:** Fase inicial: umbral sobre `src/lib/**/*.ts` (excluir `**/*.test.ts`). Ampliar globs en cambios futuros si se añade más lógica en `src/`.

**Alternativa descartada:** 80 % sobre todo `src/` incluyendo `.astro` — costoso y frágil en MVP.

### 5. Cambios en `openspec/config.yaml`

**Decisión:** Añadir al `context` párrafo sobre testing; reglas por artefacto:

- **proposal:** si hay código de app, mencionar impacto en tests/cobertura.
- **design:** decisión de qué se prueba (unit vs E2E vs static).
- **specs:** escenarios verificables por test cuando sea posible.
- **tasks:** sección «Verificación / Tests» con `pnpm test:coverage` y E2E si hay UI o rutas.

### 6. Delta `project-constitution`

**Decisión:** MODIFIED requirement de `specs/tech-stack.md` para exigir sección de pruebas y umbrales.

## Risks / Trade-offs

- **[Riesgo] Flakiness E2E** → Mitigación: `webServer` con `preview`, timeouts razonables.
- **[Riesgo] 80 % difícil al crecer `src/lib`** → Mitigación: mantener lógica en funciones puras testeables.
- **[Trade-off] No testear `.astro` en v1** → Aceptable; E2E cubre integración visual mínima.

## Migration Plan

1. Actualizar `openspec/config.yaml` y redactar delta specs.
2. Instalar Vitest + Playwright; configurar umbrales.
3. Añadir tests unitarios de `population.ts` y E2E de destinos.
4. Actualizar `specs/tech-stack.md` y `README.md`.
5. Verificar gate completo; archivar cambio.

## Open Questions

- ¿Incluir fase explícita en `specs/roadmap.md` o tratarlo como transversal de Foundation? — Propuesta: nota transversal en roadmap, sin nueva fase numerada.
