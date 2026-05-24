## MODIFIED Requirements

### Requirement: Carpeta constitucional en la raíz del proyecto

El repositorio MUST incluir el directorio `specs/` en la raíz del proyecto con los archivos `mission.md`, `tech-stack.md`, `roadmap.md` y `sdd-conventions.md` como constitución del producto bajo spec-driven development.

#### Scenario: Agente inicia un cambio de producto

- **WHEN** un agente ejecuta `/opsx:propose` o `/opsx:apply`
- **THEN** puede leer `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md` y `specs/sdd-conventions.md` para alinear decisiones

#### Scenario: Carpeta o archivos ausentes

- **WHEN** falta `specs/` en la raíz o alguno de los cuatro archivos constitucionales
- **THEN** el repositorio no cumple la capability `project-constitution`

#### Scenario: No confundir con OpenSpec capabilities

- **WHEN** se buscan specs normativas de capabilities OpenSpec
- **THEN** se consultan bajo `openspec/specs/<capability>/spec.md`, no bajo `specs/` de la raíz

### Requirement: Integración con config de OpenSpec

`openspec/config.yaml` MUST referenciar `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md` y `specs/sdd-conventions.md` en el bloque `context` sin duplicar el contenido completo de esos archivos.

#### Scenario: Generación de proposal con convenciones

- **WHEN** se crea un `proposal.md` de cualquier capability
- **THEN** el `context` de `openspec/config.yaml` indica que se deben respetar tanto la constitución de producto en `specs/` como las convenciones de proceso en `specs/sdd-conventions.md`
