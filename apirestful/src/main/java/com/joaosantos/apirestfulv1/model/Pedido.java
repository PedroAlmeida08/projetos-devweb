package com.joaosantos.apirestfulv1.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidade que representa um pedido realizado por um usuário.
 */
@Entity
@Table(name = "pedidos")
@Getter
@Setter
@NoArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Relacionamento Muitos-para-Um com Usuario.
     * Muitos pedidos podem pertencer a um único usuário.
     * FetchType.LAZY é uma otimização para carregar o usuário apenas quando necessário.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    /**
     * Relacionamento Um-para-Muitos com ItemPedido.
     * Um pedido pode conter muitos itens.
     * CascadeType.ALL: Operações (salvar, deletar) no Pedido serão propagadas para os Itens.
     * orphanRemoval = true: Se um ItemPedido for removido desta lista, ele será deletado do banco.
     */
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "pedido_id") // Cria a chave estrangeira na tabela 'itens_pedido'
    private List<ItemPedido> itens = new ArrayList<>();

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valorTotal;

    @Column(nullable = false)
    private LocalDate dataCriacao;

    // Campo útil para gerenciar o estado do pedido (ex: PENDENTE, PAGO, ENVIADO)
    @Column(nullable = false)
    private String status;

    // --- Métodos de Conveniência (opcional) ---

    public void adicionarItem(ItemPedido item) {
        this.itens.add(item);
    }
}