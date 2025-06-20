package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.cursos.DatosCreacionCurso;
import com.inquisitorius.skillslink.domain.cursos.DatosRespuestaCurso;
import com.inquisitorius.skillslink.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    // Obtener lista de cursos en formato DTO
    @GetMapping
    public List<DatosRespuestaCurso> obtenerCursos() {
        return cursoService.obtenerTodos();
    }

    // Crear un curso usando el DTO de solicitud
    @PostMapping
    public DatosRespuestaCurso crearCurso(@RequestBody DatosCreacionCurso datosCreacionCurso) {
        return cursoService.guardarCurso(datosCreacionCurso);
    }
}