package com.joaosantos.apirestfulv1.service;

import com.joaosantos.apirestfulv1.exception.ProdutoNaoEncontradoException;
import com.joaosantos.apirestfulv1.model.Produto;
import com.joaosantos.apirestfulv1.repository.ProdutoRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService{

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> recuperarProdutos(){
        return produtoRepository.recuperarProdutosComCategoria();
    }

    public Produto cadastrarProduto(Produto produto){
        return produtoRepository.save(produto);
    }

// ==> Abordagem sem LOCK

//    public Produto alterarProduto(Produto produto){
//        Optional<Produto> opt = produtoRepository.findById(produto.getId());
//        if(opt.isPresent()){
//            return produtoRepository.save(produto);
//        }
//        throw new ProdutoNaoEncontradoException("Produto número: " + produto.getId() + " não encontrado!");
//    }

// ==> Abordagem 1 com LOCK
//    @Transactional // Indica que o método deverá abrir uma transação
//                   // Cria entityManager, entityTransaction e realiza o commit
//    public Produto alterarProduto(Produto produto){
//        Optional<Produto> opt = produtoRepository.recuperarProdutoPorIdComLock(produto.getId());
//        if(opt.isPresent()){
//            return produtoRepository.save(produto);
//        }
//        throw new ProdutoNaoEncontradoException("Produto número: " + produto.getId() + " não encontrado!");
//    }

// ==> Abordagem 2 com LOCK
    @Transactional // Indica que o método deverá abrir uma transação
                   // Cria entityManager, entityTransaction e realiza o commit
    public Produto alterarProduto(Produto produto){
        // supplier em Java é alguém que não recebe nada e retorna algo
        // .orElseThrow() não recebe nada e retorna uma Exception
        // () dentro de .elseThrow() indica que ele não receberá nada
        // "() ->" == função lambda em Java
        produtoRepository.recuperarProdutoPorIdComLock(produto.getId()).
                orElseThrow(() -> new ProdutoNaoEncontradoException(
                        "Produto número: " + produto.getId() + " não encontrado!"));
        return produtoRepository.save(produto);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removerProduto(long id) {
        produtoRepository.deleteById(id);
//        produtoRepository.deleteById(1L);
//        if (true) {
//            throw new Exception("Deu erro!");
//        }
//        produtoRepository.deleteById(2L);
    }
}
