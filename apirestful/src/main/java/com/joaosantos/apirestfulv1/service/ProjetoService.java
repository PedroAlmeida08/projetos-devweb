package com.joaosantos.apirestfulv1.service;

import com.joaosantos.apirestfulv1.exception.ProjetoNaoEncontradoException;
import com.joaosantos.apirestfulv1.model.Projeto;
import com.joaosantos.apirestfulv1.repository.ProjetoRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjetoService{

    @Autowired
    private ProjetoRepository projetoRepository;

    public List<Projeto> recuperarProjetos(){
        return projetoRepository.recuperarProjetosComAutor();
    }

    public Projeto cadastrarProjeto(Projeto projeto){
        return projetoRepository.save(projeto);
    }

// ==> Abordagem sem LOCK

//    public Projeto alterarProjeto(Projeto projeto){
//        Optional<Projeto> opt = projetoRepository.findById(projeto.getId());
//        if(opt.isPresent()){
//            return projetoRepository.save(projeto);
//        }
//        throw new ProjetoNaoEncontradoException("Projeto número: " + projeto.getId() + " não encontrado!");
//    }

// ==> Abordagem 1 com LOCK
//    @Transactional // Indica que o método deverá abrir uma transação
//                   // Cria entityManager, entityTransaction e realiza o commit
//    public Projeto alterarProjeto(Projeto projeto){
//        Optional<Projeto> opt = projetoRepository.recuperarProjetoPorIdComLock(projeto.getId());
//        if(opt.isPresent()){
//            return projetoRepository.save(projeto);
//        }
//        throw new ProjetoNaoEncontradoException("Projeto número: " + projeto.getId() + " não encontrado!");
//    }

    // ==> Abordagem 2 com LOCK
    @Transactional // Indica que o método deverá abrir uma transação
    // Cria entityManager, entityTransaction e realiza o commit
    public Projeto alterarProjeto(Projeto projeto){
        // supplier em Java é alguém que não recebe nada e retorna algo
        // .orElseThrow() não recebe nada e retorna uma Exception
        // () dentro de .elseThrow() indica que ele não receberá nada
        // "() ->" == função lambda em Java
        projetoRepository.recuperarProjetoPorIdComLock(projeto.getId()).
                orElseThrow(() -> new ProjetoNaoEncontradoException(
                        "Projeto número: " + projeto.getId() + " não encontrado!"));
        return projetoRepository.save(projeto);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removerProjeto(long id) {
        projetoRepository.deleteById(id);
//        projetoRepository.deleteById(1L);
//        if (true) {
//            throw new Exception("Deu erro!");
//        }
//        projetoRepository.deleteById(2L);
    }
}
