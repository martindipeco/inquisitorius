package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.mensajes.DatosCreacionMensaje;
import com.inquisitorius.skillslink.domain.mensajes.DatosRespuestaMensaje;
import com.inquisitorius.skillslink.service.MensajeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/mensajes")
public class MensajeController {

    private final MensajeService mensajeService;

    @Autowired
    public MensajeController(MensajeService mensajeService) {
        this.mensajeService = mensajeService;
    }

    @PostMapping
    public ResponseEntity<DatosRespuestaMensaje> crear(@RequestBody @Valid DatosCreacionMensaje datos) {
        DatosRespuestaMensaje mensaje = mensajeService.crearMensaje(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(mensaje);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatosRespuestaMensaje> obtenerPorId(@PathVariable Long id) {
        return mensajeService.obtenerMensajePorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/receptor/{receptorId}")
    public List<DatosRespuestaMensaje> obtenerPorReceptor(@PathVariable Long receptorId) {
        return mensajeService.obtenerMensajesPorReceptor(receptorId);
    }

    @GetMapping("/remitente/{remitenteId}")
    public List<DatosRespuestaMensaje> obtenerPorRemitente(@PathVariable Long remitenteId) {
        return mensajeService.obtenerMensajesPorRemitente(remitenteId);
    }

    @GetMapping("/conversacion")
    public List<DatosRespuestaMensaje> obtenerConversacion(
            @RequestParam Long usuario1Id,
            @RequestParam Long usuario2Id) {
        return mensajeService.obtenerConversacion(usuario1Id, usuario2Id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        mensajeService.eliminarMensaje(id);
        return ResponseEntity.noContent().build();
    }
}
