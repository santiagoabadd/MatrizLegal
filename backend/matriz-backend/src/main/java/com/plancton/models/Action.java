package com.plancton.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="action")
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="action_id")
    private Integer actionId;
    @Column(name = "title",length = 300,nullable = false)
    private String title;

    @Column(name = "description",length = 1000,nullable = false)
    private String description;

    @Column(name = "fecha_limite",nullable = false)
    private LocalDate fechaLimite;

    @Column(name = "avance",nullable = false)
    private Integer avance;

    @Column(name = "responsable",length = 60,nullable = false)
    private String responsable;

    @Column(name = "estado",length = 60,nullable = false)
    private String estado;


    @ManyToOne
    @JoinColumn(name="requirement_id")
    Requirement requirement;




    public Action(){}
    public Action(String title, String description, LocalDate fechaLimite, Integer avance, String responsable, String estado) {
        this.title = title;
        this.description = description;
        this.fechaLimite = fechaLimite;
        this.avance = avance;
        this.responsable = responsable;
        this.estado = estado;
    }



    public Integer getActionId() {
        return actionId;
    }

    public void setActionId(Integer actionId) {
        this.actionId = actionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getFechaLimite() {
        return fechaLimite;
    }

    public void setFechaLimite(LocalDate fechaLimite) {
        this.fechaLimite = fechaLimite;
    }

    public Integer getAvance() {
        return avance;
    }

    public void setAvance(Integer avance) {
        this.avance = avance;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Requirement getRequirement() {
        return requirement;
    }

    public void setRequirement(Requirement requirement) {
        this.requirement = requirement;
    }
}
