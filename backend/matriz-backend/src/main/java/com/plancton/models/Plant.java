package com.plancton.models;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name="plant")
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="plant_id")
    private Integer plantId;
    @Column(name = "name",length = 60,nullable = false)
    private String name;

    @Column(name = "description",length = 60,nullable = false)
    private String description;

    @Column(name = "fecha_alta",nullable = false)
    private LocalDate fechaAlta;

    @Column(name = "jurisdiction",length = 60,nullable = false)
    private String jurisdiction;

    @Column(name = "active",nullable = false)
    private boolean active;

    @Column(name = "estado",length = 60,nullable = false)
    private String estado;

    @ManyToOne
    @JoinColumn(name="customer_id")
    Customer customer;
    @OneToMany(mappedBy = "plant",cascade= CascadeType.ALL,orphanRemoval = true)
    Set<Requirement> requirements;


    public Plant(String name, String description, LocalDate fechaAlta, String jurisdiction, boolean active, String estado) {
        this.name = name;
        this.description = description;
        this.fechaAlta = fechaAlta;
        this.jurisdiction = jurisdiction;
        this.active = active;
        this.estado = estado;
    }

    public Integer getPlantId() {
        return plantId;
    }

    public void setPlantId(Integer plantId) {
        this.plantId = plantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getJurisdiction() {
        return jurisdiction;
    }

    public void setJurisdiction(String jurisdiction) {
        this.jurisdiction = jurisdiction;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
