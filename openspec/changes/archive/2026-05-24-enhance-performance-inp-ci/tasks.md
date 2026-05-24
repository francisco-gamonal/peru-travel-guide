## 1. Spike INP en LHCI

- [x] 1.1 Ejecutar `ASTRO_BASE=/peru-travel-guide/ pnpm build && ASTRO_BASE=/peru-travel-guide/ pnpm lhci`; registrar si `interaction-to-next-paint` aparece con valor numérico en informe (documentar en `design.md` § Spike)
- [x] 1.2 Decidir Rama A (gate INP) o Rama B (manual documentado) y anotar en `design.md` — **Rama B** (INP no visible/fiable en viewer headless)

## 2. Rama A — Gate INP (si spike positivo)

- [ ] ~~2.1 Añadir assertion `interaction-to-next-paint` en `lighthouserc.cjs` con `THRESHOLDS.inpMs`~~ **N/A — spike negativo**
- [ ] ~~2.2 Test `// @spec PB-06` en `src/test/lighthouse-config.test.ts`~~ **N/A — spike negativo**
- [ ] ~~2.3 Actualizar `specs/sdd-conventions.md`: INP gate duro en CI junto a LCP/CLS~~ **N/A — spike negativo**
- [ ] ~~2.4 Marcar PB-07 como N/A en tasks con nota «spike positivo»~~ **N/A — spike negativo**

## 3. Rama B — INP manual (si spike negativo)

- [x] 3.1 Documentar razón en `design.md`; actualizar `specs/sdd-conventions.md` (INP manual + referencia spike)
- [x] 3.2 Test `// @spec PB-07` en `src/test/lighthouse-config.test.ts` (sin assertion INP en config)
- [x] 3.3 Marcar PB-06 como N/A en tasks con nota «spike negativo»

## 4. Documentación y cierre

- [x] 4.1 Actualizar `specs/tech-stack.md` si cambia descripción de gates LHCI
- [x] 4.2 `openspec validate enhance-performance-inp-ci`
- [x] 4.3 `pnpm spec:review-gate` y `pnpm spec:traceability` antes de archivar
- [x] 4.4 Actualizar `specs/roadmap.md`: Fase 9.5 ✅ (PCO-16); archivar; sync specs; `pnpm changelog:generate`
