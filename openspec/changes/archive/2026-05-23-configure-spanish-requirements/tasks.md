## 1. Configuración global en `openspec/config.yaml`

- [x] 1.1 Activar el bloque `context` con la política de idioma: narrativa en español, código y términos técnicos en inglés
- [x] 1.2 Añadir un ejemplo breve en `context` que muestre narrativa en español citando un endpoint como `GET /api/v1/export`

## 2. Reglas por artefacto

- [x] 2.1 Añadir `rules.proposal` con al menos una regla sobre español en secciones Why/What/Impact
- [x] 2.2 Añadir `rules.design` con al menos una regla sobre decisiones en español e identificadores en inglés
- [x] 2.3 Añadir `rules.specs` con al menos una regla sobre requisitos en español y backticks para código/endpoints
- [x] 2.4 Añadir `rules.tasks` con al menos una regla sobre descripciones en español y nombres de archivos en inglés

## 3. Verificación

- [x] 3.1 Validar que `openspec/config.yaml` parsea correctamente (YAML válido, sin tabs)
- [x] 3.2 Ejecutar `openspec status --change configure-spanish-requirements` y confirmar que el cambio puede aplicarse
