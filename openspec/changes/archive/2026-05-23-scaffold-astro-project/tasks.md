## 1. Preparación

- [x] 1.1 Ejecutar `npm view` para `astro`, `typescript`, `tailwindcss`, `@tailwindcss/vite` y `pnpm`; anotar versiones
- [x] 1.2 Confirmar Node.js `>=22.12.0` en el entorno

## 2. Scaffold Astro

- [x] 2.1 Inicializar proyecto Astro 6 en la raíz (template minimal/empty, TypeScript strict) sin afectar `specs/` ni `openspec/`
- [x] 2.2 Integrar Tailwind CSS 4 con `@tailwindcss/vite`
- [x] 2.3 Fijar versiones en `package.json` y `packageManager` para pnpm

## 3. Calidad y documentación

- [x] 3.1 Configurar ESLint mínimo y script `pnpm lint`
- [x] 3.2 Crear `README.md` con requisitos, comandos y estructura del repo
- [x] 3.3 Implementar `src/pages/index.astro` placeholder alineado con `specs/mission.md`

## 4. Verificación

- [x] 4.1 Ejecutar `pnpm dev` y confirmar que arranca sin errores
- [x] 4.2 Ejecutar `pnpm build` y confirmar build exitoso
- [x] 4.3 Ejecutar `pnpm lint` sin errores
- [x] 4.4 Ejecutar `openspec validate scaffold-astro-project`

## 5. Roadmap

- [x] 5.1 Actualizar `specs/roadmap.md`: marcar Fase 1 como completada cuando se archive este cambio (Fase 0 ya completada)
