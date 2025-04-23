package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

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
import com.example.demo.model.Character;
import com.example.demo.model.Manga;
import com.example.demo.service.CharacterService;
import com.example.demo.service.MangaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/manga")
public class MangaRestController {
    // classe controller per la gestione delle richieste REST relative ai manga
    // utilizza il servizio MangaService per le operazioni CRUD sui manga
    @Autowired
    private MangaService mangaService;

    @Autowired
    private CharacterService characterService;

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

    @PreAuthorize("hasAuthority('admin', 'user')")
    @PostMapping("/{id}/characters")
    public ResponseEntity<Character> addMangaCharacters(@PathVariable Integer id,
            @Valid @RequestBody Character character) throws Exception {
        // aggiunge un personaggio a un manga esistente
        try {
            Optional<Manga> optionalManga = mangaService.findMangaById(id);
            if (optionalManga.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Manga manga = optionalManga.get();
            character.setManga(manga); // associa il personaggio al manga
            manga.getCharacters().add(character); // aggiunge il personaggio alla lista del manga
            mangaService.updateManga(id, manga); // aggiorna il manga con il nuovo personaggio
            return new ResponseEntity<Character>(character, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("Manga not found with id: " + id, e);
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/{id}/characters/{id}/delete")
    public ResponseEntity<Character> addMangaCharacters(@PathVariable Integer id) {
        // elimina un personaggio da un manga esistente
        try {
            Optional<Character> optionalCharacter = characterService.getCharacterById(id);
            if (optionalCharacter.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            characterService.deleteCharacter(id); // elimina il personaggio
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            throw new RuntimeException("Manga not found with id: " + id, e);
        }
    }

}
