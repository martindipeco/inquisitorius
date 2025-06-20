package com.inquisitorius.skillslink.service;

import com.inquisitorius.skillslink.domain.cursos.Curso;
import com.inquisitorius.skillslink.domain.cursos.DatosCreacionCurso;
import com.inquisitorius.skillslink.domain.cursos.DatosRespuestaCurso;
import com.inquisitorius.skillslink.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    // Obtener todos los cursos (convertidos a DTO de respuesta)
    public List<DatosRespuestaCurso> obtenerTodos() {
        return cursoRepository.findAll().stream()
                .map(this::convertirACursoDto)
                .collect(Collectors.toList());
    }

    // Guardar curso desde el DTO de solicitud
    public DatosRespuestaCurso guardarCurso(DatosCreacionCurso datosCreacionCurso) {
        Curso curso = new Curso();
        curso.setTitulo(datosCreacionCurso.titulo());
        curso.setDescripcion(datosCreacionCurso.descripcion());
        curso.setDuracionHoras(datosCreacionCurso.duracionHoras());
        curso.setNivel(datosCreacionCurso.nivel());

        Curso cursoGuardado = cursoRepository.save(curso);
        return convertirACursoDto(cursoGuardado);
    }

    // Convertir entidad Curso a DTO de respuesta
    private DatosRespuestaCurso convertirACursoDto(Curso curso) {
        return new DatosRespuestaCurso(
                curso.getId(),
                curso.getTitulo(),
                curso.getDescripcion(),
                curso.getDuracionHoras(),
                curso.getNivel()
        );
    }
}