package com.joaosantos.apirestfulv1.service;

import com.joaosantos.apirestfulv1.exception.ProjetoNaoEncontradoException;
import com.joaosantos.apirestfulv1.model.Projeto;
import com.joaosantos.apirestfulv1.repository.ProjetoRepository;
import com.joaosantos.apirestfulv1.repository.UsuarioRepository; // 1. Importe o UsuarioRepository
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository; // 2. Injete o UsuarioRepository

    public List<Projeto> recuperarProjetos() {
        return projetoRepository.recuperarProjetosComAutor();
    }

    public Projeto cadastrarProjeto(Projeto projeto) {
        return projetoRepository.save(projeto);
    }

    @Transactional
    public Projeto alterarProjeto(Projeto projeto) {
        projetoRepository.recuperarProjetoPorIdComLock(projeto.getId())
                .orElseThrow(() -> new ProjetoNaoEncontradoException(
                        "Projeto número: " + projeto.getId() + " não encontrado!"));
        return projetoRepository.save(projeto);
    }

    /**
     * ✅ LÓGICA DE REMOÇÃO ATUALIZADA ✅
     * Remove um projeto e suas associações com os favoritos dos usuários.
     * A anotação @Transactional garante que todas as operações (ou nenhuma) sejam concluídas.
     */
    @Transactional
    public void removerProjeto(long id) {
        var projeto = projetoRepository.findById(id)
                .orElseThrow(() -> new ProjetoNaoEncontradoException("Projeto número: " + id + " não encontrado!"));

        // 3. Busca todos os usuários que favoritaram este projeto
        var usuarios = usuarioRepository.findAll();
        usuarios.forEach(usuario -> {
            boolean removed = usuario.getProjetosFavoritos().remove(projeto);
            if (removed) {
                usuarioRepository.save(usuario);
            }
        });

        // 4. Agora, deleta o projeto com segurança
        projetoRepository.deleteById(id);
    }
}