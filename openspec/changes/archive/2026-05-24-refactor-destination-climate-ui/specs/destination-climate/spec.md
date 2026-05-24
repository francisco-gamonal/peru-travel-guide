## MODIFIED Requirements

### Requirement: Resumen climático en español

Para cada destino con datos climáticos, la ficha MUST mostrar un resumen legible en español del patrón climático (estaciones, temperaturas orientativas y precipitación en términos comprensibles para un viajero), dentro de **un único widget** de clima y mejores épocas (no una tarjeta independiente solo para el resumen).

#### Scenario: Madrid muestra resumen

- **WHEN** el usuario visita `/destino/madrid/`
- **THEN** ve un bloque «Clima y mejores épocas» con un resumen que menciona el clima de Madrid (no otro destino)

#### Scenario: Atribución de fuente climática

- **WHEN** se muestra información climática
- **THEN** la UI incluye fuente y año de referencia en el **pie del widget climático**, con el mismo nivel de transparencia que la comparación poblacional, sin un componente de fuente separado debajo de otra tarjeta

### Requirement: Mejores épocas para viajar

Para cada destino con datos climáticos, el sistema MUST mostrar al menos una ventana recomendada («mejor época») con meses o estación y una razón breve en español (p. ej. temperatura agradable, menos lluvias). Las ventanas y las estaciones MUST presentarse como **subsecciones compactas** dentro del mismo widget climático, no como tarjetas apiladas independientes.

#### Scenario: Ventanas recomendadas visibles

- **WHEN** el usuario lee la sección climática de un destino de prueba
- **THEN** identifica al menos un periodo recomendado para viajar sin consultar fuentes externas

#### Scenario: Coherencia al cambiar destino

- **WHEN** el usuario navega de Madrid a Ciudad de México mediante el selector de destino
- **THEN** el contenido climático corresponde a Ciudad de México y no permanece el de Madrid

#### Scenario: Estaciones y épocas en un solo bloque

- **WHEN** el usuario abre `/destino/madrid/` en viewport móvil (~390px)
- **THEN** el resumen, las estaciones y las mejores épocas forman **un solo bloque principal** de clima antes del pie de la página (sin tres tarjetas `rounded-xl` hermanas apiladas)

## ADDED Requirements

### Requirement: Presentación compacta del bloque climático

El bloque «Clima y mejores épocas» MUST usar una estructura escaneable: encabezado con resumen, subsección de estaciones (tabla o lista densa) y subsección de mejores épocas, con atribución de fuente agrupada al final del widget.

#### Scenario: Subsecciones distinguibles

- **WHEN** el usuario lee el widget climático de un destino curado
- **THEN** distingue las subsecciones de estaciones y de mejores épocas sin scroll excesivo entre tarjetas separadas

#### Scenario: Selector E2E estable

- **WHEN** se ejecutan las pruebas E2E de destinos
- **THEN** el contenedor `section[aria-labelledby="climate-heading"]` sigue siendo el ancla del bloque y contiene el texto climático esperado por destino
