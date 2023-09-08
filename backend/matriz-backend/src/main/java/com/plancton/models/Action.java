package com.plancton.models;


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
    @Column(name = "title",length = 60,nullable = false)
    private String title;

    @Column(name = "description",length = 60,nullable = false)
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


    public Action(String title, String description, LocalDate fechaLimite, Integer avance, String responsable, String estado) {
        this.title = title;
        this.description = description;
        this.fechaLimite = fechaLimite;
        this.avance = avance;
        this.responsable = responsable;
        this.estado = estado;
    }


}
