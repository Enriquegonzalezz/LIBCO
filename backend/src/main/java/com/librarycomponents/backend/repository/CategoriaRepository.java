package com.librarycomponents.backend.repository;

import com.librarycomponents.backend.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, OffsetDateTime> {
    
    Optional<Categoria> findByNombre(String nombre);
}
