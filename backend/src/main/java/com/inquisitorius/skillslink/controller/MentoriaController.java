package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.mentoria.DatosCreacionMentoria;
import com.inquisitorius.skillslink.domain.mentoria.DatosRespuestaMentoria;
import com.inquisitorius.skillslink.service.MentoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentorias")
public class MentoriaController {

    @Autowired
    private MentoriaService mentoriaService;

    // Crear mentoría (solo ADMIN o MENTOR)
    @PreAuthorize("hasAnyRole('ADMIN', 'MENTOR')")
    @PostMapping
    public DatosRespuestaMentoria crear(@RequestBody @Valid DatosCreacionMentoria datos) {
        return mentoriaService.crearMentoria(datos);
    }

    // Listar todas las mentorías (acceso libre autenticado)
    @GetMapping
    public List<DatosRespuestaMentoria> listar() {
        return mentoriaService.listarMentorias();
    }

    // Obtener mentoría por ID (acceso libre autenticado)
    @GetMapping("/{id}")
    public DatosRespuestaMentoria obtener(@PathVariable Long id) {
        return mentoriaService.obtenerPorId(id);
    }

    // Actualizar mentoría (solo ADMIN o MENTOR)
    @PreAuthorize("hasAnyRole('ADMIN', 'MENTOR')")
    @PutMapping("/{id}")
    public DatosRespuestaMentoria actualizar(@PathVariable Long id,
                                             @RequestBody @Valid DatosCreacionMentoria datos) {
        return mentoriaService.actualizarMentoria(id, datos);
    }

    // Eliminar mentoría (solo ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        mentoriaService.eliminarMentoria(id);
    }
}