package com.inquisitorius.skillslink.service;

import com.inquisitorius.skillslink.domain.mensajes.DatosCreacionMensaje;
import com.inquisitorius.skillslink.domain.mensajes.DatosRespuestaMensaje;
import com.inquisitorius.skillslink.domain.mensajes.Mensaje;
import com.inquisitorius.skillslink.domain.usuario.Usuario;
import com.inquisitorius.skillslink.repository.MensajeRepository;
import com.inquisitorius.skillslink.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MensajeService {

    private final MensajeRepository mensajeRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public MensajeService(MensajeRepository mensajeRepository, UsuarioRepository usuarioRepository) {
        this.mensajeRepository = mensajeRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public DatosRespuestaMensaje crearMensaje(DatosCreacionMensaje datos) {
        Usuario remitente = usuarioRepository.findById(datos.remitenteId())
                .orElseThrow(() -> new EntityNotFoundException("Remitente no encontrado"));
        Usuario receptor = usuarioRepository.findById(datos.receptorId())
                .orElseThrow(() -> new EntityNotFoundException("Receptor no encontrado"));

        Mensaje mensaje = new Mensaje(remitente, receptor, datos.contenido());
        mensajeRepository.save(mensaje);

        return new DatosRespuestaMensaje(mensaje);
    }

    public List<DatosRespuestaMensaje> obtenerMensajesPorReceptor(Long receptorId) {
        Usuario receptor = usuarioRepository.findById(receptorId)
                .orElseThrow(() -> new EntityNotFoundException("Receptor no encontrado"));

        return mensajeRepository.findByReceptor(receptor)
                .stream()
                .map(DatosRespuestaMensaje::new)
                .toList();
    }

    public List<DatosRespuestaMensaje> obtenerMensajesPorRemitente(Long remitenteId) {
        Usuario remitente = usuarioRepository.findById(remitenteId)
                .orElseThrow(() -> new EntityNotFoundException("Remitente no encontrado"));

        return mensajeRepository.findByRemitente(remitente)
                .stream()
                .map(DatosRespuestaMensaje::new)
                .toList();
    }

    public List<DatosRespuestaMensaje> obtenerConversacion(Long usuario1Id, Long usuario2Id) {
        Usuario usuario1 = usuarioRepository.findById(usuario1Id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario 1 no encontrado"));
        Usuario usuario2 = usuarioRepository.findById(usuario2Id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario 2 no encontrado"));

        return mensajeRepository.findConversacionEntreUsuarios(usuario1, usuario2)
                .stream()
                .map(DatosRespuestaMensaje::new)
                .toList();
    }

    public Optional<DatosRespuestaMensaje> obtenerMensajePorId(Long id) {
        return mensajeRepository.findById(id)
                .map(DatosRespuestaMensaje::new);
    }

    public void eliminarMensaje(Long id) {
        if (!mensajeRepository.existsById(id)) {
            throw new EntityNotFoundException("Mensaje no encontrado");
        }
        mensajeRepository.deleteById(id);
    }
}