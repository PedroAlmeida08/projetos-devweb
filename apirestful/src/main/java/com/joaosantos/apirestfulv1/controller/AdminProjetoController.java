package com.joaosantos.apirestfulv1.controller;

import com.joaosantos.apirestfulv1.model.Autor;
import com.joaosantos.apirestfulv1.model.Projeto;
import com.joaosantos.apirestfulv1.repository.AutorRepository;
import com.joaosantos.apirestfulv1.repository.ProjetoRepository;
import com.joaosantos.apirestfulv1.service.ProjetoService;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.URL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;

// ✅ DTO ATUALIZADO para incluir o preço
record ProjetoCadastroDTO(
        @NotEmpty String nome,
        @NotEmpty String descricao,
        @URL String url,
        @NotEmpty String imagem,
        @NotNull Long autorId,
        @NotNull BigDecimal preco
) {}


@RestController
@RequestMapping("/api/admin/projetos")
public class AdminProjetoController {

    @Autowired private ProjetoRepository projetoRepository;
    @Autowired private AutorRepository autorRepository;
    @Autowired private ProjetoService projetoService;

    @PostMapping
    public ResponseEntity<Projeto> criarProjeto(@RequestBody ProjetoCadastroDTO dto) {
        Autor autor = autorRepository.findById(dto.autorId())
                .orElseThrow(() -> new RuntimeException("Autor não encontrado com id: " + dto.autorId()));

        Projeto novoProjeto = new Projeto();
        novoProjeto.setNome(dto.nome());
        novoProjeto.setDescricao(dto.descricao());
        novoProjeto.setUrl(dto.url());
        novoProjeto.setImagem(dto.imagem());
        novoProjeto.setAutor(autor);
        novoProjeto.setDataCadastro(LocalDate.now());
        novoProjeto.setPreco(dto.preco()); // ✅ LINHA ADICIONADA

        Projeto projetoSalvo = projetoRepository.save(novoProjeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(projetoSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Projeto> alterarProjeto(@PathVariable Long id, @RequestBody ProjetoCadastroDTO dto) {
        Projeto projeto = projetoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado com id: " + id));

        Autor autor = autorRepository.findById(dto.autorId())
                .orElseThrow(() -> new RuntimeException("Autor não encontrado com id: " + dto.autorId()));

        projeto.setNome(dto.nome());
        projeto.setDescricao(dto.descricao());
        projeto.setUrl(dto.url());
        projeto.setImagem(dto.imagem());
        projeto.setAutor(autor);
        projeto.setPreco(dto.preco()); // ✅ LINHA ADICIONADA

        Projeto projetoAtualizado = projetoRepository.save(projeto);
        return ResponseEntity.ok(projetoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProjeto(@PathVariable Long id) {
        projetoService.removerProjeto(id);
        return ResponseEntity.noContent().build();
    }
}