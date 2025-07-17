package com.joaosantos.apirestfulv1.repository;

import com.joaosantos.apirestfulv1.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositório para a entidade Pedido.
 * Estende JpaRepository para obter métodos CRUD (Create, Read, Update, Delete)
 * e de paginação padrão, sem a necessidade de escrever implementações.
 */
@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    /**
     * Busca todos os pedidos associados a um ID de usuário específico.
     * O Spring Data JPA cria a implementação deste método automaticamente
     * com base no nome do método.
     *
     * @param usuarioId O ID do usuário cujos pedidos serão buscados.
     * @return uma lista de Pedidos pertencentes ao usuário.
     */
    List<Pedido> findByUsuarioId(Long usuarioId);
}