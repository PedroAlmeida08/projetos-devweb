package com.joaosantos.apirestfulv1.repository;

import com.joaosantos.apirestfulv1.model.Autor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AutorRepository extends JpaRepository<Autor, Long> {

}
