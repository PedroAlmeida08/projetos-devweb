package com.joaosantos.apirestfulv1.exception;

public class ProdutoNaoEncontradoException extends RuntimeException{
    public ProdutoNaoEncontradoException(String message){
        super(message);
    }
}
