package com.inquisitorius.skillslink.domain.mentoria;

import com.inquisitorius.skillslink.domain.cursos.Curso;
import com.inquisitorius.skillslink.domain.usuario.Usuario;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Mentoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaInicio;

    @Enumerated(EnumType.STRING)
    private EstadoMentoria estado;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Usuario mentor;

    @ManyToOne
    @JoinColumn(name = "aprendiz_id")
    private Usuario aprendiz;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;

    public Mentoria() {}

    public Mentoria(Long id, LocalDate fechaInicio, EstadoMentoria estado, Usuario mentor, Usuario aprendiz, Curso curso) {
        this.id = id;
        this.fechaInicio = fechaInicio;
        this.estado = estado;
        this.mentor = mentor;
        this.aprendiz = aprendiz;
        this.curso = curso;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public EstadoMentoria getEstado() {
        return estado;
    }

    public Usuario getMentor() {
        return mentor;
    }

    public Usuario getAprendiz() {
        return aprendiz;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public void setEstado(EstadoMentoria estado) {
        this.estado = estado;
    }

    public void setMentor(Usuario mentor) {
        this.mentor = mentor;
    }

    public void setAprendiz(Usuario aprendiz) {
        this.aprendiz = aprendiz;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }
}