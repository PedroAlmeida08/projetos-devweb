package com.joaosantos.apirestfulv1.repository;

import com.joaosantos.apirestfulv1.model.Projeto;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositório para a entidade Projeto.
 * Estende JpaRepository para obter métodos CRUD e de paginação padrão.
 */
@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

    /**
     * Busca um projeto pelo seu ID aplicando um LOCK pessimista.
     * Útil para cenários de alta concorrência para evitar que dois usuários alterem o mesmo
     * projeto ao mesmo tempo. Usado no seu ProjetoService.
     *
     * @param id O ID do projeto a ser buscado.
     * @return um Optional contendo o projeto, se encontrado.
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Projeto p WHERE p.id = :id")
    Optional<Projeto> recuperarProjetoPorIdComLock(@Param("id") Long id);

    /**
     * Busca todos os projetos e seus autores associados em uma única consulta.
     * O 'JOIN FETCH' é uma otimização de performance que evita o problema de N+1 queries.
     *
     * @return uma lista de todos os projetos com seus autores.
     */
    @Query("SELECT p FROM Projeto p JOIN FETCH p.autor")
    List<Projeto> recuperarProjetosComAutor();

    /**
     * Busca projetos cujo nome contém o termo de busca (ignorando maiúsculas/minúsculas).
     * O resultado é paginado de acordo com o objeto Pageable fornecido.
     * Este método é usado pelo controller para a funcionalidade de busca e infinite scroll.
     *
     * @param nome O termo a ser buscado no nome dos projetos.
     * @param pageable O objeto contendo as informações de paginação (página, tamanho, ordenação).
     * @return uma Página (Page) de Projetos.
     */
    Page<Projeto> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}