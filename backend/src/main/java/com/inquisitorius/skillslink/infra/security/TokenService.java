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
            return JWT.create().withIssuer("SkillsLink")
                    .withSubject(usuario.getLogin())
                    .withClaim("id", usuario.getId())
                    .withClaim("role", usuario.getRol().name()) // Single role
                    .withExpiresAt(generarFechaExpiracion())
                    .sign(algorithm); //creo un string
        }
        catch(JWTCreationException e)
        {
            System.out.println(e.getMessage());
            throw new RuntimeException();
        }
    }

    private Instant generarFechaExpiracion() {
        ZoneId zone = ZoneId.systemDefault();  // Obtener la zona horaria del sistema
        return LocalDateTime.now(zone).plusMinutes(120).toInstant(ZoneOffset.ofTotalSeconds(zone.getRules().getOffset(LocalDateTime.now()).getTotalSeconds()));
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

    // METHOD: Extract role from token
    public String getRoleFromToken(String token) {
        if(token == null) {
            throw new RuntimeException("Token is null");
        }

        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            DecodedJWT verifier = JWT.require(algorithm)
                    .withIssuer("SkillsLink")
                    .build()
                    .verify(token);

            return verifier.getClaim("role").asString();
        } catch (JWTVerificationException exception) {
            System.out.println(exception.getMessage());
            throw new RuntimeException("Invalid token", exception);
        }
    }

    // METHOD: Extract user ID from token (useful for authorization)
    public Long getUserIdFromToken(String token) {
        if(token == null) {
            throw new RuntimeException("Token is null");
        }

        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            DecodedJWT verifier = JWT.require(algorithm)
                    .withIssuer("SkillsLink")
                    .build()
                    .verify(token);

            return verifier.getClaim("id").asLong();
        } catch (JWTVerificationException exception) {
            System.out.println(exception.getMessage());
            throw new RuntimeException("Invalid token", exception);
        }
    }

    // Helper method to validate token and return all claims
    public DecodedJWT validateAndDecodeToken(String token) {
        if(token == null) {
            throw new RuntimeException("Token is null");
        }

        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            return JWT.require(algorithm)
                    .withIssuer("SkillsLink")
                    .build()
                    .verify(token);
        } catch (JWTVerificationException exception) {
            System.out.println(exception.getMessage());
            throw new RuntimeException("Invalid token", exception);
        }
    }
}
