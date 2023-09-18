package com.plancton.controllers;


import com.plancton.models.Role;
import com.plancton.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class RoleController {
    @Autowired
    private RoleRepository service;
    @PostMapping("/role")
    public Role registerCategory(){
        Role role=new Role(2,"ADMIN");
        return service.save(role);
    }

    @GetMapping("/role")
    public List<Role> listRubros(){


        return service.findAll();

    }
}
