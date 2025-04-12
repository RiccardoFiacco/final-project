package com.example.demo.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class DataBaseUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository; // Repository per accedere ai dati degli utenti

    @Override
    public DataBaseUserDetails loadUserByUsername(String username)throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            // Se l'utente non viene trovato, lancia un'eccezione
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new DataBaseUserDetails(user.get());// Restituisce un oggetto UserDetails che rappresenta l'utente
                                                   // trovato
    }
    
}
