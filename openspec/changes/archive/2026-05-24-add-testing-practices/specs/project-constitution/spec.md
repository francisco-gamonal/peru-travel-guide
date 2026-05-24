## MODIFIED Requirements

### Requirement: Archivo specs/tech-stack.md

El archivo `specs/tech-stack.md` MUST existir y listar las tecnologías y convenciones acordadas (framework, lenguaje, herramientas, workflow de specs, commits, **pruebas unitarias**, **cobertura mínima del 80 %** en el alcance definido, y **pruebas E2E**).

#### Scenario: Referencia de stack en implementación

- **WHEN** un task propone añadir una dependencia no reflejada en `specs/tech-stack.md`
- **THEN** el agente SHOULD señalar la discrepancia y sugerir actualizar el stack mediante un cambio OpenSpec

#### Scenario: Stack incluye testing

- **WHEN** un agente o desarrollador consulta `specs/tech-stack.md` para calidad de código
- **THEN** encuentra herramientas de test (Vitest, Playwright), scripts `pnpm test` / `pnpm test:coverage` / `pnpm test:e2e` y el umbral de cobertura del 80 %
