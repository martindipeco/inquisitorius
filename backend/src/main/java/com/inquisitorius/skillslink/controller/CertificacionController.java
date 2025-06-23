package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.certificacion.DatosCreacionCertificacion;
import com.inquisitorius.skillslink.domain.certificacion.DatosRespuestaCertificacion;
import com.inquisitorius.skillslink.service.CertificacionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificaciones")
public class CertificacionController {

    @Autowired
    private CertificacionService certificacionService;

    // Crear certificación (ADMIN o MENTOR)
    @PreAuthorize("hasAnyRole('ADMIN', 'MENTOR')")
    @PostMapping
    public DatosRespuestaCertificacion crear(@RequestBody @Valid DatosCreacionCertificacion datos) {
        return certificacionService.crearCertificacion(datos);
    }

    // Listar todas las certificaciones
    @GetMapping
    public List<DatosRespuestaCertificacion> listar() {
        return certificacionService.listarCertificaciones();
    }

    // Obtener certificación por ID
    @GetMapping("/{id}")
    public DatosRespuestaCertificacion obtener(@PathVariable Long id) {
        return certificacionService.obtenerPorId(id);
    }

    // Actualizar certificación (ADMIN o MENTOR)
    @PreAuthorize("hasAnyRole('ADMIN', 'MENTOR')")
    @PutMapping("/{id}")
    public DatosRespuestaCertificacion actualizar(@PathVariable Long id,
                                                  @RequestBody @Valid DatosCreacionCertificacion datos) {
        return certificacionService.actualizarCertificacion(id, datos);
    }

    // Eliminar certificación (solo ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        certificacionService.eliminarCertificacion(id);
    }
}