package com.inquisitorius.skillslink.service;

import com.inquisitorius.skillslink.domain.certificacion.Certificacion;
import com.inquisitorius.skillslink.domain.certificacion.DatosCreacionCertificacion;
import com.inquisitorius.skillslink.domain.certificacion.DatosRespuestaCertificacion;
import com.inquisitorius.skillslink.domain.usuario.Usuario;
import com.inquisitorius.skillslink.repository.CertificacionRepository;
import com.inquisitorius.skillslink.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CertificacionService {

    @Autowired
    private CertificacionRepository certificacionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public DatosRespuestaCertificacion crearCertificacion(DatosCreacionCertificacion datos) {
        Usuario usuario = usuarioRepository.findById(datos.usuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Certificacion certificacion = new Certificacion();
        certificacion.setUsuario(usuario);
        certificacion.setNombre(datos.nombre());
        certificacion.setInstitucion(datos.institucion());
        certificacion.setFechaEmision(datos.fechaEmision());

        Certificacion guardada = certificacionRepository.save(certificacion);
        return convertirADto(guardada);
    }

    public List<DatosRespuestaCertificacion> listarCertificaciones() {
        return certificacionRepository.findAll().stream()
                .map(this::convertirADto)
                .collect(Collectors.toList());
    }

    private DatosRespuestaCertificacion convertirADto(Certificacion certificacion) {
        return new DatosRespuestaCertificacion(
                certificacion.getId(),
                certificacion.getUsuario().getId(),
                certificacion.getNombre(),
                certificacion.getInstitucion(),
                certificacion.getFechaEmision()
        );
    }
}
