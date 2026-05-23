## Why

El equipo trabaja en español para requisitos y documentación de producto, pero el código y el ecosistema técnico siguen en inglés. Sin una convención explícita en OpenSpec, los artefactos mezclan idiomas de forma inconsistente y los agentes de IA no tienen reglas claras sobre qué traducir y qué preservar.

## What Changes

- Añadir `context` global en `openspec/config.yaml` con la política de idioma del proyecto.
- Definir reglas por artefacto (`proposal`, `design`, `specs`, `tasks`) que refuercen español en narrativa y inglés en términos técnicos.
- Documentar criterios concretos: qué va en español, qué permanece en inglés, y ejemplos para evitar ambigüedad.
- No se modifica el schema `spec-driven` ni la CLI de OpenSpec.

## Capabilities

### New Capabilities

- `artifact-language-policy`: Convención de idioma para todos los artefactos OpenSpec (requisitos en español, código y vocabulario técnico en inglés).

### Modified Capabilities

<!-- Ninguna: no existen specs previas en openspec/specs/ -->

## Impact

- `openspec/config.yaml` — configuración principal del proyecto.
- Artefactos futuros generados por `/opsx-propose`, `/opsx-apply` y skills de OpenSpec heredarán el contexto automáticamente.
- Sin impacto en código de aplicación (aún no existe en el repositorio).
