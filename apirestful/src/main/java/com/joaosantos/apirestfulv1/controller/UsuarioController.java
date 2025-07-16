package com.joaosantos.apirestfulv1.controller;

import com.joaosantos.apirestfulv1.model.Usuario;
import com.joaosantos.apirestfulv1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

// DTO (Data Transfer Object) para receber os dados do frontend
record UsuarioCadastroDTO(
        @NotEmpty String conta,
        @NotEmpty String senha,
        @NotEmpty String confirmacaoSenha
) {}

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/cadastrar")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> cadastrar(@Valid @RequestBody UsuarioCadastroDTO dados) {
        // 1. Validação de Senhas
        if (!dados.senha().equals(dados.confirmacaoSenha())) {
            return ResponseEntity.badRequest().body("As senhas não coincidem.");
        }

        // 2. Validação de Conta Única
        if (usuarioRepository.findByConta(dados.conta()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Esta conta já está em uso.");
        }

        // 3. Criar e Salvar o Usuário com Senha Criptografada
        Usuario novoUsuario = new Usuario();
        novoUsuario.setConta(dados.conta());
        novoUsuario.setSenha(passwordEncoder.encode(dados.senha()));
        usuarioRepository.save(novoUsuario);

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso!");
    }
}