package com.inquisitorius.skillslink.domain.mentoria;

import java.time.LocalDate;

public record DatosRespuestaMentoria(
        Long id,
        Long mentorId,
        Long aprendizId,
        Long cursoId,
        LocalDate fechaInicio,
        EstadoMentoria estado
) {}