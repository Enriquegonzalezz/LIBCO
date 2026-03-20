package com.librarycomponents.backend.controller;

import com.librarycomponents.backend.model.Categoria;
import com.librarycomponents.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public ResponseEntity<List<Categoria>> getAllCategorias() {
        try {
            System.out.println("=== CARGANDO CATEGORÍAS ===");
            List<Categoria> categorias = categoriaRepository.findAll();
            System.out.println("=== CATEGORÍAS CARGADAS: " + categorias.size() + " ===");
            return ResponseEntity.ok(categorias);
        } catch (Exception e) {
            System.out.println("=== ERROR AL CARGAR CATEGORÍAS ===");
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
