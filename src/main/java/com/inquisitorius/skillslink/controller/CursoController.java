package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.cursos.DatosCreacionCurso;
import com.inquisitorius.skillslink.domain.cursos.DatosRespuestaCurso;
import com.inquisitorius.skillslink.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    // Obtener todos los cursos (acceso libre a usuarios autenticados)
    @GetMapping
    public List<DatosRespuestaCurso> obtenerCursos() {
        return cursoService.obtenerTodos();
    }

    // Obtener curso por ID
    @GetMapping("/{id}")
    public DatosRespuestaCurso obtenerCurso(@PathVariable Long id) {
        return cursoService.obtenerPorId(id);
    }

    // Crear curso (solo ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public DatosRespuestaCurso crearCurso(@RequestBody DatosCreacionCurso datosCreacionCurso) {
        return cursoService.guardarCurso(datosCreacionCurso);
    }

    // Actualizar curso (solo ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public DatosRespuestaCurso actualizarCurso(@PathVariable Long id,
                                               @RequestBody DatosCreacionCurso datos) {
        return cursoService.actualizarCurso(id, datos);
    }

    // Eliminar curso (solo ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void eliminarCurso(@PathVariable Long id) {
        cursoService.eliminarCurso(id);
    }
}