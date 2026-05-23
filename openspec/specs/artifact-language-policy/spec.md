# artifact-language-policy Specification

## Purpose
TBD - created by archiving change configure-spanish-requirements. Update Purpose after archive.
## Requirements
### Requirement: Contexto global de idioma en OpenSpec

El archivo `openspec/config.yaml` MUST incluir un bloque `context` activo que declare que los artefactos OpenSpec se redactan en español y que el código fuente y el vocabulario técnico permanecen en inglés.

#### Scenario: Agente genera un proposal

- **WHEN** un agente ejecuta `/opsx-propose` o crea un artefacto `proposal`
- **THEN** lee `context` en `openspec/config.yaml` y redacta narrativa en español preservando identificadores técnicos en inglés

#### Scenario: Configuración ausente

- **WHEN** `openspec/config.yaml` no define `context` con la política de idioma
- **THEN** el cambio `configure-spanish-requirements` no se considera implementado

### Requirement: Reglas por tipo de artefacto

`openspec/config.yaml` MUST incluir `rules` para los artefactos `proposal`, `design`, `specs` y `tasks` que refuercen la política de idioma con al menos una regla concreta por artefacto.

#### Scenario: Generación de spec con requisitos

- **WHEN** se crea un archivo bajo `specs/<capability>/spec.md`
- **THEN** las descripciones y escenarios están en español y los nombres de funciones, endpoints, tipos y paths citados aparecen en inglés entre backticks

#### Scenario: Generación de tasks

- **WHEN** se crea `tasks.md`
- **THEN** las descripciones de tareas están en español y los nombres de archivos o símbolos de código a modificar aparecen en inglés sin traducir

### Requirement: Contenido en español

La narrativa de los artefactos OpenSpec (párrafos, listas explicativas, descripciones de requisitos, escenarios WHEN/THEN) MUST redactarse en español con gramática y ortografía correctas.

#### Scenario: Proposal con motivación

- **WHEN** se completa la sección Why de `proposal.md`
- **THEN** el texto explicativo está en español

### Requirement: Vocabulario técnico y código en inglés

Los siguientes elementos MUST permanecer en inglés sin traducción: identificadores de código, nombres de archivos y rutas, nombres de APIs y endpoints, métodos HTTP, status codes, nombres de librerías y frameworks, valores literales en ejemplos de código, y nombres de capabilities en `kebab-case`.

#### Scenario: Ejemplo de endpoint en un spec

- **WHEN** un requisito menciona el endpoint de exportación
- **THEN** se escribe como `GET /api/v1/export` y no como una traducción al español del path

#### Scenario: Nombre de capability

- **WHEN** se referencia la capability `artifact-language-policy`
- **THEN** el identificador permanece en inglés y kebab-case

### Requirement: Ejemplos de referencia en configuración

El bloque `context` o las `rules` MUST incluir al menos un ejemplo breve que muestre la separación español (narrativa) / inglés (términos técnicos).

#### Scenario: Primera generación tras aplicar el cambio

- **WHEN** un agente sin historial previo genera un artefacto
- **THEN** puede inferir el formato correcto a partir del ejemplo en `openspec/config.yaml` sin documentación externa adicional

