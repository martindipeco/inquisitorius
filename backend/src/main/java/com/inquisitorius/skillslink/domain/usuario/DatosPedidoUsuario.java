package com.inquisitorius.skillslink.domain.usuario;

import jakarta.validation.constraints.NotBlank;

public class DatosPedidoUsuario {

    @NotBlank
    private String login;

    @NotBlank
    private String clave;

    // Getters y setters
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
}
