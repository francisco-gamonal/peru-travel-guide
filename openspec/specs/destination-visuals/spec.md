---
version: "1.0.0"
capability: destination-visuals
---

# destination-visuals Specification

## Purpose

Banderas e iconografía optimizada para destinos curados y el referente peruano en la guía de viaje: assets SVG en build estático, accesibilidad (`alt` en español) y coherencia visual en selector, cabecera y comparación poblacional.

## Requirements

### Requirement: Banderas de país en destinos curados

Cada destino curado en `destinations.json` MUST incluir un campo `countryCode` (ISO 3166-1 alpha-2) y la UI MUST mostrar la bandera correspondiente en la cabecera de la ficha de destino y en el selector de destinos.

#### Scenario: DV-01 — Mapeo countryCode a asset de bandera

- **ID:** `DV-01`
- **WHEN** se invoca el helper de banderas con `countryCode` válido (`PE`, `ES`, `MX`, `AR`, `GB`)
- **THEN** devuelve la ruta o referencia al SVG correspondiente en `src/assets/flags/` sin error

#### Scenario: DV-02 — Validación de countryCode en datos de población

- **ID:** `DV-02`
- **WHEN** se cargan los datos de `destinations.json` en build o tests
- **THEN** cada destino curado incluye `countryCode` de dos letras mayúsculas y la validación falla si falta o es inválido

### Requirement: Bandera de Perú en comparación poblacional

El widget de comparación poblacional MUST mostrar la bandera de Perú (`PE`) junto al referente país **Perú** en la sección «Por país», y la bandera del país destino junto a su fila correspondiente.

#### Scenario: DV-07 — Referente Perú con bandera en vista de comparación

- **ID:** `DV-07`
- **WHEN** se construye la vista de comparación para cualquier destino curado
- **THEN** la primera barra de la sección «Por país» incluye `countryCode: "PE"` y la segunda barra incluye el `countryCode` del destino

#### Scenario: DV-08 — Bandera de Perú en HTML estático

- **ID:** `DV-08`
- **WHEN** se ejecuta `pnpm build` y se inspecciona `dist/destino/madrid/index.html`
- **THEN** el HTML de la sección de comparación poblacional incluye la bandera de Perú (referencia a `pe` o alt «Bandera de Perú» / «Bandera del Perú»)

### Requirement: Optimización y accesibilidad de assets visuales

Las banderas MUST servirse como assets optimizados en build estático (SVG importado desde `src/assets/flags/` o equivalente documentado en `design.md`), con dimensiones width/height explícitas en markup para evitar CLS, y texto alternativo en español.

#### Scenario: DV-03 — Alt en español y dimensiones fijas

- **ID:** `DV-03`
- **WHEN** se renderiza la ficha estática de un destino (p. ej. `/destino/london/`)
- **THEN** la bandera en cabecera tiene atributo `alt` en español que menciona el país (p. ej. «Bandera del Reino Unido») y atributos `width`/`height` explícitos

#### Scenario: DV-04 — Banderas presentes en HTML estático post-build

- **ID:** `DV-04`
- **WHEN** se ejecuta `pnpm build` y se inspecciona `dist/destino/london/index.html`
- **THEN** el HTML contiene al menos una referencia a la bandera del destino (img o svg) y el selector lista los cuatro destinos con iconografía visual

### Requirement: Selector de destinos con iconografía

El selector de destinos MUST permitir identificar visualmente cada opción mediante su bandera junto al nombre ciudad/país, y MUST conservar la navegación a `/destino/<id>/` al cambiar de destino.

#### Scenario: DV-05 — Cambio de destino con banderas visibles (E2E)

- **ID:** `DV-05`
- **WHEN** un usuario en E2E abre `/destino/madrid/` y selecciona otro destino con bandera visible
- **THEN** la URL cambia a `/destino/<id>/` del destino elegido y la bandera de cabecera corresponde al nuevo país

### Requirement: Sin regresión de performance budget

Tras añadir assets visuales, el job `lighthouse` en CI MUST seguir cumpliendo los umbrales de LCP y CLS definidos en `openspec/specs/performance-budget/spec.md` para las rutas bajo gate.

#### Scenario: DV-06 — LHCI en verde tras assets visuales

- **ID:** `DV-06`
- **WHEN** se ejecuta el workflow CI tras implementar este cambio
- **THEN** el job `lighthouse` termina con éxito y las assertions de LCP ≤ 2500 ms y CLS ≤ 0.1 pasan en home y `/destino/london/`
