package com.joaosantos.apirestfulv1.controller;

import com.joaosantos.apirestfulv1.model.Projeto;
import com.joaosantos.apirestfulv1.model.Usuario;
import com.joaosantos.apirestfulv1.repository.ProjetoRepository;
import com.joaosantos.apirestfulv1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favoritos") // Usamos "/api" para diferenciar de rotas públicas
public class FavoritoController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    // Adiciona um projeto aos favoritos de um usuário
    @PostMapping("/{usuarioId}/{projetoId}")
    public ResponseEntity<Void> adicionarFavorito(@PathVariable Long usuarioId, @PathVariable Long projetoId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id: " + usuarioId));
        Projeto projeto = projetoRepository.findById(projetoId)
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado com id: " + projetoId));

        usuario.getProjetosFavoritos().add(projeto);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok().build();
    }

    // Remove um projeto dos favoritos de um usuário
    @DeleteMapping("/{usuarioId}/{projetoId}")
    public ResponseEntity<Void> removerFavorito(@PathVariable Long usuarioId, @PathVariable Long projetoId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id: " + usuarioId));

        usuario.getProjetosFavoritos().removeIf(p -> p.getId().equals(projetoId));
        usuarioRepository.save(usuario);

        return ResponseEntity.ok().build();
    }

    // Lista todos os projetos favoritos de um usuário
    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<Projeto>> listarFavoritos(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id: " + usuarioId));

        // Retorna uma cópia da lista de projetos favoritos
        return ResponseEntity.ok(List.copyOf(usuario.getProjetosFavoritos()));
    }

    // Lista apenas os IDs dos projetos favoritos (otimizado para o frontend)
    @GetMapping("/{usuarioId}/ids")
    public ResponseEntity<List<Long>> listarIdsFavoritos(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id: " + usuarioId));

        List<Long> ids = usuario.getProjetosFavoritos().stream()
                .map(Projeto::getId)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ids);
    }
}