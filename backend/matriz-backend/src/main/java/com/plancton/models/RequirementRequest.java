package com.plancton.models;

import jakarta.persistence.*;

import java.util.Set;

public class RequirementRequest {


    private Integer requirementId;

    private String title;

    private String actualState;

    private String requirement;

    private String type;

    private String compliance;

    private String relevance;


    Integer customerId;

    Integer categoryId;

    Integer plantId;

    public RequirementRequest() {}

    public RequirementRequest(Integer requirementId, String title, String actualState, String requirement, String type, String compliance, String relevance, Integer customerId, Integer categoryId, Integer plantId) {
        this.requirementId = requirementId;
        this.title = title;
        this.actualState = actualState;
        this.requirement = requirement;
        this.type = type;
        this.compliance = compliance;
        this.relevance = relevance;
        this.customerId = customerId;
        this.categoryId = categoryId;
        this.plantId = plantId;
    }

    public Integer getRequirementId() {
        return requirementId;
    }

    public void setRequirementId(Integer requirementId) {
        this.requirementId = requirementId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getActualState() {
        return actualState;
    }

    public void setActualState(String actualState) {
        this.actualState = actualState;
    }

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCompliance() {
        return compliance;
    }

    public void setCompliance(String compliance) {
        this.compliance = compliance;
    }

    public String getRelevance() {
        return relevance;
    }

    public void setRelevance(String relevance) {
        this.relevance = relevance;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getPlantId() {
        return plantId;
    }

    public void setPlantId(Integer plantId) {
        this.plantId = plantId;
    }
}
