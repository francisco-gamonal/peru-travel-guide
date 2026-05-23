## Context

El repositorio `astro` contiene configuración de OpenSpec (`openspec/config.yaml`, spec `artifact-language-policy`) pero no constitución de producto ni código de aplicación. El `proposal.md` de este cambio define tres especificaciones en `specs/` (raíz), redactadas de forma **interactiva y secuencial**, no un documento monolítico bajo `openspec/`.

**Distinción de rutas:**

| Ruta | Contenido |
|------|-----------|
| `specs/` (raíz) | Constitución del producto: `mission.md`, `tech-stack.md`, `roadmap.md` |
| `openspec/specs/` | Capabilities normativas de OpenSpec (p. ej. `artifact-language-policy`) |

## Goals / Non-Goals

**Goals:**

- Crear `specs/` en la raíz con tres archivos independientes y contenido validado con el usuario.
- Imponer orden de redacción: `mission.md` → `tech-stack.md` → `roadmap.md`.
- Referenciar los tres archivos desde `openspec/config.yaml` sin duplicar su contenido.
- Sincronizar la capability `project-constitution` en `openspec/specs/` al archivar.

**Non-Goals:**

- Crear `openspec/CONSTITUTION.md`.
- Rellenar los tres archivos sin interacción (no usar plantillas genéricas sin validación).
- Inicializar el proyecto Astro en este cambio (pertenece a una fase del roadmap).
- Detallar features de producto (cada una será un cambio OpenSpec aparte).

## Decisions

### 1. Carpeta `specs/` en la raíz del repositorio

**Decisión:** Los archivos constitucionales viven en `specs/mission.md`, `specs/tech-stack.md` y `specs/roadmap.md`.

**Rationale:** Visibles junto al futuro código de la app; el usuario itera por dominio sin un Markdown gigante.

**Alternativa descartada:** `openspec/CONSTITUTION.md` — menos visible para no-usuarios de OpenSpec y peor para el flujo interactivo por sección.

### 2. Flujo interactivo obligatorio

```
┌──────────────┐     validación      ┌─────────────────┐     validación      ┌──────────────┐
│ mission.md   │ ─────────────────▶ │ tech-stack.md   │ ─────────────────▶ │ roadmap.md   │
│  (1º)        │      usuario         │  (2º)           │      usuario         │  (3º)        │
└──────────────┘                      └─────────────────┘                      └──────────────┘
```

- Cada paso: el agente propone borrador → el usuario confirma o corrige → solo entonces se escribe el archivo y se pasa al siguiente.
- `tech-stack.md` MUST reflejar decisiones ya acordadas en `mission.md`.
- `roadmap.md` MUST ser coherente con misión y stack (p. ej. no planificar `React` islands si la misión excluye interactividad compleja).

### 3. Contenido esperado por archivo

| Archivo | Contenido mínimo |
|---------|------------------|
| `specs/mission.md` | Propósito del producto, usuarios objetivo, principios (spec-driven, calidad), qué queda fuera de alcance inicial |
| `specs/tech-stack.md` | Framework (`Astro`), lenguaje (`TypeScript`), estilos, `pnpm`, `OpenSpec`, Git + Conventional Commits, deploy objetivo |
| `specs/roadmap.md` | Fases numeradas con entregables y criterios de salida (Foundation → Scaffold → Core site → Spec-driven features → Production) |

Los valores concretos se acuerdan en la sesión interactiva; el design no fija copy final.

### 4. Integración con `openspec/config.yaml`

**Decisión:** Extender el bloque `context` existente con:

- Rutas a los tres archivos constitucionales.
- Instrucción de leerlos antes de proponer o implementar cambios.
- Mantener la política de idioma de `artifact-language-policy` (narrativa en español, términos técnicos en inglés).

**Rationale:** Una sola fuente por archivo; `config.yaml` solo enlaza, no copia párrafos enteros.

### 5. Actualización futura

Cambios sustanciales a misión, stack o roadmap requieren un cambio OpenSpec dedicado (salvo typos). Los archivos en `specs/` son la fuente de verdad del producto; `openspec/specs/project-constitution/` define las reglas de cómo deben mantenerse.

## Risks / Trade-offs

- **[Riesgo] Confusión `specs/` vs `openspec/specs/`** → Mitigación: tabla en `proposal.md` y referencia explícita en `config.yaml`.
- **[Riesgo] Saltarse el orden interactivo** → Mitigación: tasks numeradas por fase; apply pausa entre archivos.
- **[Trade-off] Tres archivos vs uno** → Más mantenimiento, mejor alineación con el usuario en cada decisión.

## Migration Plan

1. Crear directorio `specs/` en la raíz.
2. Sesión interactiva: redactar y validar `mission.md`.
3. Sesión interactiva: redactar y validar `tech-stack.md`.
4. Sesión interactiva: redactar y validar `roadmap.md`.
5. Actualizar `openspec/config.yaml`.
6. `openspec validate add-project-constitution` → archivar con sync de `project-constitution`.

## Open Questions

- Audiencia y tipo de sitio (blog, portfolio, producto) — se resuelven en la sesión de `mission.md`.
- `React` islands vs solo componentes Astro — se resuelven en `tech-stack.md`.
