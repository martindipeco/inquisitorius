package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.certificacion.DatosCreacionCertificacion;
import com.inquisitorius.skillslink.domain.certificacion.DatosRespuestaCertificacion;
import com.inquisitorius.skillslink.service.CertificacionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificaciones/{id}")
public class CertificacionController {

    @Autowired
    private CertificacionService certificacionService;

    @PostMapping
    public DatosRespuestaCertificacion crear(@RequestBody @Valid DatosCreacionCertificacion datos) {
        return certificacionService.crearCertificacion(datos);
    }

    @GetMapping
    public List<DatosRespuestaCertificacion> listar() {
        return certificacionService.listarCertificaciones();
    }
}