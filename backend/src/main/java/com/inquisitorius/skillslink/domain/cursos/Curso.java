package com.inquisitorius.skillslink.domain.cursos;

import jakarta.persistence.*;

@Entity
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descripcion;
    private Integer duracionHoras; // En horas

    @Enumerated(EnumType.STRING)
    private NivelCurso nivel; // INICIAL, INTERMEDIO, AVANZADO

    //  Getters
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

    public NivelCurso getNivel() {
        return nivel;
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

    public void setNivel(NivelCurso nivel) {
        this.nivel = nivel;
    }

    public Curso(Long id, String titulo, String descripcion, Integer duracionHoras, NivelCurso nivel) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.duracionHoras = duracionHoras;
        this.nivel = nivel;
    }

    // Constructor sin argumentos (¡clave para Hibernate!)
    public Curso() {
    }

}


