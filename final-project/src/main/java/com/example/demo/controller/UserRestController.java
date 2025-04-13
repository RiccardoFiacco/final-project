package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.UserRegistrationRequest;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserRestController {
    @Autowired
    private UserService userService;

    @PostMapping("/register") // metodo per registrare un nuovo utente
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest request) {
        try {
            userService.registerNewUser(request.getUsername(), request.getPassword(), request.getRoles());
            return ResponseEntity.ok("Utente creato con successo");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Errore: " + e.getMessage());
        }
    }
}
