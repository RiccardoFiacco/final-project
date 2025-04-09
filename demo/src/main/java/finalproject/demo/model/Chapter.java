package finalproject.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "chapters")
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @NotBlank(message = "campo deve essere popolato")
    private String name;

    @Column(name = "description")
    @NotBlank(message = "campo deve essere popolato")
    private String description;

    @ManyToOne
    @JoinColumn(name = "manga_id", nullable = false)
    @JsonBackReference
    private Manga manga;

    public Chapter() {
    }

    public Chapter(Integer id, String name, String description, Manga manga) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.manga = manga;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Manga getManga() {
        return manga;
    }

    public void setManga(Manga manga) {
        this.manga = manga;
    }

    @Override
    public String toString() {
        return "Chapter [id=" + id + ", name=" + name + ", description=" + description + "]";
    }

}
