---
version: "1.2.0"
capability: population-comparison
---

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

Para el destino elegido, el sistema MUST mostrar en español las poblaciones del destino (ciudad y país) contrastadas con Perú, provincia de Lima y los distritos configurados, usando números formateados para locale `es-PE` y barras horizontales de proporción, dentro de **un único widget** de comparación poblacional (no una tarjeta independiente por cada fila de datos).

El widget MUST organizar la información en este orden:

1. **Capa país** — población del **país destino** frente a **Perú** (país).
2. **Capa ciudad** — población de la **ciudad destino** frente a la **provincia de Lima**; los **distritos** de Lima MUST mostrarse en la misma capa ciudad de forma compacta (lista o filas densas), sin duplicar el encabezado de país.

La ficha de destino en `/destino/<id>/` MAY componer otras capabilities (p. ej. `destination-climate`, `destination-culture`) en la misma página sin que formen parte del alcance de población.

#### Scenario: Lectura de escala humana

- **WHEN** el usuario visualiza la comparación de un destino de prueba
- **THEN** puede identificar si la ciudad destino es mayor o menor que la provincia de Lima sin calcular manualmente

#### Scenario: Relación comprensible

- **WHEN** se muestran ciudad destino y provincia de Lima
- **THEN** aparece al menos una frase o etiqueta de relación (ratio, múltiplo o porcentaje) respecto a Lima, además de los números absolutos

#### Scenario: Capas país y ciudad distinguibles

- **WHEN** el usuario abre `/destino/madrid/`
- **THEN** ve dentro del mismo widget una subsección de comparación por **país** y otra por **ciudad**, en ese orden

#### Scenario: Menos scroll que el layout de tarjetas múltiples

- **WHEN** el usuario recorre la ficha en viewport móvil (~390px)
- **THEN** la comparación poblacional ocupa un solo bloque principal antes de la sección de clima (sin una tarjeta separada por cada referente peruano y fila destino)

### Requirement: Atribución de referentes

Cuando se muestra cualquier comparación con un referente peruano, la UI MUST incluir la fuente (p. ej. INEI) y el año de la cifra para ese referente. Las fuentes del widget MUST agruparse en un **bloque de atribución al pie** de la comparación poblacional (o al pie de cada subsección país/ciudad), en lugar de repetir un componente de fuente bajo cada barra individual.

#### Scenario: Atribución de referentes peruanos

- **WHEN** se muestra cualquier comparación con un referente peruano
- **THEN** la UI incluye la fuente (p. ej. INEI) y el año de la cifra, visibles en el pie del widget sin una tarjeta por fila

#### Scenario: Fuentes internacionales visibles

- **WHEN** se muestra la comparación poblacional del destino
- **THEN** las fuentes del país y la ciudad destino aparecen en el bloque de atribución agrupado junto a las peruanas

### Requirement: Sin funcionalidades de otras fases

El alcance de la capability `population-comparison` MUST limitarse a datos, lógica y presentación de **población**. La ficha de destino en `/destino/<id>/` MAY componer otras capabilities (p. ej. `destination-climate`, `destination-culture`) en la misma página sin que formen parte del alcance de población.

#### Scenario: Módulo de población acotado

- **WHEN** se implementa o modifica código bajo la capability `population-comparison`
- **THEN** no se añade lógica de clima, cultura ni calendario de épocas en `src/lib/population.ts` ni en componentes dedicados solo a población

#### Scenario: Página compuesta en Fase 3+

- **WHEN** el usuario visita `/destino/madrid/` tras la entrega de clima
- **THEN** puede ver población y clima en la misma ficha, cada uno como sección distinta

#### Scenario: Página compuesta con cultura en Fase 4+

- **WHEN** el usuario visita `/destino/madrid/` tras la entrega de cultura
- **THEN** puede ver población, clima y cultura en la misma ficha, cada uno como sección distinta

### Requirement: Destino Londres (Reino Unido) curado

El sistema MUST incluir un destino con `id` **`london`**, ciudad **Londres** y país **Reino Unido**, con población de ciudad y de país documentadas (`source`, `year`, URLs) en `src/data/destinations.json`, visible en el selector y en `/destino/london/`.

#### Scenario: PC-15 — Londres en datos y build

- **ID:** `PC-15`
- **WHEN** se ejecuta `pnpm build`
- **THEN** `loadPopulationData()` incluye el destino `london` con `cityName` Londres y `countryName` Reino Unido sin error de validación

#### Scenario: PC-16 — Comparación poblacional de Londres en E2E

- **ID:** `PC-16`
- **WHEN** el usuario abre `/destino/london/` tras el build estático
- **THEN** ve la comparación poblacional con cifras de Londres y Reino Unido frente a referentes peruanos, con atribución de fuente visible

### Requirement: Destinos París, Tokio y Nueva York curados

El sistema MUST incluir destinos con `id` **`paris`**, **`tokyo`** y **`new-york`**, con ciudad/país en español, `countryCode` (`FR`, `JP`, `US`), población de ciudad y país documentadas (`source`, `year`, URLs) en `src/data/destinations.json`, visibles en el selector y en `/destino/<id>/`.

#### Scenario: PC-17 — Tres destinos en datos y build

- **ID:** `PC-17`
- **WHEN** se ejecuta `pnpm build`
- **THEN** `loadPopulationData()` incluye `paris`, `tokyo` y `new-york` con `cityName`/`countryName` correctos y `countryCode` válido sin error de validación

#### Scenario: PC-18 — Comparación poblacional de París en E2E

- **ID:** `PC-18`
- **WHEN** el usuario abre `/destino/paris/` tras el build estático
- **THEN** ve la comparación poblacional con cifras de París y Francia frente a referentes peruanos

#### Scenario: PC-19 — Comparación poblacional de Tokio en E2E

- **ID:** `PC-19`
- **WHEN** el usuario abre `/destino/tokyo/` tras el build estático
- **THEN** ve la comparación poblacional con cifras de Tokio y Japón frente a referentes peruanos

#### Scenario: PC-20 — Comparación poblacional de Nueva York en E2E

- **ID:** `PC-20`
- **WHEN** el usuario abre `/destino/new-york/` tras el build estático
- **THEN** ve la comparación poblacional con cifras de Nueva York y Estados Unidos frente a referentes peruanos
