package com.inquisitorius.skillslink.domain.certificacion;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record DatosCreacionCertificacion(
        @NotNull Long usuarioId,
        @NotNull String nombre,
        @NotNull String institucion,
        @NotNull LocalDate fechaEmision
) {}