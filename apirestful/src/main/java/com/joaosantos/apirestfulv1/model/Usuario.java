package com.joaosantos.apirestfulv1.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Entidade que representa um usuário no sistema, mapeada para a tabela "usuarios".
 * Utiliza o Project Lombok para gerar automaticamente os métodos getters, setters e construtores.
 */
@Entity
@Table(name = "usuarios")
@Getter                 // Gera todos os métodos getters (getUsername(), getSenha(), etc.)
@Setter                 // Gera todos os métodos setters (setUsername(), setSenha(), etc.)
@NoArgsConstructor      // Gera o construtor padrão sem argumentos, exigido pelo JPA
@ToString(exclude = "senha") // Gera o método toString(), omitindo o campo 'senha' por segurança
public class Usuario {

    /**
     * Identificador único do usuário, gerado automaticamente pelo banco de dados.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nome de usuário único para login. Não pode ser nulo.
     */
    @Column(unique = true, nullable = false)
    private String username;

    /**
     * Senha do usuário, armazenada de forma criptografada (hash). Não pode ser nula.
     */
    @Column(nullable = false)
    private String senha;

}