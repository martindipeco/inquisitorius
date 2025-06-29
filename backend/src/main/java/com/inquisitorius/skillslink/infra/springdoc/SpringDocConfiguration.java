package com.inquisitorius.skillslink.infra.springdoc;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components().addSecuritySchemes("bearer-key",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .info(new Info()
                        .title("API SkillsLink")
                        .description("API Rest de la aplicación SkillsLink del grupo Inquisitorius")
                        .contact(new Contact()
                                .name("Equipo Inquisitorius")
                                .email("inquisitorius@skills.link"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://skills.link/api/licencia")));
    }

    @Bean
    public String message()
    {
        System.out.println("Bearer activo");
        return "Bearer activo";
    }
}

