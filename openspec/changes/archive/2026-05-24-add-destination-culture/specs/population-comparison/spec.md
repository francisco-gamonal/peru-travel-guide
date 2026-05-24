## MODIFIED Requirements

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
