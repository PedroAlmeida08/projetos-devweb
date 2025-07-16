package com.joaosantos.apirestfulv1.controller;

// Classe que recebe a requisição feita pelo browser

import com.joaosantos.apirestfulv1.model.Projeto;
import com.joaosantos.apirestfulv1.service.ProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController                // GET - POST - PUT - DELETE
@RequestMapping("projetos") // Indica que todas as requisições feitas http://localhost:8080/projetos
// serão direcionadas a esse controller

public class ProjetoController{

    @Autowired
    private ProjetoService projetoService;

    @GetMapping
    // Indica que esse método deve ser executado ao receber uma requisição do tipo GET
    // feita para http://localhost:8080/projetos
    public List<Projeto> recuperarProjetos(){
        return projetoService.recuperarProjetos();
    }

    // Indica que esse método deve ser executado ao receber uma requisição do tipo POST
    // feita para http://localhost:8080/projetos
    @PostMapping
    public Projeto cadastrarProjeto(@RequestBody Projeto projeto){
        return projetoService.cadastrarProjeto(projeto);
    }

    // Indica que esse método deve ser executado ao receber uma requisição do tipo PUT
    // feita para http://localhost:8080/projetos
    @PutMapping
    public Projeto alterarProjeto(@RequestBody Projeto projeto){
        return projetoService.alterarProjeto(projeto);
    }

    // Indica que esse método deve ser executado ao receber uma requisição do tipo DELETE
    // feita para http://localhost:8080/projetos
    @DeleteMapping("{idProjeto}")
    public void removerProjeto(@PathVariable("idProjeto") Long id){
        projetoService.removerProjeto(id);
    }
}