package com.inquisitorius.skillslink.domain.cursos;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum NivelCurso {
    INICIAL("Inicial"),
    INTERMEDIO("Intermedio"),
    AVANZADO("Avanzado");

    private final String etiqueta;

    NivelCurso(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    @JsonValue
    public String getEtiqueta() {
        return etiqueta;
    }

    @JsonCreator
    public static NivelCurso desdeValor(String valor) {
        for (NivelCurso nivel : NivelCurso.values()) {
            if (nivel.etiqueta.equalsIgnoreCase(valor)) {
                return nivel;
            }
        }
        throw new IllegalArgumentException("Nivel no reconocido: " + valor);
    }
}