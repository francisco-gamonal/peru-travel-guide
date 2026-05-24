# population-comparison Specification

## Purpose
TBD - created by archiving change add-population-comparison. Update Purpose after archive.

## Requirements

### Requirement: Referentes peruanos de población

El sistema MUST disponer de datos de población para **Perú** (país), la **provincia de Lima** y al menos **dos distritos** de Lima metropolitanos, cargados desde datos curados en el repositorio (no API en tiempo de ejecución en el MVP).

#### Scenario: Referentes disponibles en build

- **WHEN** se ejecuta `pnpm build`
- **THEN** los referentes peruanos están disponibles sin error de validación de tipos ni de parseo JSON

#### Scenario: Atribución de referentes

- **WHEN** se muestra cualquier comparación con un referente peruano
- **THEN** la UI incluye la fuente (p. ej. INEI) y el año de la cifra para ese referente

### Requirement: Destinos internacionales curados

El sistema MUST incluir al menos **un destino internacional de prueba** con población de **ciudad** y de **país**, cada una con `source` y `year` documentados en los datos.

#### Scenario: Destino de prueba del roadmap

- **WHEN** el usuario selecciona el destino de prueba definido en el cambio (p. ej. Madrid)
- **THEN** ve población de la ciudad y del país asociado

#### Scenario: Destino inexistente

- **WHEN** se solicita un `destination` id no definido en los datos
- **THEN** el sistema muestra un estado seguro (mensaje en español o vista por defecto sin datos rotos) sin error 500 en build estático

### Requirement: Selección de destino por el usuario

El usuario MUST poder elegir un destino desde la interfaz principal mediante un control explícito (p. ej. `<select>` o enlaces) sin escribir coordenadas ni IDs técnicos.

#### Scenario: Cambiar destino

- **WHEN** el usuario elige otro destino en el control de selección
- **THEN** la vista de comparación se actualiza con los datos del nuevo destino

#### Scenario: Primera visita

- **WHEN** el usuario abre `/` sin parámetros de destino
- **THEN** ve el control de selección y una comparación por defecto o un mensaje que invite a elegir destino (sin pantalla vacía)

### Requirement: Comparación visual y numérica

Para el destino elegido, el sistema MUST mostrar en español las poblaciones del destino (ciudad y país) contrastadas con Perú, provincia de Lima y los distritos configurados, usando números formateados para locale `es-PE` y al menos un elemento visual de proporción (p. ej. barras) además de las cifras absolutas.

#### Scenario: Lectura de escala humana

- **WHEN** el usuario visualiza la comparación de un destino de prueba
- **THEN** puede identificar si la ciudad destino es mayor o menor que la provincia de Lima sin calcular manualmente

#### Scenario: Relación comprensible

- **WHEN** se muestran ciudad destino y provincia de Lima
- **THEN** aparece al menos una frase o etiqueta de relación (ratio, múltiplo o porcentaje) respecto a Lima, además de los números absolutos

### Requirement: Sin funcionalidades de otras fases

El alcance de la capability `population-comparison` MUST limitarse a datos, lógica y presentación de **población**. La ficha de destino en `/destino/<id>/` MAY componer otras capabilities (p. ej. `destination-climate`) en la misma página sin que formen parte del alcance de población.

#### Scenario: Módulo de población acotado

- **WHEN** se implementa o modifica código bajo la capability `population-comparison`
- **THEN** no se añade lógica de clima, cultura ni calendario de épocas en `src/lib/population.ts` ni en componentes dedicados solo a población

#### Scenario: Página compuesta en Fase 3+

- **WHEN** el usuario visita `/destino/madrid/` tras la entrega de clima
- **THEN** puede ver población y clima en la misma ficha, cada uno como sección distinta
