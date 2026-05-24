## MODIFIED Requirements

### Requirement: Comparación visual y numérica

Para el destino elegido, el sistema MUST mostrar en español las poblaciones del destino (ciudad y país) contrastadas con Perú, provincia de Lima y los distritos configurados, usando números formateados para locale `es-PE` y barras horizontales de proporción, dentro de **un único widget** de comparación poblacional (no una tarjeta independiente por cada fila de datos).

El widget MUST organizar la información en este orden:

1. **Capa país** — población del **país destino** frente a **Perú** (país).
2. **Capa ciudad** — población de la **ciudad destino** frente a la **provincia de Lima**; los **distritos** de Lima MUST mostrarse en la misma capa ciudad de forma compacta (lista o filas densas), sin duplicar el encabezado de país.

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
