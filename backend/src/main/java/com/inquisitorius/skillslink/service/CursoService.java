package com.inquisitorius.skillslink.service;

import com.inquisitorius.skillslink.domain.cursos.Curso;
import com.inquisitorius.skillslink.domain.cursos.RequestCursoDto;
import com.inquisitorius.skillslink.domain.cursos.ResponseCursoDto;
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
    public List<ResponseCursoDto> obtenerTodos() {
        return cursoRepository.findAll().stream().map(this::convertirACursoDto).collect(Collectors.toList());
    }

    // Guardar curso desde el DTO de solicitud
    public ResponseCursoDto guardarCurso(RequestCursoDto requestCursoDto) {
        Curso curso = new Curso();
        curso.setTitulo(requestCursoDto.getTitulo());
        curso.setDescripcion(requestCursoDto.getDescripcion());
        curso.setDuracionHoras(requestCursoDto.getDuracionHoras());

        Curso cursoGuardado = cursoRepository.save(curso);
        return convertirACursoDto(cursoGuardado);
    }

    // Convertir entidad Curso a DTO de respuesta
    private ResponseCursoDto convertirACursoDto(Curso curso) {
        ResponseCursoDto dto = new ResponseCursoDto();
        dto.setId(curso.getId());
        dto.setTitulo(curso.getTitulo());
        dto.setDescripcion(curso.getDescripcion());
        dto.setDuracionHoras(curso.getDuracionHoras());
        return dto;
    }
}