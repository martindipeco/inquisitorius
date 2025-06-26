package com.inquisitorius.skillslink.domain.usuario;

public record DatosRespuestaAutenticacionUsuario(String token, Long userId, String login, String rol) {
}
