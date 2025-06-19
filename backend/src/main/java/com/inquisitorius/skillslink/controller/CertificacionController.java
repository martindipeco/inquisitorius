package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.certificacion.Certificacion;
import com.inquisitorius.skillslink.service.CertificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/certificaciones")
public class CertificacionController {

    @Autowired
    private CertificacionService certificacionService;

    //  Obtener todas las certificaciones
    @GetMapping
    public List<Certificacion> obtenerCertificaciones() {
        return certificacionService.obtenerTodas();
    }

    // Obtener certificación por ID
    @GetMapping("/{id}")
    public Optional<Certificacion> obtenerCertificacion(@PathVariable Long id) {
        return certificacionService.obtenerPorId(id);
    }

    // Crear una nueva certificación
    @PostMapping
    public Certificacion crearCertificacion(@RequestBody Certificacion certificacion) {
        return certificacionService.guardarCertificacion(certificacion);
    }
}
