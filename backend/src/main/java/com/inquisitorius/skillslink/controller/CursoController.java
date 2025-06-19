package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.cursos.RequestCursoDto;
import com.inquisitorius.skillslink.domain.cursos.ResponseCursoDto;
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
    public List<ResponseCursoDto> obtenerCursos() {
        return cursoService.obtenerTodos();
    }

    // Crear un curso usando el DTO de solicitud
    @PostMapping
    public ResponseCursoDto crearCurso(@RequestBody RequestCursoDto requestCursoDto) {
        return cursoService.guardarCurso(requestCursoDto);
    }
}