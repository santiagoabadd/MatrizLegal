package com.plancton.controllers;


import com.plancton.models.*;
import com.plancton.repositories.CategoryRepository;
import com.plancton.repositories.CustomerRepository;
import com.plancton.repositories.PlantRepository;
import com.plancton.repositories.RequirementRepository;
import com.plancton.services.CategoryService;
import com.plancton.services.CustomerService;
import com.plancton.services.PlantService;
import com.plancton.services.RequirementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class RequirementController {



    @Autowired
    private RequirementService service;
    @Autowired
    private PlantService servicePlant;
    @Autowired
    private CategoryService serviceCategory;
    @Autowired
    private CustomerService serviceCustomer;

    @GetMapping("/requirement")
    public List<Requirement> listRequirements(){


        return service.getAll();

    }

    @GetMapping("/requirement/{id}")
    Requirement getRequiremenById(@PathVariable Integer id){
        return service.getById(id);
    }

    @PutMapping ("/requirement/{id}")
    Optional<Requirement> updateRequirement(@RequestBody Requirement newRequirement,@PathVariable Integer id){
        return service.updateRequirement(id,newRequirement);
    }

    @DeleteMapping("/requirement/{id}")
    String deleteRequirement(@PathVariable Integer id){
        service.getById(id).setPlant(null);
        service.getById(id).setCustomer(null);
        service.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }



    @PostMapping("/requirement")
    public Requirement registerRequirement(@RequestBody RequirementRequest requirementRequest){

        Plant plant=servicePlant.getById(requirementRequest.getPlantId());
        Category category=serviceCategory.getById(requirementRequest.getCategoryId());
        Customer customer=serviceCustomer.getById(requirementRequest.getCustomerId());

        String requirement=requirementRequest.getRequirement();
        String actualState=requirementRequest.getActualState();
        String compliance=requirementRequest.getCompliance();
        String relevance=requirementRequest.getRelevance();
        String title=requirementRequest.getTitle();
        String type=requirementRequest.getType();

        Requirement newRequirement=new Requirement(title,actualState,requirement,type,compliance,relevance,customer,category,plant);


        return service.registerRequirement(newRequirement);
    }



}