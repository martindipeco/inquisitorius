package com.inquisitorius.skillslink.domain.mentoria;

import java.time.LocalDate;

public class RequestMentoriaDto {

    private LocalDate fechaInicio;
    private String estado;
    private Long mentorId;
    private Long aprendizId;
    private EstadoMentoria nivel;

    public RequestMentoriaDto() {
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

    public Long getAprendizId() {
        return aprendizId;
    }

    public void setAprendizId(Long aprendizId) {
        this.aprendizId = aprendizId;
    }

    public EstadoMentoria getNivel() {
        return nivel;
    }

    public void setNivel(EstadoMentoria nivel) {
        this.nivel = nivel;
    }
}