package com.plancton.controllers;


import com.plancton.models.Requirement;
import com.plancton.repositories.RequirementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RequirementController {

    @Autowired
    private RequirementRepository repo;

    @GetMapping("/requirement")
    public List<Requirement> listRequirements(){


        return repo.findAll();

    }


    @PostMapping("/requirement")
    public Requirement registerRequirement(@RequestBody Requirement Requirement){

        return repo.save(Requirement);
    }



}