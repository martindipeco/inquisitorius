package com.inquisitorius.skillslink.domain.certificacion;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data

public class Certificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String institucion;
    private LocalDate fechaEmision; // fecha_emision en la base de datos

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getInstitucion() {
        return institucion;
    }

    public void setInstitucion(String institucion) {
        this.institucion = institucion;
    }

    public LocalDate getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDate fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public Certificacion(Long id, String nombre, String institucion, LocalDate fechaEmision) {
        this.id = id;
        this.nombre = nombre;
        this.institucion = institucion;
        this.fechaEmision = fechaEmision;
    }

    // Constructor sin argumentos (¡clave para Hibernate!)
    public Certificacion() {
    }
}

