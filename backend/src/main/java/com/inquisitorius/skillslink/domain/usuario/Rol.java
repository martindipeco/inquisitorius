package com.inquisitorius.skillslink.domain.usuario;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Rol {
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER"),
    MENTOR("ROLE_MENTOR");

    private final String authority;

    Rol(String authority) {
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }

    @JsonCreator
    public static Rol fromString(String value) {
        return Rol.valueOf(value.toUpperCase());
    }
}
