package com.joaosantos.apirestfulv1.controller;

// Classe que recebe a requisição feita pelo browser

import com.joaosantos.apirestfulv1.model.Produto;
import com.joaosantos.apirestfulv1.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController                // GET - POST - PUT - DELETE
@RequestMapping("produtos") // Indica que todas as requisições feitas http://localhost:8080/produtos
                               // serão direcionadas a esse controller

public class ProdutoController{

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    // Indica que esse método deve ser executado ao receber uma requisição do tipo GET
    // feita para http://localhost:8080/produtos
    public List<Produto> recuperarProdutos(){
        return produtoService.recuperarProdutos();
    }

    // Indica que esse método deve ser executado ao receber uma requisição do tipo POST
    // feita para http://localhost:8080/produtos
    @PostMapping
    public Produto cadastrarProduto(@RequestBody Produto produto){
        return produtoService.cadastrarProduto(produto);
    }

    // Indica que esse método deve ser executado ao receber uma requisição do tipo PUT
    // feita para http://localhost:8080/produtos
    @PutMapping
    public Produto alterarProduto(@RequestBody Produto produto){
        return produtoService.alterarProduto(produto);
    }

    // Indica que esse método deve ser executado ao receber uma requisição do tipo DELETE
    // feita para http://localhost:8080/produtos
    @DeleteMapping("{idProduto}")
    public void removerProduto(@PathVariable("idProduto") Long id){
        produtoService.removerProduto(id);
    }
}