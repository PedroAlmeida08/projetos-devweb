package com.joaosantos.apirestfulv1.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "autores")
@Getter
@Setter
@NoArgsConstructor
public class Autor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * ✅ ADICIONE ESTA ANOTAÇÃO ✅
     * unique = true: Cria uma restrição no banco que impede a inserção de nomes duplicados.
     * nullable = false: Garante que o nome não pode ser nulo.
     */
    @Column(unique = true, nullable = false)
    private String nome;

    // Construtor para facilitar a criação
    public Autor(String nome) {
        this.nome = nome;
    }
}