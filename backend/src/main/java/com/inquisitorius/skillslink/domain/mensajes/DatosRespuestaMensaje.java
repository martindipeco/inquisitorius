package com.inquisitorius.skillslink.domain.mensajes;

import java.util.Date;

public record DatosRespuestaMensaje(
        Long id,
        Long remitenteId,
        Long receptorId,
        String contenido,
        Date fechaEnvio
) {
    public DatosRespuestaMensaje(Mensaje mensaje) {
        this(
            mensaje.getId(),
            mensaje.getRemitente().getId(),
            mensaje.getReceptor().getId(),
            mensaje.getContenido(),
            mensaje.getFechaEnvio()
        );
    }
}