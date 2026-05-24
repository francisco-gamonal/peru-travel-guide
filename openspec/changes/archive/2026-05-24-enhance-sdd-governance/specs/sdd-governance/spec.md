## ADDED Requirements

### Requirement: Archivo de convenciones SDD en la constitución

El repositorio MUST incluir `specs/sdd-conventions.md` como cuarto archivo de constitución, accesible desde la raíz, que documente las convenciones del proceso spec-driven development aplicado al proyecto.

#### Scenario: SG-01 — Convenciones disponibles para el agente

- **WHEN** el agente inicia un cambio con `/opsx:propose` o `/opsx:apply`
- **THEN** `openspec/config.yaml` referencia `specs/sdd-conventions.md` en el bloque `context:` y el agente puede leerlo antes de crear cualquier artefacto

#### Scenario: SG-02 — Archivo presente en el repositorio

- **WHEN** se revisa la raíz del repositorio tras completar este cambio
- **THEN** existe `specs/sdd-conventions.md` con al menos las secciones: Scenario IDs, Semver de capabilities, Review gate, Breaking changes, Changelog y Performance budget

### Requirement: Scenario IDs únicos por capability

Cada escenario en los delta specs y en los specs principales de `openspec/specs/` MUST tener un identificador único con formato `<PREFIJO>-<NN>` donde `PREFIJO` es de 2–4 letras en mayúsculas que identifica la capability y `NN` es un número secuencial de dos dígitos.

#### Scenario: SG-03 — ID presente en escenario nuevo

- **WHEN** se crea un delta spec con escenarios nuevos para un cambio OpenSpec posterior a la Fase 6
- **THEN** cada `#### Scenario:` incluye el ID en su título (p. ej. `#### Scenario: PC-08 — Usuario cambia destino`)

#### Scenario: SG-04 — ID referenciado en tests

- **WHEN** se implementa una tarea que genera o modifica un test para un escenario con ID
- **THEN** el archivo de test contiene el comentario `// @spec <ID>` en la línea anterior al bloque `it(...)` o `test(...)` correspondiente

#### Scenario: SG-05 — Tabla de trazabilidad en design.md

- **WHEN** un `design.md` describe un cambio que añade o modifica escenarios
- **THEN** incluye una sección `## Test traceability` con una tabla que mapea cada Spec ID al tipo de test (unit / e2e) y al archivo de test correspondiente

### Requirement: Versionado semántico de capabilities

Cada archivo `openspec/specs/<capability>/spec.md` MUST incluir una cabecera YAML con `version` siguiendo semver (`MAJOR.MINOR.PATCH`) que se actualiza al archivar un cambio que modifica esa capability.

#### Scenario: SG-06 — Cabecera de versión en spec principal

- **WHEN** se sincroniza un delta spec a `openspec/specs/<capability>/spec.md` al archivar
- **THEN** la cabecera del archivo refleja la versión actualizada (`version: "X.Y.Z"`)

#### Scenario: SG-07 — Regla de bump

- **WHEN** el delta contiene solo operaciones `ADDED`
- **THEN** se incrementa el `MINOR` (p. ej. `1.0.0` → `1.1.0`)

#### Scenario: SG-08 — Breaking bump

- **WHEN** el delta contiene operaciones `REMOVED` o `MODIFIED` que cambian comportamiento observable
- **THEN** se incrementa el `MAJOR` (p. ej. `1.1.0` → `2.0.0`) y el cambio MUST tener `breaking: true` en `.openspec.yaml`

### Requirement: Flag de breaking change en el cambio

El archivo `.openspec.yaml` de cada cambio OpenSpec MUST incluir el campo `breaking: false` (o `true` cuando aplique) al crearse el cambio.

#### Scenario: SG-09 — Campo presente en cambios nuevos

- **WHEN** se crea un cambio con `openspec new change "<name>"`
- **THEN** el autor añade `breaking: false` (o `true`) al `.openspec.yaml` antes de crear el primer artefacto

#### Scenario: SG-10 — Migration Guide obligatorio si breaking

- **WHEN** `breaking: true` está presente en `.openspec.yaml`
- **THEN** el `design.md` del cambio MUST incluir una sección `## Migration Guide` con pasos para actualizar código o datos que dependan de la capability modificada

### Requirement: Review checklist en design.md antes de apply

Todo `design.md` de un cambio que modifique `src/` o que añada capabilities MUST incluir una sección `## Review checklist` al final con items verificables, y esa checklist MUST estar completamente marcada antes de ejecutar `/opsx:apply`.

#### Scenario: SG-11 — Checklist presente

- **WHEN** se crea `design.md` para un cambio post-Fase 6
- **THEN** incluye `## Review checklist` con al menos: alineación con `mission.md`, trazabilidad de tests definida y ausencia de contradicción con capabilities existentes

#### Scenario: SG-12 — Gate antes de apply

- **WHEN** el agente recibe instrucción de `/opsx:apply` y `design.md` contiene `## Review checklist` con items sin marcar (`- [ ]`)
- **THEN** el agente se detiene, muestra los items pendientes y solicita confirmación explícita antes de continuar

### Requirement: Script de generación de changelog

El repositorio MUST incluir `scripts/generate-changelog.mjs` y el script `"changelog:generate"` en `package.json` que compila `CHANGELOG.md` a partir de los `proposal.md` en `openspec/changes/archive/`.

#### Scenario: SG-13 — Script ejecutable

- **WHEN** se ejecuta `pnpm changelog:generate` desde la raíz del proyecto
- **THEN** genera o sobreescribe `CHANGELOG.md` con entradas ordenadas por fecha (más reciente primero), una por cambio archivado, usando el título y la sección "What Changes" del `proposal.md`

#### Scenario: SG-14 — Script falla si no hay archivos

- **WHEN** `openspec/changes/archive/` no existe o está vacía
- **THEN** el script termina con `process.exit(1)` y un mensaje descriptivo en stderr

### Requirement: Presupuesto de performance declarado

El repositorio MUST declarar en `specs/sdd-conventions.md` los umbrales objetivo de Core Web Vitals para las rutas de la aplicación, como referencia para el author de cada cambio que toque UI.

#### Scenario: SG-15 — Umbrales documentados

- **WHEN** un desarrollador o agente lee `specs/sdd-conventions.md`
- **THEN** encuentra los valores objetivo de LCP, CLS e INP para `/` y `/destino/[id]/`

#### Scenario: SG-16 — Mención en design.md de features UI

- **WHEN** un cambio post-Fase 6 modifica páginas, componentes o estilos
- **THEN** su `design.md` incluye una sección `## Performance impact` que describe si el cambio puede afectar los umbrales declarados y cómo se mitiga
