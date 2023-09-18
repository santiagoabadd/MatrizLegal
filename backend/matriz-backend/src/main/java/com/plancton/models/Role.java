package com.plancton.models;

import jakarta.persistence.*;
import org.apache.catalina.User;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

@Entity
@Table(name="roles")
public class Role  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="role_id")
    private Integer roleId;

    private String authority;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "authorities")
    private Set<ApplicationUser> users;

    public Role() {
        super();
    }

    public Role(Integer roleId, String authority) {
        this.roleId = roleId;
        this.authority = authority;
    }

    public String getUserAsString() {
        return "Category ID: " + roleId + ", Category Name: " + authority;
    }
    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }


    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
