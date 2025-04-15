package com.example.demo;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Consenti tutte le origini
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Permetti solo richieste da React (localhost:5173)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Metodi consentiti
                .allowedHeaders("*") // Permetti tutte le intestazioni
                .allowCredentials(true); // Se hai bisogno di inviare credenziali come i cookie
    }
}
