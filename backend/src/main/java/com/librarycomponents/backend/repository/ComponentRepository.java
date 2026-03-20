package com.librarycomponents.backend.repository;

import com.librarycomponents.backend.model.Component;
import com.librarycomponents.backend.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface ComponentRepository extends JpaRepository<Component, OffsetDateTime> {
    
    List<Component> findByCategoria(Categoria categoria);
    
    List<Component> findByNombreContainingIgnoreCase(String nombre);
    
    List<Component> findByCategoriaNombre(String categoriaNombre);
}
