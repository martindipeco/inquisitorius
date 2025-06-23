package com.inquisitorius.skillslink.domain.cursos;

public record DatosRespuestaCurso(
        Long id,
        String titulo,
        String descripcion,
        Integer duracionHoras,
        NivelCurso nivel
) {}