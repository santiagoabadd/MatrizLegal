package com.plancton.controllers;


import com.plancton.models.Plant;
import com.plancton.repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlantController {

    @Autowired
    private PlantRepository repo;

    @GetMapping("/plant")
    public List<Plant> listPlants(){


        return repo.findAll();

    }


    @PostMapping("/plant")
    public Plant registerPlant(@RequestBody Plant Plant){

        return repo.save(Plant);
    }



}