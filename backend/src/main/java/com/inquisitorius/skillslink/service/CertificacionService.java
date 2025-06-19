package com.inquisitorius.skillslink.service;


import com.inquisitorius.skillslink.domain.certificacion.Certificacion;
import com.inquisitorius.skillslink.repository.CertificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CertificacionService {

    @Autowired
    private CertificacionRepository certificacionRepository;

    public List<Certificacion> obtenerTodas() {
        return certificacionRepository.findAll();
    }

    public Optional<Certificacion> obtenerPorId(Long id) {
        return certificacionRepository.findById(id);
    }

    public Certificacion guardarCertificacion(Certificacion certificacion) {
        return certificacionRepository.save(certificacion);
    }
}

