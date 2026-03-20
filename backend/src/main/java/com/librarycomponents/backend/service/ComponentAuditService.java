package com.librarycomponents.backend.service;

import com.librarycomponents.backend.model.Component;
import com.librarycomponents.backend.model.ComponentAudit;
import com.librarycomponents.backend.repository.ComponentAuditRepository;
import com.librarycomponents.backend.repository.ComponentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComponentAuditService {

    @Autowired
    private ComponentAuditRepository auditRepository;

    @Autowired
    private ComponentRepository componentRepository;

    public void recordComponentCreation(Component component) {
        ComponentAudit audit = new ComponentAudit();
        audit.setComponentId(component.getId());
        audit.setComponentNombre(component.getNombre());
        audit.setAction("CREATED");
        audit.setCreatedAt(OffsetDateTime.now());
        auditRepository.save(audit);
    }

    public List<ComponentAudit> getNewComponentsSinceLastCheck() {
        return auditRepository.findByAction("CREATED");
    }

    public VerificationResponse verifyNewComponents() {
        List<ComponentAudit> newComponents = getNewComponentsSinceLastCheck();
        
        if (newComponents.isEmpty()) {
            return new VerificationResponse(
                "No hay nuevos componentes. Todos han sido cargados.",
                0,
                newComponents
            );
        }

        String message = String.format("Se encontraron %d componentes nuevos:", newComponents.size());
        return new VerificationResponse(
            message,
            newComponents.size(),
            newComponents
        );
    }

    public void updateLastVerifiedTime(Long auditId) {
        ComponentAudit audit = auditRepository.findById(auditId).orElse(null);
        if (audit != null) {
            audit.setLastVerifiedAt(OffsetDateTime.now());
            auditRepository.save(audit);
        }
    }

    public static class VerificationResponse {
        public String mensaje;
        public int totalNuevos;
        public List<ComponentInfo> componentes;

        public VerificationResponse(String mensaje, int totalNuevos, List<ComponentAudit> audits) {
            this.mensaje = mensaje;
            this.totalNuevos = totalNuevos;
            this.componentes = audits.stream()
                .map(a -> new ComponentInfo(a.getComponentNombre(), a.getCreatedAt()))
                .collect(Collectors.toList());
        }

        public static class ComponentInfo {
            public String nombre;
            public OffsetDateTime fechaCreacion;

            public ComponentInfo(String nombre, OffsetDateTime fechaCreacion) {
                this.nombre = nombre;
                this.fechaCreacion = fechaCreacion;
            }
        }
    }
}
