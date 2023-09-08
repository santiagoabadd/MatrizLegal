package com.plancton.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="normativa")
public class Normativa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="normativa_id")
    private Integer normativaId;

    @Column(name="norma",length = 60,nullable = false)
    private String precioBase;

    @Column(name="title",length = 60,nullable = false)
    private String title;

    @Column(name="authority",length = 60,nullable = false)
    private String authority;

    @Column(name="category",length = 60,nullable = false)
    private String category;

    @Column(name="organism",length = 60,nullable = false)
    private String organism;

    @Column(name="jurisdiction",length = 60,nullable = false)
    private String jurisdiction;

    @Column(name = "current",nullable = false)
    private boolean current;






    public Normativa() {
        super();
    }

    public Normativa(String precioBase, String title, String authority, String category, String organism, String jurisdiction, boolean current) {

        this.precioBase = precioBase;
        this.title = title;
        this.authority = authority;
        this.category = category;
        this.organism = organism;
        this.jurisdiction = jurisdiction;
        this.current = current;
    }

    public Integer getNormativaId() {
        return normativaId;
    }

    public void setNormativaId(Integer normativaId) {
        this.normativaId = normativaId;
    }

    public String getPrecioBase() {
        return precioBase;
    }

    public void setPrecioBase(String precioBase) {
        this.precioBase = precioBase;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    @Override
    public String toString() {
        return "Normativa{" +
                "normativaId=" + normativaId +
                ", precioBase='" + precioBase + '\'' +
                ", title='" + title + '\'' +
                ", authority='" + authority + '\'' +
                ", category='" + category + '\'' +
                ", organism='" + organism + '\'' +
                ", jurisdiction='" + jurisdiction + '\'' +
                ", current=" + current +
                '}';
    }
}
