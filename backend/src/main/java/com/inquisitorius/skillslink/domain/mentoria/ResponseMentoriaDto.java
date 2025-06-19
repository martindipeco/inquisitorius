package com.inquisitorius.skillslink.domain.mentoria;

import java.time.LocalDate;

public class ResponseMentoriaDto {
    private Long id;
    private LocalDate fechaInicio;
    private String estado;
    private Long mentorId;
    private String mentorNombre;
    private Long aprendizId;
    private String aprendizNombre;

    // Constructor
    public ResponseMentoriaDto(Long id, LocalDate fechaInicio, String estado, Long mentorId, String mentorNombre, Long aprendizId, String aprendizNombre) {
        this.id = id;
        this.fechaInicio = fechaInicio;
        this.estado = estado;
        this.mentorId = mentorId;
        this.mentorNombre = mentorNombre;
        this.aprendizId = aprendizId;
        this.aprendizNombre = aprendizNombre;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

    public String getMentorNombre() {
        return mentorNombre;
    }

    public void setMentorNombre(String mentorNombre) {
        this.mentorNombre = mentorNombre;
    }

    public Long getAprendizId() {
        return aprendizId;
    }

    public void setAprendizId(Long aprendizId) {
        this.aprendizId = aprendizId;
    }

    public String getAprendizNombre() {
        return aprendizNombre;
    }

    public void setAprendizNombre(String aprendizNombre) {
        this.aprendizNombre = aprendizNombre;
    }
}