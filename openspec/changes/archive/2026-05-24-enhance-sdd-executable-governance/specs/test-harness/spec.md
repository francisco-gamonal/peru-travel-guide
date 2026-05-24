## ADDED Requirements

### Requirement: Script spec:traceability en gate de verificación

El repositorio MUST exponer `"spec:traceability": "node scripts/verify-spec-traceability.mjs"` en `package.json`. Cuando exista exactamente un cambio OpenSpec activo en `openspec/changes/` (excluyendo `archive/`), `pnpm test:verify:push` y el workflow CI MUST ejecutar `pnpm spec:traceability` después de `pnpm lint` y antes o después de los tests unitarios, y MUST fallar si el script termina con código distinto de `0`.

#### Scenario: TH-09 — spec:traceability en test:verify:push con cambio activo

- **ID:** `TH-09`
- **WHEN** hay un único cambio activo en `openspec/changes/` y el desarrollador ejecuta `pnpm test:verify:push`
- **THEN** se invoca `pnpm spec:traceability` y el push hook falla si la trazabilidad está incompleta

#### Scenario: TH-10 — Sin cambio activo omite trazabilidad

- **ID:** `TH-10`
- **WHEN** no hay directorios de cambio activo en `openspec/changes/` (solo `archive/` o carpeta vacía de activos)
- **THEN** `pnpm spec:traceability` termina con código `0` sin error indicando que no hay cambio que validar

## MODIFIED Requirements

### Requirement: Hook pre-commit con lint

El repositorio MUST configurar un hook Git `pre-commit` (p. ej. vía Husky) que ejecute `pnpm lint` desde la raíz y aborte el commit si el comando termina con código distinto de `0`. Además, cuando exista al menos un cambio OpenSpec activo en `openspec/changes/` (excluyendo `archive/`), el hook MUST ejecutar `openspec validate <change>` para cada cambio activo y abortar el commit si alguna validación falla.

#### Scenario: Commit con lint correcto

- **WHEN** el desarrollador ejecuta `git commit` con cambios que pasan `pnpm lint` y no hay cambios OpenSpec activos
- **THEN** el hook `pre-commit` termina con código `0` y el commit se completa

#### Scenario: Commit con lint fallido

- **WHEN** el desarrollador ejecuta `git commit` y `pnpm lint` reporta errores
- **THEN** el hook aborta el commit con código distinto de `0`

#### Scenario: TH-11 — Commit valida cambio OpenSpec activo

- **ID:** `TH-11`
- **WHEN** el desarrollador ejecuta `git commit` y existe un cambio activo `openspec/changes/<name>/` cuyos artefactos son inválidos según `openspec validate <name>`
- **THEN** el hook `pre-commit` aborta el commit con código distinto de `0`

#### Scenario: TH-12 — Commit sin cambio activo no invoca validate

- **ID:** `TH-12`
- **WHEN** el desarrollador ejecuta `git commit` y no hay cambios activos en `openspec/changes/`
- **THEN** el hook ejecuta solo `pnpm lint` (más pasos rápidos acordados) y no invoca `openspec validate`
