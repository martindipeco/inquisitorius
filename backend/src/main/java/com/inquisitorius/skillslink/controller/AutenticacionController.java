package com.inquisitorius.skillslink.controller;

import com.inquisitorius.skillslink.domain.usuario.DatosAutenticacionUsuario;
import com.inquisitorius.skillslink.domain.usuario.Usuario;
import com.inquisitorius.skillslink.infra.security.DatosJwToken;
import com.inquisitorius.skillslink.infra.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class AutenticacionController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity autenticarUsuario(@RequestBody @Valid DatosAutenticacionUsuario datosAutenticacionUsuario)
    {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                datosAutenticacionUsuario.login(), datosAutenticacionUsuario.clave()
        );
        var usuarioAutenticado = authenticationManager.authenticate(authToken);
        var jwToken = tokenService.generarToken((Usuario) usuarioAutenticado.getPrincipal());
        return ResponseEntity.ok(new DatosJwToken(jwToken));
    }
}
