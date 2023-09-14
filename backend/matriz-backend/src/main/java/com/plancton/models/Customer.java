package com.plancton.models;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="customers")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "customerId")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="customer_id")
    private Integer customerId;
    @Column(name = "company")
    private String company;

    @Column(name = "enabled")
    private boolean enabled;
    @JsonIgnore
    @OneToMany(mappedBy = "customer",cascade= CascadeType.ALL,orphanRemoval = true)
    Set<ApplicationUser> users;

    @JsonIgnore
    @OneToMany(mappedBy = "customer",cascade= CascadeType.ALL,orphanRemoval = true)
    Set<Requirement> requirements;
    @JsonIgnore
    @OneToMany(mappedBy = "customer",cascade= CascadeType.ALL,orphanRemoval = true)
    Set<Plant> plant;
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "customer_requirements",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "normativa_id")
    )
    private Set<Normativa> normativasList = new HashSet<>();
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "customer_rubro",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "rubro_id")
    )
    private Set<Rubro> rubroList = new HashSet<>();


    public Customer(){}

    public Set<Rubro> getRubroList() {
        return rubroList;
    }

    public void setRubroList(Set<Rubro> rubroList) {
        this.rubroList = rubroList;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
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

    public Set<ApplicationUser> getUsers() {
        return users;
    }

    public void setUsers(Set<ApplicationUser> users) {
        this.users = users;
    }



    public Set<Requirement> getRequirements() {
        return requirements;
    }

    public void setRequirements(Set<Requirement> requirements) {
        this.requirements = requirements;
    }

    public Set<Plant> getPlant() {
        return plant;
    }

    public void setPlant(Set<Plant> plant) {
        this.plant = plant;
    }

    public Set<Normativa> getNormativasList() {
        return normativasList;
    }

    public void setNormativasList(Set<Normativa> normativasList) {
        this.normativasList = normativasList;
    }
}
