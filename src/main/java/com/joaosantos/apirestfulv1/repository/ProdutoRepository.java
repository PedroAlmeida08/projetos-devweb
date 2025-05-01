package com.joaosantos.apirestfulv1.repository;

import com.joaosantos.apirestfulv1.model.Produto;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    // :id --> do produto deve ser igual a um id que será passado por @Param
    @Query("select p from Produto p left outer join fetch p.categoria where p.id = :id")
    Optional<Produto> recuperarProdutoPorIdComLock(@Param("id") Long id);

    @Query("select p from Produto p left outer join fetch p.categoria order by p.id")
    List<Produto> recuperarProdutosComCategoria();
}
