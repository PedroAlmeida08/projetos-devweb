package com.joaosantos.apirestfulv1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal; // Importa o tipo ideal para valores monetários
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "projetos")
@Getter
@Setter
@NoArgsConstructor
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imagem;
    private String nome;
    private String descricao;
    private String url;
    private LocalDate dataCadastro;

    @Column(nullable = false, precision = 10, scale = 2) // Define precisão para valores monetários
    private BigDecimal preco; // ✅ NOVO CAMPO ADICIONADO

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Autor autor;

    @ManyToMany(mappedBy = "projetosFavoritos")
    @JsonIgnore
    private Set<Usuario> favoritadosPor = new HashSet<>();

    /**
     * Construtor customizado e ATUALIZADO para facilitar a criação de novos projetos.
     */
    public Projeto(String imagem, String nome, String descricao, String url, LocalDate dataCadastro, Autor autor, BigDecimal preco) {
        this.imagem = imagem;
        this.nome = nome;
        this.descricao = descricao;
        this.url = url;
        this.dataCadastro = dataCadastro;
        this.autor = autor;
        this.preco = preco; // ✅
    }
}