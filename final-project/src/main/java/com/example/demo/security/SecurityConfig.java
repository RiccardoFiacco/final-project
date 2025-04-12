package com.example.demo.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    @SuppressWarnings("removal")
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests()
                // Tutte le richieste HTTP (GET, POST, ecc.) su /manga/create e /manga/update/**
                // solo a chi ha il ruolo ADMIN
                .requestMatchers("/manga/create", "/manga/update/**").hasAuthority("ADMIN")

                // Tutte le POST su /manga/** (quindi anche su /manga/create, /manga/update/3
                // ecc.)solo a chi ha il ruolo ADMIN
                .requestMatchers(HttpMethod.POST, "/pizzas/**").hasAuthority("ADMIN")

                // Qualsiasi richiesta (GET, POST, PUT, DELETE ecc.) su /manga e su tutto ciò
                // che inizia per /manga/
                // (es: /manga/5, /manga/list) solo a chi ha il ruolo ADMIN o USER
                .requestMatchers("/manga", "/manga/**").hasAnyAuthority("ADMIN", "USER")
                // Qualsiasi altra richiesta su tutti gli altri endpoint (es: /home, /login,
                // /about, /api/qualcosa)
                // permesso a chiunque, anche non autenticato
                .requestMatchers("/**").permitAll()

                .and().formLogin()// Abilita il login con form HTML standard di Spring Security (accessibile su
                                  // /login di default).
                .and().logout()// Abilita il logout automatico gestito da Spring Security (di default su
                               // /logout).
                .and().exceptionHandling();// Abilita la gestione automatica delle eccezioni di sicurezza
        // (tipo accesso negato o utente non autenticato) con il comportamento di
        // default (redirect o pagina di errore).

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
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
        // Utilizza un pswencoder delegato al PasswordEncoder di default di Spring
        // Security
    }
}
