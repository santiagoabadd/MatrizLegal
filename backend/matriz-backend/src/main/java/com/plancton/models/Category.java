package com.plancton.models;


import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="category")
@JsonIdentityInfo(scope = Customer.class,generator = ObjectIdGenerators.PropertyGenerator.class, property = "categoryId")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="category_id")
    private Integer categoryId;
    @Column(name = "category")
    private String category;



    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "categories")
    private Set<Normativa> normativas;
    @JsonIgnore
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Requirement> requirements;


    public Category( ) {
        this.normativas = new HashSet<>();
        this.requirements = new HashSet<>();
    }

    public Category(String category) {
        this.category = category;
        this.normativas = new HashSet<>();
        this.requirements = new HashSet<>();
    }

    public Integer getCategoryId() {
        return categoryId;
    }


    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }


    public String getCategoryAsString() {
        return "Category ID: " + categoryId + ", Category Name: " + category;
    }

    public Set<Normativa> getNormativas() {
        return normativas;
    }

    public void setNormativas(Set<Normativa> normativas) {
        this.normativas = normativas;
    }

    public Set<Requirement> getRequirements() {
        return requirements;
    }

    public void setRequirements(Set<Requirement> requirements) {
        this.requirements = requirements;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


}
