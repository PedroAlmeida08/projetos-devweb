package com.joaosantos.apirestfulv1.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor // <- Gera o construtor vazio para o JPA: public Usuario() {}
@ToString(exclude = {"senha", "projetosFavoritos"})
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private String role;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "usuario_projetos_favoritos",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "projeto_id")
    )
    private Set<Projeto> projetosFavoritos = new HashSet<>();

    /**
     * ✅ CONSTRUTOR ADICIONADO ✅
     * Construtor de conveniência para facilitar a criação de novos usuários no código.
     * @param username O nome de usuário para o novo usuário.
     * @param senha A senha (ainda em texto puro) para o novo usuário.
     * @param role O papel (role) do novo usuário, ex: "USER" ou "ADMIN".
     */
    public Usuario(String username, String senha, String role) {
        this.username = username;
        this.senha = senha;
        this.role = role;
    }
}