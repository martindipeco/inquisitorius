package com.inquisitorius.skillslink.domain.cursos;

import lombok.Data;

@Data
public class ResponseCursoDto {
    private Long id; // Este DTO incluye el id del curso para identificarlo cuando
    // se recupera información desde el backend.

    private String titulo;
    private String descripcion;
    private Integer duracionHoras;

    // Getters
    public Long getId() {
        return id;
    }

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
    public void setId(Long id) {
        this.id = id;
    }

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

