package com.joaosantos.apirestfulv1.controller;

import com.joaosantos.apirestfulv1.model.Autor;
import com.joaosantos.apirestfulv1.model.Projeto;
import com.joaosantos.apirestfulv1.repository.AutorRepository;
import com.joaosantos.apirestfulv1.repository.ProjetoRepository;
import com.joaosantos.apirestfulv1.service.ProjetoService; // Importe o seu serviço
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

/**
 * DTO para receber os dados de criação/alteração de um projeto a partir do frontend.
 * Ele desacopla a API do modelo de domínio interno.
 */
record ProjetoCadastroDTO(
        String nome,
        String descricao,
        String url,
        String imagem,
        boolean destaque,
        Long autorId
) {}

/**
 * Controller para gerenciar as operações de CRUD (Criar, Ler, Alterar, Deletar)
 * para a entidade Projeto, acessível apenas por administradores.
 */
@RestController
@RequestMapping("/api/admin/projetos")
public class AdminProjetoController {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private ProjetoService projetoService;

    /**
     * Endpoint para CRIAR um novo projeto.
     * Recebe um DTO com os dados do projeto e o ID do autor.
     */
    @PostMapping
    public ResponseEntity<Projeto> criarProjeto(@RequestBody ProjetoCadastroDTO dto) {
        // Busca a entidade Autor completa a partir do ID fornecido
        Autor autor = autorRepository.findById(dto.autorId())
                .orElseThrow(() -> new RuntimeException("Autor não encontrado com id: " + dto.autorId()));

        // Cria a nova entidade Projeto
        Projeto novoProjeto = new Projeto();
        novoProjeto.setNome(dto.nome());
        novoProjeto.setDescricao(dto.descricao());
        novoProjeto.setUrl(dto.url());
        novoProjeto.setImagem(dto.imagem());
        novoProjeto.setDestaque(dto.destaque());
        novoProjeto.setAutor(autor);
        novoProjeto.setDataCadastro(LocalDate.now()); // Define a data de cadastro no momento da criação

        Projeto projetoSalvo = projetoRepository.save(novoProjeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(projetoSalvo);
    }

    /**
     * Endpoint para ALTERAR um projeto existente.
     * Busca o projeto pelo ID e atualiza seus dados com base no DTO recebido.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Projeto> alterarProjeto(@PathVariable Long id, @RequestBody ProjetoCadastroDTO dto) {
        // Busca o projeto existente ou lança uma exceção se não encontrado
        Projeto projeto = projetoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado com id: " + id));

        // Busca o novo autor (pode ser o mesmo ou um diferente)
        Autor autor = autorRepository.findById(dto.autorId())
                .orElseThrow(() -> new RuntimeException("Autor não encontrado com id: " + dto.autorId()));

        // Atualiza os campos do projeto existente
        projeto.setNome(dto.nome());
        projeto.setDescricao(dto.descricao());
        projeto.setUrl(dto.url());
        projeto.setImagem(dto.imagem());
        projeto.setDestaque(dto.destaque());
        projeto.setAutor(autor);

        Projeto projetoAtualizado = projetoRepository.save(projeto);
        return ResponseEntity.ok(projetoAtualizado);
    }

    /**
     * Endpoint para DELETAR um projeto.
     * Utiliza o ProjetoService para garantir que a remoção seja transacional
     * e que as referências nos favoritos dos usuários sejam limpas.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProjeto(@PathVariable Long id) { // <-- Nome do método no CONTROLLER

        // Chama o método do serviço, que agora tem a lógica completa
        projetoService.removerProjeto(id); // <-- Chamada ao método correto no SERVIÇO

        return ResponseEntity.noContent().build();
    }
}