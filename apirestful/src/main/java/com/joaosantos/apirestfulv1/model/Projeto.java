package com.joaosantos.apirestfulv1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor; // 1. Importe a nova anotação
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "projetos")
@Getter
@Setter
@NoArgsConstructor          // Cria o construtor vazio: public Projeto() {}
@AllArgsConstructor     // 2. Adicione esta anotação para criar o construtor com todos os campos
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imagem;
    private String nome;
    private String descricao;
    private String url;
    private boolean destaque;
    private LocalDate dataCadastro;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Autor autor;

    @ManyToMany(mappedBy = "projetosFavoritos")
    @JsonIgnore
    private Set<Usuario> favoritadosPor = new HashSet<>();

    /**
     * Construtor customizado para facilitar a criação de novos projetos sem precisar passar todos os campos.
     * Útil para o seu arquivo de seeding (ApirestfulApplication.java).
     * O Lombok @AllArgsConstructor cria um construtor com TODOS os campos, incluindo id, favoritadosPor, etc.
     * Às vezes, um construtor manual como este pode ser mais prático.
     */
    public Projeto(String imagem, String nome, String descricao, String url, boolean destaque, LocalDate dataCadastro, Autor autor) {
        this.imagem = imagem;
        this.nome = nome;
        this.descricao = descricao;
        this.url = url;
        this.destaque = destaque;
        this.dataCadastro = dataCadastro;
        this.autor = autor;
    }
}