---
version: "1.1.0"
capability: project-constitution
---

# project-constitution Specification

## Purpose
TBD - created by archiving change add-project-constitution. Update Purpose after archive.
## Requirements
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

### Requirement: Archivo specs/mission.md

El archivo `specs/mission.md` MUST existir y describir el propósito del producto, usuarios objetivo, principios de desarrollo (incluido spec-driven development) y criterios de calidad.

#### Scenario: Contenido de misión

- **WHEN** un desarrollador o agente lee `specs/mission.md`
- **THEN** entiende por qué existe el proyecto y que las features se implementan tras el flujo OpenSpec (`proposal` → `specs` → `design` → `tasks`)

### Requirement: Archivo specs/tech-stack.md

El archivo `specs/tech-stack.md` MUST existir y listar las tecnologías y convenciones acordadas (framework, lenguaje, herramientas, workflow de specs, commits, **pruebas unitarias**, **cobertura mínima del 80 %** en el alcance definido, **pruebas E2E**, y **hooks Git** con la estrategia pre-commit / pre-push / CI).

#### Scenario: Referencia de stack en implementación

- **WHEN** un task propone añadir una dependencia no reflejada en `specs/tech-stack.md`
- **THEN** el agente SHOULD señalar la discrepancia y sugerir actualizar el stack mediante un cambio OpenSpec

#### Scenario: Stack incluye testing

- **WHEN** un agente o desarrollador consulta `specs/tech-stack.md` para calidad de código
- **THEN** encuentra herramientas de test (Vitest, Playwright), scripts `pnpm test` / `pnpm test:coverage` / `pnpm test:e2e` y el umbral de cobertura del 80 %

#### Scenario: Stack incluye hooks Git

- **WHEN** un desarrollador consulta `specs/tech-stack.md` para el flujo local antes de subir código
- **THEN** encuentra qué ejecuta `pre-commit` (`pnpm lint`), `pre-push` (`pnpm test:verify:push`) y el gate completo `pnpm test:verify` para CI/archive

### Requirement: Archivo specs/roadmap.md

El archivo `specs/roadmap.md` MUST existir y definir fases numeradas con nombre, entregables y criterio de salida verificable por fase.

#### Scenario: Fases mínimas del roadmap

- **WHEN** se revisa `specs/roadmap.md`
- **THEN** incluye al menos las fases Foundation, Scaffold, Core site, Spec-driven features y Production en orden lógico

#### Scenario: Progreso de fase

- **WHEN** se completa una fase del roadmap
- **THEN** puede actualizarse en `specs/roadmap.md` o documentarse en un cambio archivado sin borrar el historial de fases anteriores

### Requirement: Orden interactivo de redacción

Los tres archivos constitucionales MUST redactarse en orden estricto: primero `specs/mission.md`, luego `specs/tech-stack.md`, después `specs/roadmap.md`. No MUST avanzarse al siguiente archivo sin validación explícita del usuario sobre el anterior.

#### Scenario: Inicio del flujo

- **WHEN** comienza la implementación de este cambio
- **THEN** solo se trabaja en `specs/mission.md` hasta que el usuario confirme su contenido

#### Scenario: Transición a tech-stack

- **WHEN** `specs/mission.md` está validado por el usuario
- **THEN** puede iniciarse la redacción interactiva de `specs/tech-stack.md`

#### Scenario: Transición a roadmap

- **WHEN** `specs/tech-stack.md` está validado por el usuario
- **THEN** puede iniciarse la redacción interactiva de `specs/roadmap.md`

### Requirement: Integración con config de OpenSpec

`openspec/config.yaml` MUST referenciar `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md` y `specs/sdd-conventions.md` en el bloque `context` sin duplicar el contenido completo de esos archivos.

#### Scenario: Generación de proposal con convenciones

- **WHEN** se crea un `proposal.md` de cualquier capability
- **THEN** el `context` de `openspec/config.yaml` indica que se deben respetar tanto la constitución de producto en `specs/` como las convenciones de proceso en `specs/sdd-conventions.md`

### Requirement: Idioma de la constitución

La narrativa de `specs/mission.md`, `specs/tech-stack.md` y `specs/roadmap.md` MUST redactarse en español; nombres de tecnologías, herramientas, archivos y comandos MUST permanecer en inglés, conforme a `artifact-language-policy`.

#### Scenario: Mención de framework en misión

- **WHEN** la misión cita el framework web
- **THEN** se usa `Astro` (u otro nombre acordado en inglés) y no una traducción del nombre

### Requirement: No usar documento monolítico en openspec

El repositorio MUST NOT usar `openspec/CONSTITUTION.md` como sustituto de los tres archivos en `specs/`.

#### Scenario: Intento de archivo único

- **WHEN** se propone crear solo `openspec/CONSTITUTION.md` sin los tres archivos en `specs/`
- **THEN** la implementación no cumple esta capability

