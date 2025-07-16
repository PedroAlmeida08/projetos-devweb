package com.joaosantos.apirestfulv1.controller;

import com.joaosantos.apirestfulv1.model.Usuario;
import com.joaosantos.apirestfulv1.repository.UsuarioRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * DTO para receber os dados de cadastro do frontend.
 * Usa anotações de validação para garantir a integridade dos dados.
 */
record UsuarioCadastroDTO(
        @Size(min = 3, message = "Nome de usuário deve ter no mínimo 3 caracteres") String username,
        @Size(min = 8, message = "Senha deve ter no mínimo 8 caracteres") String senha,
        String confirmacaoSenha
) {}

/**
 * DTO para receber os dados de login do frontend.
 */
record LoginDTO(String username, String senha) {}

/**
 * DTO para enviar a resposta de login bem-sucedido para o frontend.
 */
record TokenResponseDTO(long token) {}


/**
 * Controller que expõe os endpoints para cadastro e autenticação de Usuários.
 */
@RestController
@RequestMapping("/usuarios") // Todas as rotas neste controller começarão com /usuarios
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Endpoint para cadastrar um novo usuário.
     * Valida os dados, verifica se o username já existe e salva o usuário com senha criptografada.
     */
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@Valid @RequestBody UsuarioCadastroDTO dados) {
        // Valida se as senhas coincidem
        if (!dados.senha().equals(dados.confirmacaoSenha())) {
            return ResponseEntity.badRequest().body("As senhas não coincidem.");
        }

        // Valida se o username já está em uso
        if (usuarioRepository.findByUsername(dados.username()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Este nome de usuário já está em uso.");
        }

        // Cria e salva o novo usuário
        Usuario novoUsuario = new Usuario();
        novoUsuario.setUsername(dados.username());
        novoUsuario.setSenha(passwordEncoder.encode(dados.senha())); // Criptografa a senha
        usuarioRepository.save(novoUsuario);

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso!");
    }

    /**
     * Endpoint para autenticar um usuário.
     * Verifica se o usuário existe e se a senha fornecida corresponde à senha salva no banco.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dados) {
        // Busca o usuário pelo username fornecido
        var usuarioOptional = usuarioRepository.findByUsername(dados.username());

        // Se o usuário não existir, retorna "Não Autorizado"
        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nome de usuário ou senha inválidos.");
        }

        var usuario = usuarioOptional.get();

        // Compara a senha enviada pelo formulário com a senha criptografada no banco
        if (passwordEncoder.matches(dados.senha(), usuario.getSenha())) {
            // Se as senhas corresponderem, o login é bem-sucedido
            var tokenResponse = new TokenResponseDTO(usuario.getId());
            return ResponseEntity.ok(tokenResponse);
        }

        // Se as senhas não corresponderem, retorna "Não Autorizado"
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nome de usuário ou senha inválidos.");
    }
}