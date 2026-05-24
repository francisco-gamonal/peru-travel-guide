## Why

El proceso SDD actual funciona bien para entregar features, pero carece de convenciones explícitas para trazabilidad spec → test, versionado semántico de capabilities y una política de breaking changes. Sin estas convenciones, cada feature nuevo depende de la memoria del autor para ser rastreable; a medida que crecen los destinos y capabilities, el historial de decisiones en el archive deja de ser suficiente para auditar qué cambió, cuándo y por qué. Formalizarlo ahora, antes del próximo ciclo de features, establece el piso mínimo para operar como un equipo profesional.

## What Changes

- Crear `specs/sdd-conventions.md`: nuevo archivo de constitución con las convenciones del proceso SDD (Scenario IDs, semver de capabilities, review gate, breaking flag, changelog, performance budget).
- Actualizar `specs/tech-stack.md`: agregar referencia a `specs/sdd-conventions.md` en la sección "Desarrollo y gobernanza".
- Actualizar `specs/roadmap.md`: registrar Fase 6 — SDD Governance como completada al archivar este cambio.
- Actualizar `openspec/config.yaml`: incluir `specs/sdd-conventions.md` en el bloque `context:` para que el agente lo lea en cada proposal futuro.
- Agregar script `changelog:generate` en `package.json` (script Node mínimo que compila `CHANGELOG.md` desde los `proposal.md` archivados).
- Crear capability `sdd-governance` en `openspec/specs/`: spec normativa que rige el proceso de desarrollo del propio repositorio.
- Actualizar capability `project-constitution`: agregar `specs/sdd-conventions.md` como archivo de constitución requerido.

## Capabilities

### New Capabilities

- `sdd-governance`: convenciones del proceso SDD aplicadas a este repositorio (Scenario IDs, semver, review gate, breaking flag, changelog, performance budget objetivo).

### Modified Capabilities

- `project-constitution`: la constitución del producto ahora requiere cuatro archivos en `specs/` (añadir `sdd-conventions.md` a la lista normativa).

## Impact

- No hay cambios en `src/` ni en rutas de la aplicación; este cambio es exclusivamente de proceso y constitución.
- No se requieren tests unitarios ni E2E nuevos (sin código de aplicación).
- El `openspec/config.yaml` actualizado afecta al contexto inyectado en **todos los cambios futuros**: el agente leerá las convenciones antes de proponer.
- El script `changelog:generate` es un script Node en `scripts/`; no añade dependencias de producción.
- La capability `sdd-governance` no aplica a `src/lib/` y por tanto no requiere cobertura Vitest.
