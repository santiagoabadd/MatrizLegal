package com.plancton.models;


import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="customers")
public class Customer {
    @Id
    @Column(name="customer_id")
    private Integer customerId;
    @Column(name = "company")
    private String company;
    private boolean enabled;

    @OneToMany(mappedBy = "customer",cascade= CascadeType.ALL,orphanRemoval = true)
    Set<ApplicationUser> users;

    @OneToMany(mappedBy = "customer",cascade= CascadeType.ALL,orphanRemoval = true)
    Set<Requirement> requirements;

    @OneToMany(mappedBy = "customer",cascade= CascadeType.ALL,orphanRemoval = true)
    Set<Plant> plant;


    public Customer() {
        this.users = new HashSet<>();
        this.enabled=false;
    }
}
