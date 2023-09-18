package com.plancton.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

public class NormativaRequest {




    private String norma;


    private String title;


    private String authority;





    private String organism;


    private String jurisdiction;


    private boolean current;



    private Integer[] categoryIds;

    private Integer[] rubroIds;

    public NormativaRequest(String norma, String title, String authority, String organism, String jurisdiction, boolean current, Integer[] categoryIds,Integer[] rubroIds) {
        this.norma = norma;
        this.title = title;
        this.authority = authority;
        this.organism = organism;
        this.jurisdiction = jurisdiction;
        this.current = current;
        this.categoryIds=categoryIds;
        this.rubroIds=rubroIds;

    }

    public Integer[] getRubrosIds() {
        return rubroIds;
    }

    public void setRubrosIds(Integer[] rubrosIds) {
        this.rubroIds = rubrosIds;
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

    public Integer[] getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(Integer[] categoryIds) {
        this.categoryIds = categoryIds;
    }
}
