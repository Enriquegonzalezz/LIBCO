package com.librarycomponents.backend.controller;

import com.librarycomponents.backend.model.Component;
import com.librarycomponents.backend.service.ComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/components")
@CrossOrigin(origins = "*")
public class ComponentController {

    @Autowired
    private ComponentService componentService;

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }

    @GetMapping
    public ResponseEntity<?> getAllComponents() {
        try {
            System.out.println("=== INICIANDO CONSULTA DE COMPONENTES ===");
            List<Component> components = componentService.getAllComponents();
            System.out.println("=== CONSULTA EXITOSA: " + components.size() + " componentes ===");
            return ResponseEntity.ok(components);
        } catch (Exception e) {
            System.out.println("=== ERROR EN CONSULTA ===");
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Component>> searchComponents(@RequestParam String nombre) {
        List<Component> components = componentService.searchComponentsByNombre(nombre);
        return ResponseEntity.ok(components);
    }

    @GetMapping("/categoria/{categoriaNombre}")
    public ResponseEntity<List<Component>> getComponentsByCategoria(@PathVariable String categoriaNombre) {
        List<Component> components = componentService.getComponentsByCategoriaNombre(categoriaNombre);
        return ResponseEntity.ok(components);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Component> getComponentById(@PathVariable String id) {
        try {
            OffsetDateTime dateId = OffsetDateTime.parse(id);
            return componentService.getComponentById(dateId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<Component> createComponent(@RequestBody Component component) {
        Component createdComponent = componentService.createComponent(component);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComponent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Component> updateComponent(@PathVariable String id, @RequestBody Component component) {
        try {
            OffsetDateTime dateId = OffsetDateTime.parse(id);
            Component updatedComponent = componentService.updateComponent(dateId, component);
            return ResponseEntity.ok(updatedComponent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComponent(@PathVariable String id) {
        try {
            OffsetDateTime dateId = OffsetDateTime.parse(id);
            componentService.deleteComponent(dateId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
