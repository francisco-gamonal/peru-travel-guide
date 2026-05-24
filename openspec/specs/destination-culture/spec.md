---
version: "1.0.0"
capability: destination-culture
---

# destination-culture Specification

## Purpose
Datos culturales curados por destino, consejos prácticos para el viajero e integración en la ficha estática `/destino/<id>/` como guía personal junto a población y clima.

## Requirements

### Requirement: Datos culturales curados por destino

El sistema MUST cargar datos culturales desde archivos estáticos en el repositorio (sin API en tiempo de ejecución en el MVP), con una entrada por cada `destination.id` de los destinos internacionales curados en Fase 2.

#### Scenario: Datos disponibles en build

- **WHEN** se ejecuta `pnpm build`
- **THEN** los datos culturales de Madrid, Ciudad de México y Buenos Aires están disponibles sin error de validación ni de parseo

#### Scenario: Destino sin datos culturales

- **WHEN** existe un `destination.id` en población sin entrada cultural correspondiente
- **THEN** la ficha de destino no rompe el build y muestra un mensaje en español indicando que la orientación cultural aún no está disponible para ese destino

### Requirement: Orientación cultural práctica en español

Para cada destino con datos culturales, la ficha MUST mostrar un resumen y al menos tres consejos prácticos en español (comunicación, costumbres o aspectos de convivencia útiles para un viajero), con tono respetuoso y orientado a la utilidad, no a estereotipos.

#### Scenario: Madrid muestra cultura

- **WHEN** el usuario visita `/destino/madrid/`
- **THEN** ve un bloque «Cultura y consejos prácticos» con contenido que corresponde a Madrid (no a otro destino)

#### Scenario: Atribución de fuente cultural

- **WHEN** se muestra información cultural
- **THEN** la UI incluye fuente y año de referencia en el pie del widget cultural, con transparencia comparable a población y clima

### Requirement: Presentación compacta del bloque cultural

El bloque cultural MUST mostrarse en **un único widget** escaneable (resumen, lista de consejos, fuente al pie), sin apilar varias tarjetas `rounded-xl` independientes por consejo.

#### Scenario: Widget único en móvil

- **WHEN** el usuario abre `/destino/madrid/` en viewport móvil (~390px)
- **THEN** la cultura forma un solo bloque principal antes del final de la página, con subsección de consejos distinguible

#### Scenario: Coherencia al cambiar destino

- **WHEN** el usuario navega de Madrid a Ciudad de México mediante el selector de destino
- **THEN** el contenido cultural corresponde a Ciudad de México y no permanece el de Madrid

### Requirement: Integración en ficha sin sustituir población ni clima

El bloque cultural MUST mostrarse en la misma ruta `/destino/<id>/` **después** de población y clima, sin ocultar ni degradar las capabilities `population-comparison` y `destination-climate`.

#### Scenario: Guía integrada en una visita

- **WHEN** el usuario abre `/destino/madrid/`
- **THEN** ve comparación poblacional, clima y mejores épocas, y cultura en secuencia, sin mensaje «Próximamente: cultura»

#### Scenario: Sin aviso de cultura pendiente

- **WHEN** el usuario recorre la ficha de un destino curado tras esta entrega
- **THEN** no aparece el pie «Próximamente: cultura y consejos prácticos…»

### Requirement: Experiencia de guía personal

La página de destino MUST comunicar en cabecera y metadatos que ofrece una guía personal (población, clima y cultura), no solo estadísticas aisladas.

#### Scenario: Meta y título actualizados

- **WHEN** se inspecciona el HTML de `/destino/madrid/`
- **THEN** el `<title>` o la meta description mencionan cultura o guía integral además de población y clima
