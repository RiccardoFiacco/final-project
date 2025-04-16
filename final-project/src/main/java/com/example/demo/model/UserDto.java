package com.example.demo.model;
//semplice classe per recuperare il nome dell'utente autenticato
public class UserDto {
    private String username;

    public UserDto(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
