package com.joaosantos.apirestfulv1.controller;

import com.joaosantos.apirestfulv1.model.Projeto;
import com.joaosantos.apirestfulv1.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller que expõe os endpoints públicos relacionados a Projetos.
 * Responsável por operações de leitura de dados.
 */
@RestController
@RequestMapping("/projetos")
public class ProjetoController {

    @Autowired
    private ProjetoRepository repository;

    /**
     * Endpoint principal para listar projetos. Suporta paginação e busca por nome.
     * Utilizado pela página de projetos do frontend para o infinite scroll.
     *
     * @param page O número da página a ser retornada (padrão: 0).
     * @param size A quantidade de projetos por página (padrão: 9).
     * @param busca Um termo de busca opcional para filtrar projetos pelo nome.
     * @return um objeto Page<Projeto> contendo a lista de projetos da página e metadados de paginação.
     */
    @GetMapping
    public Page<Projeto> listar(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size,
            @RequestParam(required = false) String busca
    ) {
        // Cria um objeto Pageable para definir a paginação e a ordenação.
        // Aqui, ordenamos por 'dataCadastro' em ordem decrescente (do mais novo para o mais antigo).
        Pageable pageable = PageRequest.of(page, size, Sort.by("dataCadastro").descending());

        if (busca != null && !busca.trim().isEmpty()) {
            // Se um termo de busca foi fornecido, usa o método de busca do repositório.
            return repository.findByNomeContainingIgnoreCase(busca, pageable);
        } else {
            // Se não houver busca, retorna todos os projetos de forma paginada.
            return repository.findAll(pageable);
        }
    }

    /**
     * Endpoint para buscar um único projeto pelo seu ID.
     *
     * @param id O ID do projeto a ser buscado.
     * @return Uma resposta com o projeto encontrado (200 OK) ou um erro 404 Not Found se não existir.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Projeto> recuperarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok) // Se encontrar, retorna uma resposta 200 OK com o projeto.
                .orElse(ResponseEntity.notFound().build()); // Se não encontrar, retorna 404 Not Found.
    }
}