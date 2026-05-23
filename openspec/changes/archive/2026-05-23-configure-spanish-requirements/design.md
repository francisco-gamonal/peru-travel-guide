## Context

El repositorio usa OpenSpec con schema `spec-driven`. `openspec/config.yaml` tiene `context` y `rules` comentados; no hay specs en `openspec/specs/` todavía. Los skills y comandos de Cursor/Claude leen `config.yaml` al generar artefactos.

El equipo necesita documentación de requisitos legible en español sin traducir identificadores, APIs ni código de ejemplo.

## Goals / Non-Goals

**Goals:**

- Centralizar la política de idioma en `openspec/config.yaml` para que toda generación de artefactos la herede.
- Separar claramente narrativa (español) de vocabulario técnico (inglés).
- Dar ejemplos en `rules` por tipo de artefacto para reducir variación entre agentes.

**Non-Goals:**

- Traducir mensajes de la CLI de OpenSpec.
- Configurar i18n de la aplicación final (fuera de alcance hasta que exista código).
- Forzar español en nombres de archivos, carpetas de cambios o commits (permanecen en inglés/kebab-case).

## Decisions

### 1. Usar `context` global + `rules` por artefacto

**Decisión:** Definir la política en `context:` (visión general) y reforzarla en `rules:` para `proposal`, `design`, `specs` y `tasks`.

**Rationale:** `context` aplica a todos los artefactos; `rules` permite matices (p. ej. en `specs`, los nombres de `Requirement` y `Scenario` pueden ir en español pero los identificadores de código en inglés).

**Alternativa descartada:** Solo un comentario en README — no lo consumen los agentes automáticamente.

### 2. Español para narrativa; inglés para términos técnicos inmutables

**En español:**

- Párrafos explicativos, motivación, impacto, riesgos.
- Descripciones de requisitos y escenarios (texto WHEN/THEN).
- Títulos de secciones de plantilla cuando se redacta contenido nuevo (Why, What Changes, etc. pueden mantenerse en inglés si el template lo exige; el cuerpo va en español).

**En inglés (sin traducir):**

- Identificadores de código: variables, funciones, clases, módulos, paths.
- Nombres de APIs, endpoints, HTTP methods, status codes.
- Nombres de tecnologías, frameworks, librerías, patrones (REST, GraphQL, JWT).
- Valores literales en ejemplos de código y JSON/YAML.
- Nombres de capabilities, cambios y archivos (`kebab-case`).
- Palabras ya adoptadas en el equipo como anglicismos técnicos cuando se refieren al concepto técnico (p. ej. "commit", "pull request", "middleware") — preferir el término en inglés entre comillas o backticks la primera vez.

### 3. Formato de requisitos en specs

**Decisión:** Los encabezados `### Requirement:` y `#### Scenario:` pueden usar nombres descriptivos en español; el cuerpo del requisito usa SHALL/MUST en español pero cita identificadores técnicos en inglés con backticks.

**Ejemplo:**

```markdown
### Requirement: Exportación de datos del usuario
El sistema SHALL permitir exportar datos en formato CSV mediante `GET /api/v1/export`.

#### Scenario: Exportación exitosa
- **WHEN** el usuario invoca `GET /api/v1/export`
- **THEN** el sistema responde con status code `200` y un archivo CSV
```

### 4. Sin cambios al schema ni hooks

La implementación es solo configuración declarativa en YAML.

## Risks / Trade-offs

- **[Riesgo] Mezcla inconsistente español/inglés** → Mitigación: lista explícita en `context` y ejemplos en `rules`.
- **[Riesgo] Agentes traducen identificadores de código** → Mitigación: regla explícita "never translate code identifiers" y ejemplos con backticks.
- **[Trade-off] Specs en español son menos estándar que RFC-style English** → Aceptable para este equipo; los escenarios siguen siendo testables.
