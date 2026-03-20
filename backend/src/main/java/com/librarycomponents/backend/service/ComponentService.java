package com.librarycomponents.backend.service;

import com.librarycomponents.backend.model.Component;
import com.librarycomponents.backend.model.Categoria;
import com.librarycomponents.backend.repository.ComponentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ComponentService {

    private static final Logger logger = LoggerFactory.getLogger(ComponentService.class);

    @Autowired
    private ComponentRepository componentRepository;

    @Autowired
    private ComponentAuditService auditService;

    public List<Component> getAllComponents() {
        try {
            logger.info("Fetching all components from database");
            List<Component> components = componentRepository.findAll();
            logger.info("Found {} components", components.size());
            return components;
        } catch (Exception e) {
            logger.error("Error fetching components: ", e);
            throw new RuntimeException("Error fetching components: " + e.getMessage(), e);
        }
    }

    public Optional<Component> getComponentById(OffsetDateTime id) {
        return componentRepository.findById(id);
    }

    public Component createComponent(Component component) {
        Component savedComponent = componentRepository.save(component);
        auditService.recordComponentCreation(savedComponent);
        return savedComponent;
    }

    public Component updateComponent(OffsetDateTime id, Component componentDetails) {
        Component component = componentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Component not found with id: " + id));

        component.setNombre(componentDetails.getNombre());
        component.setDescripcion(componentDetails.getDescripcion());
        component.setCodigoEjemplo(componentDetails.getCodigoEjemplo());
        component.setCategoria(componentDetails.getCategoria());

        return componentRepository.save(component);  
    }

    public void deleteComponent(OffsetDateTime id) {
        Component component = componentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Component not found with id: " + id));
        componentRepository.delete(component);
    }

    public List<Component> getComponentsByCategoriaNombre(String categoriaNombre) {
        return componentRepository.findByCategoriaNombre(categoriaNombre);
    }

    public List<Component> searchComponentsByNombre(String nombre) {
        return componentRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
