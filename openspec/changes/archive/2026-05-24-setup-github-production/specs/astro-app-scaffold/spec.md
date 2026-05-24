## MODIFIED Requirements

### Requirement: Build de producción estático

El proyecto MUST generar un sitio estático con `pnpm build` listo para hosting en **GitHub Pages** (project site), con `site` y `base` en `astro.config.mjs` alineados al path `/peru-travel-guide/`.

#### Scenario: Artefacto de build

- **WHEN** se ejecuta `pnpm build` tras configurar `base` para GitHub Pages
- **THEN** el directorio `dist/` contiene HTML y assets con rutas prefijadas correctamente para `/peru-travel-guide/`

#### Scenario: Preview local sigue funcionando

- **WHEN** el desarrollador ejecuta `pnpm preview` o `pnpm test:e2e` en local
- **THEN** el sitio y las pruebas siguen siendo ejecutables sin regresión por la configuración de `base` (usar `base` coherente o documentar comando de preview con base)
