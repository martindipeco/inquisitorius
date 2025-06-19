package com.inquisitorius.skillslink.repository;



import com.inquisitorius.skillslink.domain.certificacion.Certificacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificacionRepository extends JpaRepository<Certificacion, Long> {
}
