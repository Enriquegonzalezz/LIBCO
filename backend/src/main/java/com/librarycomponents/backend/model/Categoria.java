package com.librarycomponents.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "categorias")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Categoria {

    @Id
    @Column(name = "id", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT NOW()")
    private OffsetDateTime id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = OffsetDateTime.now();
        }
    }
}
