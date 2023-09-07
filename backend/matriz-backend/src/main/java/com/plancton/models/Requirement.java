package com.plancton.models;

import jakarta.persistence.*;

@Entity
@Table(name="requirements")
public class Requirement {
@Id
    @Column(name="requirement_id")
    private Integer requirementId;
    @Column(name="title")
    private String title;
    @Column(name="actual_state")
    private String actualState;
    @Column(name="requirement")
    private String requirement;
    @Column(name="type")
    private String type;
    @Column(name="compliance")
    private String compliance;
    @Column(name="relevance")
    private String relevance;

    @ManyToOne
    @JoinColumn(name="customer_id")
    Customer customer;


    public Requirement() {
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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
