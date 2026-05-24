## 1. Configuración Astro y workflows

- [ ] 1.1 Añadir `site` y `base: '/peru-travel-guide/'` en `astro.config.mjs` (owner en `site` según cuenta GitHub)
- [ ] 1.2 Crear `.github/workflows/ci.yml` con pnpm 10.33.4, Node 22, Playwright chromium y `pnpm test:verify`
- [ ] 1.3 Crear `.github/workflows/deploy.yml` (build → artifact `dist/` → `deploy-pages`, permisos Pages)

## 2. Repositorio remoto y primer deploy

- [ ] 2.1 Verificar `gh auth status`; crear repo `peru-travel-guide` con `gh repo create` (o enlazar remote si ya existe)
- [ ] 2.2 `git push -u origin` de la rama principal; habilitar GitHub Pages con fuente **GitHub Actions**
- [ ] 2.3 Confirmar URL pública `https://<owner>.github.io/peru-travel-guide/` y workflow deploy en verde

## 3. Documentación y cierre

- [ ] 3.1 Actualizar `README.md` (nombre repo, badge CI, URL Pages, contribución)
- [ ] 3.2 Ejecutar `pnpm test:verify` local tras cambios de `base`
- [ ] 3.3 Actualizar `specs/roadmap.md` (Fase 5 completada, enlace al repo)
- [ ] 3.4 Ejecutar `openspec validate setup-github-production`
