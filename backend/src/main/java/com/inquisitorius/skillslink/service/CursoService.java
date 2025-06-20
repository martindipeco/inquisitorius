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

    // Obtener todos los cursos
    public List<DatosRespuestaCurso> obtenerTodos() {
        return cursoRepository.findAll().stream()
                .map(this::convertirACursoDto)
                .collect(Collectors.toList());
    }

    // Obtener curso por ID
    public DatosRespuestaCurso obtenerPorId(Long id) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));
        return convertirACursoDto(curso);
    }

    // Guardar curso nuevo
    public DatosRespuestaCurso guardarCurso(DatosCreacionCurso datosCreacionCurso) {
        Curso curso = new Curso();
        curso.setTitulo(datosCreacionCurso.titulo());
        curso.setDescripcion(datosCreacionCurso.descripcion());
        curso.setDuracionHoras(datosCreacionCurso.duracionHoras());
        curso.setNivel(datosCreacionCurso.nivel());

        Curso cursoGuardado = cursoRepository.save(curso);
        return convertirACursoDto(cursoGuardado);
    }

    // Actualizar curso existente
    public DatosRespuestaCurso actualizarCurso(Long id, DatosCreacionCurso datos) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));

        curso.setTitulo(datos.titulo());
        curso.setDescripcion(datos.descripcion());
        curso.setDuracionHoras(datos.duracionHoras());
        curso.setNivel(datos.nivel());

        Curso actualizado = cursoRepository.save(curso);
        return convertirACursoDto(actualizado);
    }

    // Eliminar curso
    public void eliminarCurso(Long id) {
        if (!cursoRepository.existsById(id)) {
            throw new IllegalArgumentException("Curso no encontrado");
        }
        cursoRepository.deleteById(id);
    }

    // Conversión a DTO
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
