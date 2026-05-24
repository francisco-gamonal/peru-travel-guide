## 1. Constitución y documentación

- [x] 1.1 Ampliar `specs/tech-stack.md`: sección «Git hooks» (tabla pre-commit / pre-push / CI, Husky, `--no-verify`, CI como fuente de verdad)
- [x] 1.2 Actualizar `README.md`: instalación automática con `pnpm install`, qué esperar en commit vs push, cuándo ejecutar `pnpm test:verify` manualmente

## 2. Scripts y dependencias

- [x] 2.1 Añadir `husky` en `devDependencies` y script `"prepare": "husky"` en `package.json`
- [x] 2.2 Añadir script `test:verify:push`: `pnpm build && pnpm lint && pnpm test:coverage && pnpm test:static`
- [x] 2.3 Confirmar que `test:verify` sigue incluyendo `test:e2e` al final

## 3. Hooks Husky

- [x] 3.1 Crear `.husky/pre-commit` que ejecute `pnpm lint`
- [x] 3.2 Crear `.husky/pre-push` que ejecute `pnpm test:verify:push`
- [x] 3.3 Ejecutar `pnpm install` y verificar que los hooks están instalados (`git config core.hooksPath` o commit de prueba)

## 4. CI (opcional)

- [ ] 4.1 _(Opcional)_ Añadir `.github/workflows/verify.yml` con Node 22+, `pnpm install`, Playwright chromium, `pnpm test:verify`
- [x] 4.2 Si se omite 4.1, documentar en `tech-stack` que el workflow de CI llegará en Fase 5

## 5. Verificación y cierre OpenSpec

- [x] 5.1 Probar flujo local: commit con lint OK; push con `test:verify:push` OK
- [x] 5.2 Ejecutar `pnpm test:verify` completo antes de archivar (E2E)
- [x] 5.3 Ejecutar `openspec validate add-git-quality-hooks`
