package com.example.demo.repository;

import java.util.Optional;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username); // con optional poniamo caso che non lo trova
}
