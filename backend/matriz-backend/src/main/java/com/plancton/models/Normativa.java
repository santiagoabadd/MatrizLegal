package com.plancton.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="normativa")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "normativaId")
public class Normativa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="normativa_id")
    private Integer normativaId;

    @Column(name="norma",length = 60,nullable = false)
    private String norma;

    @Column(name="title",length = 60,nullable = false)
    private String title;

    @Column(name="authority",length = 60,nullable = false)
    private String authority;



    @Column(name="organism",length = 60,nullable = false)
    private String organism;

    @Column(name="jurisdiction",length = 60,nullable = false)
    private String jurisdiction;

    @Column(name = "current",nullable = false)
    private boolean current;
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "normativa_rubro",
            joinColumns = @JoinColumn(name = "normativa_id"),
            inverseJoinColumns = @JoinColumn(name = "rubro_id")
    )
    private Set<Rubro> rubroList = new HashSet<>();


    @ManyToOne
    @JoinColumn(name="category_id")
    Category category;



    public Normativa() {
        super();
    }

    public Normativa(String norma, String title, String authority,String organism, String jurisdiction, boolean current,Category category) {

        this.norma = norma;
        this.title = title;
        this.authority = authority;
        this.category=category;

        this.organism = organism;
        this.jurisdiction = jurisdiction;
        this.current = current;
    }



    public Set<Rubro> getRubroList() {
        return rubroList;
    }

    public void setRubroList(Set<Rubro> rubroList) {
        this.rubroList = rubroList;
    }

    public Integer getNormativaId() {
        return normativaId;
    }

    public void setNormativaId(Integer normativaId) {
        this.normativaId = normativaId;
    }

    public String getNorma() {
        return norma;
    }

    public void setNorma(String norma) {
        this.norma = norma;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }



    public String getOrganism() {
        return organism;
    }

    public void setOrganism(String organism) {
        this.organism = organism;
    }

    public String getJurisdiction() {
        return jurisdiction;
    }

    public void setJurisdiction(String jurisdiction) {
        this.jurisdiction = jurisdiction;
    }

    public boolean isCurrent() {
        return current;
    }

    public void setCurrent(boolean current) {
        this.current = current;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category){this.category=category;}

    @Override
    public String toString() {
        return "Normativa{" +
                "normativaId=" + normativaId +
                ", norma='" + norma + '\'' +
                ", title='" + title + '\'' +
                ", authority='" + authority + '\'' +
                ", category='" + category + '\'' +
                ", organism='" + organism + '\'' +
                ", jurisdiction='" + jurisdiction + '\'' +
                ", current=" + current +
                '}';
    }
}
