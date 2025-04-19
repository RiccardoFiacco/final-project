package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Abilita la sicurezza a livello di metodo (annotazioni come @PreAuthorize)
public class SecurityConfig {
    @Bean
    @SuppressWarnings("removal")
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .cors().and()
            .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                .requestMatchers(HttpMethod.POST, "/api/users/register").permitAll()
                .requestMatchers("/manga/create", "/manga/update/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.POST, "/manga/**").hasAuthority("ADMIN")
                .requestMatchers("/manga", "/manga/**").hasAnyAuthority("ADMIN", "USER")
                .requestMatchers("/**").permitAll()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            .formLogin().disable()
            .httpBasic().disable()
            .logout().disable();

        return http.build();
    }

    @Bean
    @SuppressWarnings("deprecation")
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        // questo provider usera x come servizio per recuperare gli utenti via username
        authProvider.setUserDetailsService(userDetailsService());
        // e passwordEncoder per codificare le password
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean // Crea e registra un bean di tipo DatabaseUserDetailService nel contesto Spring
    DataBaseUserDetailService userDetailsService() { // bean usato da Spring Security come UserDetailsService
        // per recuperare le informazioni dell’utente dal database, quando qualcuno
        // effettua il login.
        return new DataBaseUserDetailService();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
        // Utilizza un pswencoder delegato al PasswordEncoder di default di Spring
        // Security
    }

    @Bean // per la configurazione cors
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // il tuo frontend
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true); // necessario per sessioni

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
