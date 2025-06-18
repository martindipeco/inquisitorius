package com.inquisitorius.skillslink.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import com.inquisitorius.skillslink.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.infra.security.secret}")
    private String apiSecret;

    public String generarToken(Usuario usuario)
    {
        try
        {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret); //secreto para validar firma
            return JWT.create().withIssuer("voll med")
                    .withSubject(usuario.getLogin())
                    .withClaim("id", usuario.getId())
                    .withExpiresAt(generarFechaExpiracion())
                    .sign(algorithm); //creo un string
        }
        catch(JWTCreationException e)
        {
            System.out.println(e.getMessage());
            throw new RuntimeException();
        }
    }

    private Instant generarFechaExpiracion()//hardcodeado a 2 horas
    {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-05:00"));//averiguar offset especifico por país
    }

    public String getSubject(String token)
    {
        if(token == null)
        {
            throw new RuntimeException();
        }
        DecodedJWT verifier = null;
        try
        {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            verifier = JWT.require(algorithm).withIssuer("voll med").build().verify(token);
            verifier.getSubject();
        }
        catch (JWTVerificationException exception)
        {
            System.out.println(exception.getMessage());
        }
        if (verifier.getSubject() == null)
        {
            throw new RuntimeException("subject nulo desde getSubject");
        }
        return verifier.getSubject();
    }

}
