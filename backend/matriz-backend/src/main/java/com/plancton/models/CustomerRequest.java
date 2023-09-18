package com.plancton.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

public class CustomerRequest {




    private String company;


    private boolean enabled;






    private Integer[] normativaIds;

    private Integer[] rubroIds;


    public CustomerRequest(String company, boolean enabled, Integer[] normativaIds, Integer[] rubroIds) {
        this.company = company;
        this.enabled = enabled;
        this.normativaIds = normativaIds;
        this.rubroIds = rubroIds;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Integer[] getNormativaIds() {
        return normativaIds;
    }

    public void setNormativaIds(Integer[] normativaIds) {
        this.normativaIds = normativaIds;
    }

    public Integer[] getRubroIds() {
        return rubroIds;
    }

    public void setRubroIds(Integer[] rubroIds) {
        this.rubroIds = rubroIds;
    }
}
