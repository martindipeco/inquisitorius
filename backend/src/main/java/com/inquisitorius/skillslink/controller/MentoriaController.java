package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.mentoria.Mentoria;
import com.inquisitorius.skillslink.domain.mentoria.RequestMentoriaDto;

import com.inquisitorius.skillslink.service.MentoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentoria")
public class MentoriaController {

    @Autowired
    private MentoriaService mentoriaService;

    @GetMapping
    public List<Mentoria> obtenerMentorias() {
        return mentoriaService.obtenerTodas();
    }

    @PostMapping
    public Mentoria crearMentoria(@RequestBody RequestMentoriaDto dto) {
        return mentoriaService.guardarMentoriaDesdeDto(dto);
    }
}