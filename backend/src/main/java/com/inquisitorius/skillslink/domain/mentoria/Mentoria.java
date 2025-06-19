package com.inquisitorius.skillslink.domain.mentoria;

import com.inquisitorius.skillslink.domain.cursos.NivelCurso;
import com.inquisitorius.skillslink.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
public class Mentoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaInicio;

    private String estado;// estado general como texto libre



    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Usuario mentor;

    @ManyToOne
    @JoinColumn(name = "aprendiz_id")
    private Usuario aprendiz;

    @Enumerated(EnumType.STRING)
    private EstadoMentoria nivel; // enum para el avance de la mentoría

    public Mentoria() {
    }

    public Mentoria(Long id, LocalDate fechaInicio, String estado, Usuario mentor, Usuario aprendiz, EstadoMentoria nivel) {
        this.id = id;
        this.fechaInicio = fechaInicio;
        this.estado = estado;
        this.mentor = mentor;
        this.aprendiz = aprendiz;
        this.nivel = nivel;
    }

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

    public Usuario getMentor() {
        return mentor;
    }

    public void setMentor(Usuario mentor) {
        this.mentor = mentor;
    }

    public Usuario getAprendiz() {
        return aprendiz;
    }

    public void setAprendiz(Usuario aprendiz) {
        this.aprendiz = aprendiz;
    }

    public EstadoMentoria getNivel() {
        return nivel;
    }

    public void setNivel(EstadoMentoria nivel) {
        this.nivel = nivel;
    }
}