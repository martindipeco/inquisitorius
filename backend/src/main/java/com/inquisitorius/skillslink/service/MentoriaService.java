package com.inquisitorius.skillslink.service;

import com.inquisitorius.skillslink.domain.mentoria.Mentoria;
import com.inquisitorius.skillslink.domain.usuario.Usuario;
import com.inquisitorius.skillslink.repository.MentoriaRepository;
import com.inquisitorius.skillslink.repository.UsuarioRepository;
import com.inquisitorius.skillslink.domain.mentoria.RequestMentoriaDto;
import com.inquisitorius.skillslink.domain.mentoria.EstadoMentoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentoriaService {

    @Autowired
    private MentoriaRepository mentoriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Mentoria> obtenerTodas() {
        return mentoriaRepository.findAll();
    }

    public Mentoria guardarMentoriaDesdeDto(RequestMentoriaDto dto) {
        Usuario mentor = usuarioRepository.findById(dto.getMentorId())
                .orElseThrow(() -> new IllegalArgumentException("Mentor no encontrado"));

        Usuario aprendiz = usuarioRepository.findById(dto.getAprendizId())
                .orElseThrow(() -> new IllegalArgumentException("Aprendiz no encontrado"));

        Mentoria mentoria = new Mentoria();
        mentoria.setFechaInicio(dto.getFechaInicio());
        mentoria.setEstado(dto.getEstado());
        mentoria.setMentor(mentor);
        mentoria.setAprendiz(aprendiz);
        mentoria.setNivel(dto.getNivel());

        return mentoriaRepository.save(mentoria);
    }
}