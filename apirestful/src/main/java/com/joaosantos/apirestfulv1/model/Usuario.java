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
@NoArgsConstructor
// Excluímos ambos os relacionamentos do toString para evitar loops infinitos
@ToString(exclude = {"senha", "projetosFavoritos"})
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String senha;

    /**
     * Relacionamento Muitos-para-Muitos com Projetos.
     * FetchType.LAZY: Carrega os favoritos apenas quando explicitamente solicitado. Melhora a performance.
     * JoinTable: Configura a tabela intermediária que ligará usuários e projetos.
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "usuario_projetos_favoritos",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "projeto_id")
    )
    private Set<Projeto> projetosFavoritos = new HashSet<>();
}