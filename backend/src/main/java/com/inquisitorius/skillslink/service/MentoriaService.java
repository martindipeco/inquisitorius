package com.inquisitorius.skillslink.service;

import com.inquisitorius.skillslink.domain.cursos.Curso;
import com.inquisitorius.skillslink.domain.mentoria.DatosCreacionMentoria;
import com.inquisitorius.skillslink.domain.mentoria.DatosRespuestaMentoria;
import com.inquisitorius.skillslink.domain.mentoria.EstadoMentoria;
import com.inquisitorius.skillslink.domain.mentoria.Mentoria;
import com.inquisitorius.skillslink.domain.usuario.Usuario;
import com.inquisitorius.skillslink.repository.CursoRepository;
import com.inquisitorius.skillslink.repository.MentoriaRepository;
import com.inquisitorius.skillslink.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MentoriaService {

    @Autowired
    private MentoriaRepository mentoriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CursoRepository cursoRepository;

    public DatosRespuestaMentoria crearMentoria(DatosCreacionMentoria datos) {
        Usuario mentor = usuarioRepository.findById(datos.mentorId())
                .orElseThrow(() -> new IllegalArgumentException("Mentor no encontrado"));
        Usuario aprendiz = usuarioRepository.findById(datos.aprendizId())
                .orElseThrow(() -> new IllegalArgumentException("Aprendiz no encontrado"));
        Curso curso = cursoRepository.findById(datos.cursoId())
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));

        Mentoria mentoria = new Mentoria();
        mentoria.setMentor(mentor);
        mentoria.setAprendiz(aprendiz);
        mentoria.setCurso(curso);
        mentoria.setFechaInicio(datos.fechaInicio());
        mentoria.setEstado(datos.estado());

        Mentoria guardada = mentoriaRepository.save(mentoria);
        return convertirAMentoriaDto(guardada);
    }

    public List<DatosRespuestaMentoria> listarMentorias() {
        return mentoriaRepository.findAll().stream()
                .map(this::convertirAMentoriaDto)
                .collect(Collectors.toList());
    }

    private DatosRespuestaMentoria convertirAMentoriaDto(Mentoria mentoria) {
        return new DatosRespuestaMentoria(
                mentoria.getId(),
                mentoria.getMentor().getId(),
                mentoria.getAprendiz().getId(),
                mentoria.getCurso().getId(),
                mentoria.getFechaInicio(),
                mentoria.getEstado()
        );
    }
    public DatosRespuestaMentoria obtenerPorId(Long id) {
        Mentoria mentoria = mentoriaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Mentoría no encontrada"));
        return convertirAMentoriaDto(mentoria);
    }

    public DatosRespuestaMentoria actualizarMentoria(Long id, DatosCreacionMentoria datos) {
        Mentoria mentoria = mentoriaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Mentoría no encontrada"));

        Usuario mentor = usuarioRepository.findById(datos.mentorId())
                .orElseThrow(() -> new IllegalArgumentException("Mentor no encontrado"));
        Usuario aprendiz = usuarioRepository.findById(datos.aprendizId())
                .orElseThrow(() -> new IllegalArgumentException("Aprendiz no encontrado"));
        Curso curso = cursoRepository.findById(datos.cursoId())
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));

        mentoria.setMentor(mentor);
        mentoria.setAprendiz(aprendiz);
        mentoria.setCurso(curso);
        mentoria.setFechaInicio(datos.fechaInicio());
        mentoria.setEstado(datos.estado());

        return convertirAMentoriaDto(mentoriaRepository.save(mentoria));
    }

    public void eliminarMentoria(Long id) {
        if (!mentoriaRepository.existsById(id)) {
            throw new IllegalArgumentException("Mentoría no encontrada");
        }
        mentoriaRepository.deleteById(id);
    }
}