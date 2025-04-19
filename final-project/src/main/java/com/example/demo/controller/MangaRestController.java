package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Manga;
import com.example.demo.service.MangaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/manga")
public class MangaRestController {
    // classe controller per la gestione delle richieste REST relative ai manga
    // utilizza il servizio MangaService per le operazioni CRUD sui manga
    @Autowired
    private MangaService mangaService;

    @GetMapping
    public List<Manga> getAllMangas() {
        // restituisce la lista di tutti i manga
        return mangaService.getAllMangas();
    }

    @GetMapping("/search")
    public List<Manga> searchMangaByTitle(String title) {
        // restituisce una lista di manga in base al titolo
        return mangaService.searchMangaByTitle(title);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manga> getMangaById(@PathVariable Integer id) throws Exception {
        // restituisce un manga in base all'ID
        try {
            if (mangaService.findMangaById(id).isEmpty()) {
                return new ResponseEntity<Manga>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<Manga>(mangaService.getMangaById(id), HttpStatus.OK);
        } catch (Exception e) {
            throw new Exception("Manga not found with id: " + id, e);
        }
    }

    @PreAuthorize("hasAuthority('admin', 'user')")
    @PostMapping
    public ResponseEntity<Manga> createManga(@Valid @RequestBody Manga manga) {
        // crea un nuovo manga e lo restituisce
        return new ResponseEntity<Manga>(mangaService.createManga(manga), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/{id}")
    public ResponseEntity<Manga> update(@Valid @RequestBody Manga manga, @PathVariable Integer id) {
        // aggiorna un manga esistente e lo restituisce
        try {
            if (mangaService.findMangaById(id).isEmpty()) {
                return new ResponseEntity<Manga>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<Manga>(mangaService.updateManga(id, manga), HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("Manga not found with id: " + id, e);
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManga(@PathVariable Integer id) throws Exception {
        // elimina un manga in base all'ID
        try {
            if (mangaService.findMangaById(id).isEmpty()) {
                return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
            }
            mangaService.deleteManga(id);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            throw new RuntimeException("Manga not found with id: " + id, e);
        }
    }

    @GetMapping("/whoami")
    public String whoAmI() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    return "Utente autenticato: " + auth.getName() + " - Ruoli: " + auth.getAuthorities();
}
}
