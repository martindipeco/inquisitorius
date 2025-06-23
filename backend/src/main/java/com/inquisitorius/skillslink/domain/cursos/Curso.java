package com.inquisitorius.skillslink.domain.cursos;

import jakarta.persistence.*;

@Entity
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descripcion;
    private Integer duracionHoras;

    @Enumerated(EnumType.STRING)
    private NivelCurso nivel;

    // Constructor vacío (requerido por JPA)
    public Curso() {}

    // Constructor completo (opcional)
    public Curso(Long id, String titulo, String descripcion, Integer duracionHoras, NivelCurso nivel) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.duracionHoras = duracionHoras;
        this.nivel = nivel;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getDuracionHoras() {
        return duracionHoras;
    }

    public void setDuracionHoras(Integer duracionHoras) {
        this.duracionHoras = duracionHoras;
    }

    public NivelCurso getNivel() {
        return nivel;
    }

    public void setNivel(NivelCurso nivel) {
        this.nivel = nivel;
    }
}


