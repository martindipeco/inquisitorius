package com.inquisitorius.skillslink.domain.certificacion;

import com.inquisitorius.skillslink.domain.usuario.Usuario;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Certificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String institucion;
    private LocalDate fechaEmision;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Certificacion() {}

    public Certificacion(Long id, String nombre, String institucion, LocalDate fechaEmision, Usuario usuario) {
        this.id = id;
        this.nombre = nombre;
        this.institucion = institucion;
        this.fechaEmision = fechaEmision;
        this.usuario = usuario;
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getInstitucion() {
        return institucion;
    }

    public LocalDate getFechaEmision() {
        return fechaEmision;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setInstitucion(String institucion) {
        this.institucion = institucion;
    }

    public void setFechaEmision(LocalDate fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}

