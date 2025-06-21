package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.usuario.DatosPedidoUsuario;
import com.inquisitorius.skillslink.domain.usuario.DatosRespuestaUsuario;
import com.inquisitorius.skillslink.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<List<DatosRespuestaUsuario>> listarUsuarios() {
        List<DatosRespuestaUsuario> usuarios = usuarioRepository.findAll().stream()
                .map(usuario -> new DatosRespuestaUsuario(usuario.getId(), usuario.getLogin()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatosRespuestaUsuario> obtenerUsuario(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(usuario -> ResponseEntity.ok(new DatosRespuestaUsuario(usuario.getId(), usuario.getLogin())))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DatosRespuestaUsuario> actualizarUsuario(@PathVariable Long id, @RequestBody @Valid DatosPedidoUsuario datosActualizados) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setLogin(datosActualizados.getLogin());
                    usuario.setClave(passwordEncoder.encode(datosActualizados.getClave()));
                    usuarioRepository.save(usuario);
                    return ResponseEntity.ok(new DatosRespuestaUsuario(usuario.getId(), usuario.getLogin()));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
