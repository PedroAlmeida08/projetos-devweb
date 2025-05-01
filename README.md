# 📘 API RESTful com Spring Boot – Projetos e Autor

Este projeto é uma API RESTful desenvolvida com **Spring Boot**, utilizando as entidades **Projetos** e **Autor**, como continuação do Trabalho 1 (site com Bootstrap). A API está preparada para ser integrada futuramente com uma aplicação React, onde será possível realizar buscas e interações com os dados de forma dinâmica.

## 🔧 Tecnologias Utilizadas

- Java 17+
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

## 📚 Estrutura de Domínio

### 📂 Entidades:

- **Autor**: representa o autor relacionado a um ou mais projetos.
- **Projeto**: representa o projeto em si, relacionado a um autor.

A relação entre elas é do tipo **muitos para um**: vários projetos podem ser relacionados a um mesmo autor.

## 🔁 Funcionalidades da API

### Para a entidade `Projeto`:

- ✅ **GET** `/projetos` → Listagem de todos os projetos (ainda sem paginação)
- ✅ **GET** `/projetos/{id}` → Buscar projeto por ID
- ✅ **POST** `/projetos` → Cadastrar novo projeto
- ✅ **PUT** `/projetos/{id}` → Atualizar projeto existente
- ✅ **DELETE** `/projetos/{id}` → Excluir projeto
- ✅ **GET** `/projetos/autor/{autorId}` → Listar todos os projetos de um determinado autor

### Para a entidade `Autor`:

- ✅ **GET** `/autores` → Listagem de autores
- ✅ **GET** `/autores/{id}` → Buscar autor por ID
- ✅ **POST** `/autores` → Cadastrar novo autor
- ✅ **PUT** `/autores/{id}` → Atualizar autor existente
- ✅ **DELETE** `/autores/{id}` → Excluir autor

## 🔍 Exemplos de uso

### Buscar todos os projetos de um autor específico:

```http
GET /projetos/autor/3
```

Retorna todos os projetos vinculados ao autor de ID `3`.
