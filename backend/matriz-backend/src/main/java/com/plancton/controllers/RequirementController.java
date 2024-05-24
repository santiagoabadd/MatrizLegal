package com.plancton.controllers;


import com.plancton.models.*;
import com.plancton.repositories.CategoryRepository;
import com.plancton.repositories.CustomerRepository;
import com.plancton.repositories.PlantRepository;
import com.plancton.repositories.RequirementRepository;
import com.plancton.services.*;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class RequirementController {



    @Autowired
    private RequirementService service;
    @Autowired
    private PlantService servicePlant;

    @Autowired
    private CategoryService serviceCategory;

    @Autowired
    TokenService tokenService;
    @Autowired
    private UserService serviceUser;

    @Autowired
    private CustomerService serviceCustomer;

    @GetMapping("/requirement")
    public List<Requirement> listRequirements(@RequestHeader("Authorization") String token){

        Customer customer=serviceUser.getUserByUsername(tokenService.getUsernameFromToken(token)).getCustomer();
        return service.getRequirementsByCustomer(customer);

    }

    @GetMapping("/requirement/category/hea/{id}")boolean hasExpiredAction(@PathVariable Integer id,@RequestHeader("Authorization") String token){

        Customer customer=serviceUser.getUserByUsername(tokenService.getUsernameFromToken(token)).getCustomer();
        Category category1=serviceCategory.getById(id);
        return service.hasExpiredActionByCategory(category1,customer);

    }


    @GetMapping("/requirement/category/{id}")
    public List<Requirement> listRequirementsCategory(@PathVariable Integer id,@RequestHeader("Authorization") String token){

        Customer customer=serviceUser.getUserByUsername(tokenService.getUsernameFromToken(token)).getCustomer();
        Category category1=serviceCategory.getById(id);
        return service.getRequirementsByCategory(category1,customer);

    }

    @GetMapping("/requirement/categoryCount")
    public List<Object[]> requirementPerCategoryCount(@RequestHeader("Authorization") String token){
        return service.getNumberOfRequirementPerCategory();
    }

    @GetMapping("/requirement/complianceCount")
    public List<Object[]> requirementPerCompliance(@RequestHeader("Authorization") String token){
        return service.getNumberOfCompliance();
    }

    @GetMapping("/requirement/stateCount")
    public List<Object[]> requirementPerState(@RequestHeader("Authorization") String token){
        return service.getNumberOfState();
    }

    @GetMapping("/requirement/typeCount")
    public List<Object[]> requirementPerType(@RequestHeader("Authorization") String token){
        return service.getNumberOfRequirementPerType();
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
    public Requirement registerRequirement(@RequestBody RequirementRequest requirementRequest,@RequestHeader("Authorization") String token){

        Plant plant=servicePlant.getById(requirementRequest.getPlantId());
        Category category=serviceCategory.getById(requirementRequest.getCategoryId());


        Customer customer=serviceUser.getUserByUsername(tokenService.getUsernameFromToken(token)).getCustomer();

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