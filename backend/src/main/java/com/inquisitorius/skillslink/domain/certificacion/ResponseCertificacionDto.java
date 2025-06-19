package com.inquisitorius.skillslink.domain.certificacion;

import java.time.LocalDate;

public class ResponseCertificacionDto {

    private Long id;
    private String nombre;
    private String institucion;
    private LocalDate fechaEmision;

    // Getters
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

    // Setters
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
}