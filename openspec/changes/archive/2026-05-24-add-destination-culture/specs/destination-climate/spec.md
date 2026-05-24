## REMOVED Requirements

### Requirement: Sin cultura en esta entrega

**Reason**: La cultura pasa a la capability `destination-culture` (Fase 4); el clima ya no debe prohibir su presencia en la misma página.

**Migration**: Implementar `add-destination-culture`; la página `/destino/<id>/` compone ambas capabilities de forma independiente.
