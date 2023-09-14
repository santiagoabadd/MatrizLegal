package com.plancton.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="requirements")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "requirementId")
public class Requirement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    @ManyToOne
    @JoinColumn(name="category_id")
    Category category;

    @ManyToOne
    @JoinColumn(name="plant_id")
    Plant plant;
    @JsonIgnore
    @OneToMany(mappedBy = "requirement",cascade= CascadeType.ALL,orphanRemoval = true)
    Set<Action> actions;





    public Requirement() {
    }

    public Requirement(String title, String actualState, String requirement, String type, String compliance, String relevance, Customer customer, Category category, Plant plant) {
        this.title = title;
        this.actualState = actualState;
        this.requirement = requirement;
        this.type = type;
        this.compliance = compliance;
        this.relevance = relevance;
        this.customer = customer;
        this.category = category;
        this.plant = plant;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Plant getPlant() {
        return plant;
    }

    public void setPlant(Plant plant) {
        this.plant = plant;
    }

    public Set<Action> getActions() {
        return actions;
    }





    public void setActions(Set<Action> actions) {
        this.actions = actions;
    }
}
