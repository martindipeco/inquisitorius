package com.inquisitorius.skillslink.repository;

import com.inquisitorius.skillslink.domain.mensajes.Mensaje;
import com.inquisitorius.skillslink.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
/*
@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Long> {
    List<Mensaje> findByReceptorId(Long receptorId);
}*/

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Long> {

    List<Mensaje> findByReceptor(Usuario receptor);

    List<Mensaje> findByRemitente(Usuario remitente);

    @Query("""
       SELECT m FROM Mensaje m
       WHERE (m.remitente = :usuario1 AND m.receptor = :usuario2)
          OR (m.remitente = :usuario2 AND m.receptor = :usuario1)
       ORDER BY m.fechaEnvio
       """)
    List<Mensaje> findConversacionEntreUsuarios(@Param("usuario1") Usuario usuario1,
                                                @Param("usuario2") Usuario usuario2);
}
 