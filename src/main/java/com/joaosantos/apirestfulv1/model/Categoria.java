package com.joaosantos.apirestfulv1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;

    // Utilizado para não gerar um loop no JSON
    // Uma categoria tem produtos, o produto tem uma categoria, umas categgoria tem produtos ...
    @JsonIgnore
    // mappedBy -> informa que o método OneToMany é um espelhamento da relação ManyToOne
    // que existe em Produto no campo categoria. Assim, elimina a crição de uma tabela
    // intermediária. (Produto <-> ProdutoToCategoria <-> Categoria)
    @OneToMany(mappedBy = "categoria") // One Categoria to Many Produto
    private List<Produto> produtos;
    public Categoria(String nome){
        this.nome = nome;
    }
}
