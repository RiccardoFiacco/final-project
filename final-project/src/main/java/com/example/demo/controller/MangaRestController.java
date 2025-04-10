package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/manga")
public class MangaRestController {
    // classe controller per la gestione delle richieste REST relative ai manga
    // utilizza il servizio MangaService per le operazioni CRUD sui manga
    @Autowired
    private MangaService mangaService;

    
}
