package com.example.demo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Character;

//non abbiamo bisogno dell'annotation @Repository perchè la considera automaticamente come un bean repository
public interface CharacterRepository extends JpaRepository<Character, Integer> {
    // interfaccia per l'accesso ai dati dei personaggi
    // estende JpaRepository per le operazioni CRUD sui personaggi
    // non è necessario implementare metodi specifici, JpaRepository fornisce già le
    // implementazioni

    public Optional<Character> findCharacterById(Integer id);

}
