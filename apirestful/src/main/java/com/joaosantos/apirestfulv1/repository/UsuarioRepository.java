package com.joaosantos.apirestfulv1.repository;

import com.joaosantos.apirestfulv1.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositório para a entidade Usuario.
 * Estende JpaRepository para obter métodos CRUD (Create, Read, Update, Delete) padrão.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Busca um usuário pelo seu nome de usuário (username).
     * O Spring Data JPA cria a implementação deste método automaticamente.
     * Retorna um Optional para tratar de forma segura o caso em que o usuário não é encontrado.
     *
     * @param username O nome de usuário a ser buscado.
     * @return um Optional contendo o usuário, se encontrado.
     */
    Optional<Usuario> findByUsername(String username);
}