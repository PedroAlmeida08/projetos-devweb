package com.joaosantos.apirestfulv1.repository;

import com.joaosantos.apirestfulv1.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método para verificar se uma conta já existe
    Optional<Usuario> findByConta(String conta);
}