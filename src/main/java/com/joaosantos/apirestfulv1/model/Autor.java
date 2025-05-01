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
public class Autor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;

    // Utilizado para não gerar um loop no JSON
    // Um autor tem projetos, o projeto tem um autor, uns autores tem projetos ...
    @JsonIgnore
    // mappedBy -> informa que o método OneToMany é um espelhamento da relação ManyToOne
    // que existe em Projeto no campo autor. Assim, elimina a criação de uma tabela
    // intermediária. (Projeto <-> ProjetoToAutor <-> Autor)
    @OneToMany(mappedBy = "autor") // One Autor to Many Projeto
    private List<Projeto> projetos;
    public Autor(String nome){
        this.nome = nome;
    }
}
