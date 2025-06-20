package com.inquisitorius.skillslink.domain.cursos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosCreacionCurso(
        @NotBlank(message = "El título del curso no puede estar vacío") String titulo,
        @NotBlank(message = "La descripción del curso no puede estar vacía") String descripcion,
        @NotNull(message = "La duración debe ser especificada") Integer duracionHoras,
        @NotNull(message = "El nivel debe ser especificado") NivelCurso nivel
) {}