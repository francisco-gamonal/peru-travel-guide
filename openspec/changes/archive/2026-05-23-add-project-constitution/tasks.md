## 1. Preparar estructura

- [x] 1.1 Crear el directorio `specs/` en la raíz del proyecto
- [x] 1.2 Confirmar que no existe `openspec/CONSTITUTION.md` (no crear archivo monolítico)

## 2. Redacción interactiva — mission (1º)

- [x] 2.1 Proponer borrador de `specs/mission.md` y revisarlo con el usuario
- [x] 2.2 Escribir `specs/mission.md` final tras validación explícita del usuario

## 3. Redacción interactiva — tech-stack (2º)

- [x] 3.1 Proponer borrador de `specs/tech-stack.md` alineado con `specs/mission.md` y revisarlo con el usuario
- [x] 3.2 Escribir `specs/tech-stack.md` final tras validación explícita del usuario

## 4. Redacción interactiva — roadmap (3º)

- [x] 4.1 Proponer borrador de `specs/roadmap.md` alineado con misión y stack y revisarlo con el usuario
- [x] 4.2 Escribir `specs/roadmap.md` final tras validación explícita del usuario

## 5. Integrar con OpenSpec

- [x] 5.1 Extender `context` en `openspec/config.yaml` para referenciar `specs/mission.md`, `specs/tech-stack.md` y `specs/roadmap.md`
- [x] 5.2 Verificar narrativa en español y términos técnicos en inglés en los tres archivos

## 6. Verificación

- [x] 6.1 Ejecutar `openspec validate add-project-constitution`
- [x] 6.2 Confirmar que los tres archivos cumplen la spec `project-constitution`
