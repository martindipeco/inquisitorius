package com.inquisitorius.skillslink.domain.usuario;

public class DatosRespuestaUsuario {
    private Long id;
    private String login;

    public DatosRespuestaUsuario(Long id, String login) {
        this.id = id;
        this.login = login;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
