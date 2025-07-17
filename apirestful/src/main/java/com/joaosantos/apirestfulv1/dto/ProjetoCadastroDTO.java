package com.joaosantos.apirestfulv1.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.URL; // Import correto para a anotação @URL

/**
 * DTO (Data Transfer Object) para receber os dados de criação e alteração de um Projeto.
 * Utiliza anotações de validação para garantir a integridade dos dados recebidos pela API.
 * É definido como um 'record' do Java para uma sintaxe mais concisa.
 */
public record ProjetoCadastroDTO(

        @NotEmpty(message = "O nome do projeto não pode ser vazio.")
        String nome,

        @NotEmpty(message = "A descrição não pode ser vazia.")
        String descricao,

        @NotEmpty(message = "A URL do projeto não pode ser vazia.")
        @URL(message = "A URL do projeto deve ser válida.")
        String url,

        @NotEmpty(message = "O nome do arquivo da imagem não pode ser vazio.")
        String imagem,

        @NotNull(message = "O autor deve ser selecionado.")
        Long autorId
) {}