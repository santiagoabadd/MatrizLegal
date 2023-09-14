package com.plancton.controllers;


import com.plancton.models.Customer;
import com.plancton.models.Plant;
import com.plancton.models.PlantRequest;
import com.plancton.models.Requirement;
import com.plancton.repositories.PlantRepository;
import com.plancton.services.CustomerService;
import com.plancton.services.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class PlantController {

    @Autowired
    private PlantService service;

    @Autowired
    private CustomerService customerService;

    @GetMapping("/plant")
    public List<Plant> listPlants(){


        return service.getAll();

    }

    @GetMapping("/plant/{id}")
    Plant getPlantById(@PathVariable Integer id){
        return service.getById(id);
    }

    @PutMapping ("/plant/{id}")
    Optional<Plant> updatePlant(@RequestBody Plant newPlant,@PathVariable Integer id){
        return service.updatePlant(id,newPlant);
    }

    @DeleteMapping("/plant/{id}")
    String deletePlant(@PathVariable Integer id){

        service.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }

    @PostMapping("/plant")
    public Plant registerPlant(@RequestBody PlantRequest plantRequest){



        boolean activo=plantRequest.isActive();
        String description=plantRequest.getDescription();
        String estado=plantRequest.getEstado();
        String name=plantRequest.getName();
        LocalDate fechaAlta=plantRequest.getFechaAlta();
        String jurisdiction=plantRequest.getJurisdiction();

        Customer customer=customerService.getById(plantRequest.getCustomerId());

        Plant newPlant=new Plant(name,description,fechaAlta,jurisdiction,activo,estado,customer);

        return service.registerPlant(newPlant);
    }



}