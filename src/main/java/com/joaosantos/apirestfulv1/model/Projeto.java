package com.joaosantos.apirestfulv1.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter // Lombok cria os métodos getter
@Setter // lombok cria os métodos setter
@NoArgsConstructor // Lombok cria um método construtor padrão
@ToString // Lombok cria o método ToString
@Entity
public class Projeto {
    @Id // indica correspondência a chave primária no BD
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Campo com auto incremento
    private Long id;
    private String imagem;
    private String nome;
    private String descricao;
    private boolean finalizado;
    private LocalDate dataCadastro;
    @ManyToOne // Many Projeto to One Autor
    private Autor autor;

    public Projeto(String imagem, String nome, String descricao,
                   boolean finalizado, LocalDate dataCadastro,
                   Autor autor) {
        this.imagem = imagem;
        this.nome = nome;
        this.descricao = descricao;
        this.finalizado = finalizado;
        this.dataCadastro = dataCadastro;
        this.autor = autor;
    }
}
