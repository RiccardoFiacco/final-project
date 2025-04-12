package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "mangas")
public class Manga {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title")
    @NotBlank(message = "campo deve essere popolato")
    private String title;

    @Column(name = "author")
    @NotBlank(message = "campo deve essere popolato")
    private String author;

    @Column(name = "description")
    @NotBlank(message = "campo deve essere popolato")
    private String description;

    @OneToMany(mappedBy = "manga", cascade = CascadeType.ALL) //cascade type all permette di inserire i personaggi in automatico
    private List<Character> characters;

    public Manga() {
        // Costruttore vuoto per JPA
    }

    public Manga(Integer id, String title, String author, String description, List<Character> characters) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.characters = characters;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Character> getCharacters() {
        return characters;
    }

    public void setCharacters(List<Character> characters) {
        this.characters = characters;
    }

    @Override
    public String toString() {
        return "Manga [id=" + id + ", title=" + title + ", author=" + author + ", description=" + description + "]";
    }

}
