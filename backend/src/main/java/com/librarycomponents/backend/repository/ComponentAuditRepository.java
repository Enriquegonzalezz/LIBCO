package com.librarycomponents.backend.repository;

import com.librarycomponents.backend.model.ComponentAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ComponentAuditRepository extends JpaRepository<ComponentAudit, Long> {
    
    Optional<ComponentAudit> findByComponentId(OffsetDateTime componentId);
    
    List<ComponentAudit> findByActionAndCreatedAtAfter(String action, OffsetDateTime createdAfter);
    
    List<ComponentAudit> findByAction(String action);
}
