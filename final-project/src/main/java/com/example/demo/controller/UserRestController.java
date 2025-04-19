package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.UserDto;
import com.example.demo.model.UserRegistrationRequest;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserRestController {
    @Autowired
    private UserService userService;
    //rotta per registrare un nuovo utente e per ottenere le informazioni dell'utente corrente
    @PostMapping("/register") // metodo per registrare un nuovo utente
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest request) {
        System.out.println("Registrazione utente: " + request.getUsername()+ request.getPassword() + " con ruoli: " + request.getRoles());
        try {
            userService.registerNewUser(request.getUsername(), request.getPassword(), request.getRoles());
            return ResponseEntity.ok("Utente creato con successo");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Errore: " + e.getMessage());
        }
    }
    //rotta per ottenere le informazioni dell'utente corrente
    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserDto user = new UserDto(authentication.getName());
        return ResponseEntity.ok(user);
    }

}
