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
 * Entidade que representa um usuário no sistema.
 * Utiliza o Project Lombok para reduzir código boilerplate.
 */
@Entity
@Table(name = "usuarios")
@Getter                 // Gera todos os métodos getters (ex: getId(), getConta()) em tempo de compilação.
@Setter                 // Gera todos os métodos setters (ex: setId(), setConta()) em tempo de compilação.
@NoArgsConstructor      // Gera o construtor público sem argumentos, que é obrigatório para o JPA.
@ToString(exclude = "senha") // Gera um método toString() útil para debugging, excluindo o campo 'senha' por segurança.
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String conta;

    @Column(nullable = false)
    private String senha;

}