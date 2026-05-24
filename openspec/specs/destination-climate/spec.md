# destination-climate Specification

## Purpose
TBD - created by archiving change add-destination-climate. Update Purpose after archive.

## Requirements

### Requirement: Datos climáticos curados por destino

El sistema MUST cargar datos climáticos desde archivos estáticos en el repositorio (sin API en tiempo de ejecución en el MVP), con una entrada por cada `destination.id` de los destinos internacionales curados en Fase 2.

#### Scenario: Datos disponibles en build

- **WHEN** se ejecuta `pnpm build`
- **THEN** los datos climáticos de Madrid, Ciudad de México y Buenos Aires están disponibles sin error de validación ni de parseo

#### Scenario: Destino sin datos climáticos

- **WHEN** existe un `destination.id` en población sin entrada climática correspondiente
- **THEN** la ficha de destino no rompe el build y muestra un mensaje en español indicando que el clima aún no está disponible para ese destino

### Requirement: Resumen climático en español

Para cada destino con datos climáticos, la ficha MUST mostrar un resumen legible en español del patrón climático (estaciones, temperaturas orientativas y precipitación en términos comprensibles para un viajero).

#### Scenario: Madrid muestra resumen

- **WHEN** el usuario visita `/destino/madrid/`
- **THEN** ve un bloque «Clima y mejores épocas» con un resumen que menciona el clima de Madrid (no otro destino)

#### Scenario: Atribución de fuente climática

- **WHEN** se muestra información climática
- **THEN** la UI incluye fuente y año de referencia, con el mismo nivel de transparencia que la comparación poblacional

### Requirement: Mejores épocas para viajar

Para cada destino con datos climáticos, el sistema MUST mostrar al menos una ventana recomendada («mejor época») con meses o estación y una razón breve en español (p. ej. temperatura agradable, menos lluvias).

#### Scenario: Ventanas recomendadas visibles

- **WHEN** el usuario lee la sección climática de un destino de prueba
- **THEN** identifica al menos un periodo recomendado para viajar sin consultar fuentes externas

#### Scenario: Coherencia al cambiar destino

- **WHEN** el usuario navega de Madrid a Ciudad de México mediante el selector de destino
- **THEN** el contenido climático corresponde a Ciudad de México y no permanece el de Madrid

### Requirement: Integración en ficha sin sustituir población

El bloque climático MUST mostrarse en la misma ruta `/destino/<id>/` que la comparación poblacional, **después** de la sección de población, sin ocultar ni degradar los requisitos de `population-comparison`.

#### Scenario: Población y clima en la misma visita

- **WHEN** el usuario abre `/destino/madrid/`
- **THEN** ve la comparación poblacional y, a continuación, clima y mejores épocas

### Requirement: Sin cultura en esta entrega

El alcance de `destination-climate` MUST NOT incluir bloques de cultura, costumbres detalladas ni calendario de eventos locales (Fase 4).

#### Scenario: Sin sección de cultura

- **WHEN** el usuario usa la ficha de destino tras esta entrega
- **THEN** no se presenta una sección de cultura como si estuviera implementada
