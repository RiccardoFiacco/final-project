package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Manga;

public interface MangaRepository extends JpaRepository<Manga, Integer> {
    // Interfaccia per l'accesso ai dati dei manga
    // Estende JpaRepository per fornire metodi CRUD predefiniti
    // Puoi aggiungere metodi personalizzati qui se necessario

}
