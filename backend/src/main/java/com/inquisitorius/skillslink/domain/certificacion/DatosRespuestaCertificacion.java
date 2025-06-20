package com.inquisitorius.skillslink.domain.certificacion;

import java.time.LocalDate;

public record DatosRespuestaCertificacion(
        Long id,
        Long usuarioId,
        String nombre,
        String institucion,
        LocalDate fechaEmision
) {}