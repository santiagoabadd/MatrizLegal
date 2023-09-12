package com.plancton.controllers;


import com.plancton.models.Requirement;
import com.plancton.repositories.RequirementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class RequirementController {

    @Autowired
    private RequirementRepository repo;

    @GetMapping("/requirement")
    public List<Requirement> listRequirements(){


        return repo.findAll();

    }

    @GetMapping("/requirement/{id}")
    Optional<Requirement> getRequiremenById(@PathVariable Integer id){
        return repo.findById(id);
    }

    @PutMapping ("/requirement/{id}")
    Optional<Requirement> updateRequirement(@RequestBody Requirement newRequirement,@PathVariable Integer id){
        return repo.findById(id)
                .map(requirement -> {
            requirement.setRequirement(newRequirement.getRequirement());
            requirement.setActions(newRequirement.getActions());
            requirement.setPlant(newRequirement.getPlant());
            requirement.setCategory(newRequirement.getCategory());
            requirement.setActualState(newRequirement.getActualState());
            requirement.setCompliance(newRequirement.getCompliance());
            requirement.setCustomer(newRequirement.getCustomer());
            requirement.setRelevance(newRequirement.getRelevance());
            requirement.setTitle(newRequirement.getTitle());
            requirement.setType(newRequirement.getType());

            return repo.save(requirement);
        });
    }



    @PostMapping("/requirement")
    public Requirement registerRequirement(@RequestBody Requirement requirement){

        return repo.save(requirement);
    }



}