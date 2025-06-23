package com.inquisitorius.skillslink.domain.mensajes;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosCreacionMensaje(
        @NotNull Long remitenteId,
        @NotNull Long receptorId,
        @NotBlank String contenido
) {}