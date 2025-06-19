package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.usuario.Usuario;
import com.inquisitorius.skillslink.dto.usuario.UsuarioRequestDto;
import com.inquisitorius.skillslink.dto.usuario.UsuarioResponseDto;
import com.inquisitorius.skillslink.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<UsuarioResponseDto>> listarUsuarios() {
        List<UsuarioResponseDto> usuarios = usuarioRepository.findAll().stream()
                .map(usuario -> new UsuarioResponseDto(usuario.getId(), usuario.getLogin()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDto> obtenerUsuario(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(usuario -> ResponseEntity.ok(new UsuarioResponseDto(usuario.getId(), usuario.getLogin())))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDto> actualizarUsuario(@PathVariable Long id, @RequestBody @Valid UsuarioRequestDto datosActualizados) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setLogin(datosActualizados.getLogin());
                    usuario.setClave(passwordEncoder.encode(datosActualizados.getClave()));
                    usuarioRepository.save(usuario);
                    return ResponseEntity.ok(new UsuarioResponseDto(usuario.getId(), usuario.getLogin()));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
