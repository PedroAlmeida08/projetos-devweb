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
public class Produto {
    @Id // indica correspondência a chave primária no BD
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Campo com auto incremento
    private Long id;
    private String imagem;
    private String nome;
    private String descricao;
    private boolean disponivel;
    private int qtdEstoque;
    private BigDecimal preco;
    private LocalDate dataCadastro;
    @ManyToOne // Many Produto to One Categoria
    private Categoria categoria;

    public Produto(String imagem, String nome, String descricao,
                   boolean disponivel, int qtdEstoque, BigDecimal preco,
                   LocalDate dataCadastro, Categoria categoria) {
        this.imagem = imagem;
        this.nome = nome;
        this.descricao = descricao;
        this.disponivel = disponivel;
        this.qtdEstoque = qtdEstoque;
        this.preco = preco;
        this.dataCadastro = dataCadastro;
        this.categoria = categoria;
    }
}
