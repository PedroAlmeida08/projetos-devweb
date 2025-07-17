package com.joaosantos.apirestfulv1.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Entidade que representa um item específico dentro de um Pedido.
 * Cada item está associado a um Projeto e armazena a quantidade
 * e o preço unitário no momento da compra.
 */
@Entity
@Table(name = "itens_pedido")
@Getter
@Setter
@NoArgsConstructor      // Gera o construtor vazio obrigatório para o JPA.
@AllArgsConstructor     // Gera um construtor com todos os campos como argumento.
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Relacionamento Muitos-para-Um com Projeto.
     * Muitos itens de pedido (em pedidos diferentes) podem se referir ao mesmo projeto.
     * FetchType.LAZY é uma otimização para carregar o projeto apenas quando necessário.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "projeto_id", nullable = false)
    private Projeto projeto;

    /**
     * A quantidade deste item no pedido.
     */
    @Column(nullable = false)
    private Integer quantidade;

    /**
     * O preço unitário do projeto no momento em que a compra foi realizada.
     * Armazenar isso aqui é crucial para garantir a integridade histórica dos pedidos,
     * caso o preço do projeto mude no futuro.
     */
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precoUnitario;
}