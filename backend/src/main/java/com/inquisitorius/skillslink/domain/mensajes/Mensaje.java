package com.inquisitorius.skillslink.domain.mensajes;

import com.inquisitorius.skillslink.domain.usuario.Usuario;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "mensajes")
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "remitente_id", nullable = false)
    private Usuario remitente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receptor_id", nullable = false)
    private Usuario receptor;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String contenido;

    @Column(name = "fecha_envio", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaEnvio;

    // Constructores
    public Mensaje() {
        this.fechaEnvio = new Date();
    }

    public Mensaje(Usuario remitente, Usuario receptor, String contenido) {
        this.remitente = remitente;
        this.receptor = receptor;
        this.contenido = contenido;
        this.fechaEnvio = new Date();
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getRemitente() {
        return remitente;
    }

    public void setRemitente(Usuario remitente) {
        this.remitente = remitente;
    }

    public Usuario getReceptor() {
        return receptor;
    }

    public void setReceptor(Usuario receptor) {
        this.receptor = receptor;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Date getFechaEnvio() {
        return fechaEnvio;
    }

    public void setFechaEnvio(Date fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }
}
