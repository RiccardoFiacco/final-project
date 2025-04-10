package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.MangaRepository;

@Service
public class MangaService {
    // classe di servizio per la gestione dei manga
    // contiene metodi per le operazioni CRUD sui manga
    // utilizza il repository MangaRepository per l'accesso ai dati
    
    @Autowired
    private MangaRepository mangaRepository;
    
    
}
