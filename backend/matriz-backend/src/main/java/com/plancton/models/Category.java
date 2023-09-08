package com.plancton.models;


import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="category_id")
    private Integer categoryId;
    @Column(name = "category")
    private String category;




    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "category_normativa_junction",
            joinColumns = {@JoinColumn(name = "category_id")},
            inverseJoinColumns = {@JoinColumn(name = "normativa_id")}
    )
    private Set<Category> categories;

    @OneToMany(mappedBy = "category")
    List<Requirement> requirements;

    public Category( String category) {

        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
