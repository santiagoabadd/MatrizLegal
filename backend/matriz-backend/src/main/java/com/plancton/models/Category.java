package com.plancton.models;


import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="category")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "categoryId")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="category_id")
    private Integer categoryId;
    @Column(name = "category")
    private String category;



    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "category_normativa",
            joinColumns = {@JoinColumn(name = "category_id")},
            inverseJoinColumns = {@JoinColumn(name = "normativa_id")}
    )
    private Set<Normativa> normativasC;
    @JsonIgnore
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Requirement> requirements;
    @JsonIgnore
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Normativa> normativa;

    public Category( ) {}

    public Integer getCategoryId() {
        return categoryId;
    }


    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Set<Normativa> getNormativasC() {
        return normativasC;
    }

    public void setNormativasC(Set<Normativa> normativasC) {
        this.normativasC = normativasC;
    }

    public Set<Normativa> getNormativa() {
        return normativa;
    }

    public void setNormativa(Set<Normativa> normativa) {
        this.normativa = normativa;
    }

    public List<Requirement> getRequirements() {
        return requirements;
    }

    public void setRequirements(List<Requirement> requirements) {
        this.requirements = requirements;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


}
