package com.librarycomponents.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "component_audits")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComponentAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "component_id", nullable = false)
    private OffsetDateTime componentId;

    @Column(name = "component_nombre", nullable = false)
    private String componentNombre;

    @Column(name = "action", nullable = false)
    private String action;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "last_verified_at")
    private OffsetDateTime lastVerifiedAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = OffsetDateTime.now();
        }
    }
}
