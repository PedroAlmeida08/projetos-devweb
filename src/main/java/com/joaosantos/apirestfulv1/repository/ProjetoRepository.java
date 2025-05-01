package com.joaosantos.apirestfulv1.repository;

import com.joaosantos.apirestfulv1.model.Projeto;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    // :id --> do projeto deve ser igual a um id que será passado por @Param
    @Query("select p from Projeto p left outer join fetch p.autor where p.id = :id")
    Optional<Projeto> recuperarProjetoPorIdComLock(@Param("id") Long id);

    @Query("select p from Projeto p left outer join fetch p.autor order by p.id")
    List<Projeto> recuperarProjetosComAutor();
}
