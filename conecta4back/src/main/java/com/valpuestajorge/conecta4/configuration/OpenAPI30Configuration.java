package com.valpuestajorge.conecta4.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPI30Configuration {

    public OpenAPI openApi() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("Conecta4 API")
                                .description("Conecta4 API")
                                .version("v1.0")
                                .contact(null)
                                .termsOfService("TOC")
                                .license(new License().name("License").url("#")));
    }

    @Bean
    public GroupedOpenApi tablero() {
        return GroupedOpenApi.builder()
                .group("Tablero")
                .packagesToScan("com.valpuestajorge.conecta4.tablero")
                .build();
    }

    @Bean
    public GroupedOpenApi movimiento() {
        return GroupedOpenApi.builder()
                .group("Movimiento")
                .packagesToScan("com.valpuestajorge.conecta4.movimiento")
                .build();
    }

    @Bean
    public GroupedOpenApi user() {
        return GroupedOpenApi.builder()
                .group("User")
                .packagesToScan("com.valpuestajorge.conecta4.app_user")
                .build();
    }
}