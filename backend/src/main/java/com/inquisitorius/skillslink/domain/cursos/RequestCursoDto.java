package com.inquisitorius.skillslink.domain.cursos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestCursoDto {

    @NotBlank(message = "El título del curso no puede estar vacío")
    private String titulo;

    @NotBlank(message = "La descripción del curso no puede estar vacía")
    private String descripcion;

    @NotNull(message = "La duración debe ser especificada")
    private Integer duracionHoras;


    // Getters
    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Integer getDuracionHoras() {
        return duracionHoras;
    }

    // Setters
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setDuracionHoras(Integer duracionHoras) {
        this.duracionHoras = duracionHoras;
    }
}

