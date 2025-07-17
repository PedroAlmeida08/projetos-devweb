// src/main/java/com/example/apirestful/service/PedidoService.java
package com.joaosantos.apirestfulv1.service;

import com.joaosantos.apirestfulv1.dto.CheckoutDTO;
import com.joaosantos.apirestfulv1.model.*;
import com.joaosantos.apirestfulv1.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoService {

    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private ProjetoRepository projetoRepository;
    @Autowired private PedidoRepository pedidoRepository;

    @Transactional
    public Pedido criarPedido(CheckoutDTO checkoutDTO) {
        Usuario usuario = usuarioRepository.findById(checkoutDTO.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Pedido novoPedido = new Pedido();
        novoPedido.setUsuario(usuario);
        novoPedido.setDataCriacao(LocalDate.now());

        List<ItemPedido> itensPedido = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (var itemDTO : checkoutDTO.itens()) {
            Projeto projeto = projetoRepository.findById(itemDTO.projetoId())
                    .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));

            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setProjeto(projeto);
            itemPedido.setQuantidade(itemDTO.quantidade());
            itemPedido.setPrecoUnitario(projeto.getPreco());
            itensPedido.add(itemPedido);

            total = total.add(projeto.getPreco().multiply(new BigDecimal(itemDTO.quantidade())));
        }

        novoPedido.setItens(itensPedido);
        novoPedido.setValorTotal(total);

        return pedidoRepository.save(novoPedido);
    }
}