## 1. Script y package.json

- [x] 1.1 Implementar `scripts/verify-review-gate.mjs` (cambio activo, `reviewStatus`, parseo checklist) `// @spec TH-11`, `// @spec TH-12`, `// @spec SG-20`, `// @spec SG-21`
- [x] 1.2 Añadir `"spec:review-gate": "node scripts/verify-review-gate.mjs"` en `package.json`
- [x] 1.3 Tests unitarios en `src/test/review-gate.test.ts` con fixtures

## 2. Skills y comandos OpenSpec

- [x] 2.1 Actualizar `.cursor/skills/openspec-continue-change/SKILL.md`: `reviewStatus: pending-review` tras `design.md`; STOP hasta aprobación; no crear `tasks` si pending `// @spec SG-20`, `// @spec SG-21`
- [x] 2.2 Actualizar `.cursor/skills/openspec-apply-change/SKILL.md`: invocar review gate antes de tasks `// @spec SG-22`
- [x] 2.3 Espejo en `.cursor/commands/opsx-continue.md` y `opsx-apply.md`
- [x] 2.4 Espejo en `.claude/skills/` y `.claude/commands/opsx/` (continue, apply)

## 3. Documentación

- [x] 3.1 Ampliar `specs/sdd-conventions.md` — sección Review gate con flujo `pending-review` → `approved`
- [x] 3.2 Actualizar `specs/tech-stack.md` — tabla hooks/scripts con `pnpm spec:review-gate`
- [x] 3.3 Añadir `breaking: false` y documentar `reviewStatus` en `.openspec.yaml` de este cambio

## 4. Roadmap, verificación y cierre

- [x] 4.1 Verificación manual del flujo continue → aprobar → apply (documentada en `design.md` § Verificación manual)
- [x] 4.2 `openspec validate enhance-sdd-review-gate`
- [x] 4.3 Actualizar `specs/roadmap.md`: Fase 9 ✅ completada al archivar (PCO-15)
- [x] 4.4 `pnpm changelog:generate` y archivar; sync capabilities (`sdd-governance`, `test-harness`, `project-constitution`)
