package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Character;
import com.example.demo.model.Manga;
import com.example.demo.repository.MangaRepository;

@Service
public class MangaService {
    // classe di servizio per la gestione dei manga
    // contiene metodi per le operazioni CRUD sui manga
    // utilizza il repository MangaRepository per l'accesso ai dati

    @Autowired
    private MangaRepository mangaRepository;

    public List<Manga> getAllMangas() {
        // restituisce la lista di tutti i manga
        return mangaRepository.findAll();
    }

    public Manga getMangaById(Integer id) throws Exception {
        // restituisce un manga in base all'ID
        Optional<Manga> manga = mangaRepository.findById(id);
        if (manga.isEmpty()) {
            throw new Exception(); // restituisce il manga se esiste
        }
        return manga.get();
    }

    public Optional<Manga> findMangaById(Integer id) {
        // restituisce un manga in base all'ID
        return mangaRepository.findById(id); // restituisce il manga se esiste
    }

    public Manga createManga(Manga manga) {
        // crea un nuovo manga e lo restituisce
        for (Character p : manga.getCharacters()) {
            p.setManga(manga);
        }
        return mangaRepository.save(manga);
    }

    public Manga updateManga(Integer id, Manga manga) throws Exception {
        // aggiorna un manga esistente e lo restituisce
        Optional<Manga> existingManga = mangaRepository.findById(id);
        if (existingManga.isEmpty()) {
            throw new Exception();
        }
        manga.setId(id);
        for (Character p : manga.getCharacters()) {
            p.setManga(manga);
        }
        return mangaRepository.save(manga);// restituisce il manga aggiornato se esiste
    }

    public void deleteManga(Integer id) throws Exception {
        // elimina un manga in base all'ID
        Optional<Manga> existingManga = mangaRepository.findById(id);
        if (existingManga.isEmpty()) {
            throw new Exception();
        }
        mangaRepository.deleteById(id); // elimina il manga se esiste
    }

    public List<Manga> searchMangaByTitle(String title) {
        // restituisce una lista di manga in base al titolo
        return mangaRepository.findByTitleContainingIgnoreCase(title);
    }
}
