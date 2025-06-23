package com.inquisitorius.skillslink.domain.mentoria;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record DatosCreacionMentoria(
        @NotNull Long mentorId,
        @NotNull Long aprendizId,
        @NotNull Long cursoId,
        @NotNull LocalDate fechaInicio,
        @NotNull EstadoMentoria estado
) {}