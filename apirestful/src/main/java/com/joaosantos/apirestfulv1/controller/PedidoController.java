package com.joaosantos.apirestfulv1.controller;

import com.joaosantos.apirestfulv1.dto.CheckoutDTO;
import com.joaosantos.apirestfulv1.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller que expõe os endpoints para gerenciamento de Pedidos.
 * Atua como a camada de entrada para as requisições HTTP e delega
 * a lógica de negócio para a camada de Serviço (PedidoService).
 */
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService; // Injeta o serviço que contém a lógica de negócio

    /**
     * Endpoint para finalizar uma compra (checkout).
     * Recebe os dados do carrinho do frontend e delega a criação do pedido
     * para o PedidoService.
     *
     * @param checkoutDTO O objeto contendo o ID do usuário e a lista de itens do carrinho.
     * @return Uma resposta HTTP com status 201 (Created) em caso de sucesso,
     * ou 400 (Bad Request) em caso de erro.
     */
    @PostMapping("/checkout")
    public ResponseEntity<String> finalizarCompra(@RequestBody CheckoutDTO checkoutDTO) {
        try {
            // Delega toda a lógica complexa para o serviço
            pedidoService.criarPedido(checkoutDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Pedido realizado com sucesso!");
        } catch (RuntimeException e) {
            // Captura exceções de negócio (ex: usuário ou projeto não encontrado) do serviço
            // e retorna um erro claro para o frontend.
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}