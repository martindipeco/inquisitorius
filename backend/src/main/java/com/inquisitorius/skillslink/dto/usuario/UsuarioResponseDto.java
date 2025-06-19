package com.inquisitorius.skillslink.dto.usuario;

public class UsuarioResponseDto {
    private Long id;
    private String login;

    public UsuarioResponseDto(Long id, String login) {
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
