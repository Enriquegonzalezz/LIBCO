package com.librarycomponents.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "componentes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Component {

    @Id
    @Column(name = "id", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT NOW()")
    private OffsetDateTime id;

    @Column(nullable = false)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "codigo_ejemplo", columnDefinition = "TEXT")
    private String codigoEjemplo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @Column(name = "fecha_creacion", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT NOW()")
    private OffsetDateTime fechaCreacion;

    @Column(name = "framework")
    private String framework;

    @Column(name = "is_ui_component")
    private Boolean isUIComponent;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = OffsetDateTime.now();
        }
        if (fechaCreacion == null) {
            fechaCreacion = OffsetDateTime.now();
        }
        if (isUIComponent == null) {
            isUIComponent = true;
        }
        if (framework == null) {
            framework = "Angular";
        }
    }
}
