// src/main/java/com/joaosantos/apirestfulv1/dto/CheckoutDTO.java
package com.joaosantos.apirestfulv1.dto;

import java.util.List;

public record CheckoutDTO(Long usuarioId, List<ItemCarrinhoDTO> itens) {}