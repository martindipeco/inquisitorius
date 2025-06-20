package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.mentoria.DatosCreacionMentoria;
import com.inquisitorius.skillslink.domain.mentoria.DatosRespuestaMentoria;
import com.inquisitorius.skillslink.service.MentoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentorias")
public class MentoriaController {

    @Autowired
    private MentoriaService mentoriaService;

    // Endpoint para crear una nueva mentoría
    @PostMapping
    public DatosRespuestaMentoria crear(@RequestBody @Valid DatosCreacionMentoria datos) {
        return mentoriaService.crearMentoria(datos);
    }

    // Endpoint para listar todas las mentorías
    @GetMapping
    public List<DatosRespuestaMentoria> listar() {
        return mentoriaService.listarMentorias();
    }
}