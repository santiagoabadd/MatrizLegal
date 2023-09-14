package com.plancton.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Set;

public class PlantRequest {



    private String name;


    private String description;


    private LocalDate fechaAlta;


    private String jurisdiction;


    private boolean active;


    private String estado;

    Integer customerId;

    public PlantRequest(String name, String description, LocalDate fechaAlta, String jurisdiction, boolean active, String estado, Integer customerId) {
        this.name = name;
        this.description = description;
        this.fechaAlta = fechaAlta;
        this.jurisdiction = jurisdiction;
        this.active = active;
        this.estado = estado;
        this.customerId = customerId;
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

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }
}
