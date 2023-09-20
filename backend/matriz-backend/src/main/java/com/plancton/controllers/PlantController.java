package com.plancton.controllers;


import com.plancton.models.Customer;
import com.plancton.models.Plant;
import com.plancton.models.PlantRequest;
import com.plancton.models.Requirement;
import com.plancton.repositories.PlantRepository;
import com.plancton.services.CustomerService;
import com.plancton.services.PlantService;
import com.plancton.services.TokenService;
import com.plancton.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class PlantController {

    @Autowired
    private PlantService service;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private TokenService tokenService;

    @GetMapping("/plant")
    public List<Plant> listPlants(@RequestHeader("Authorization") String token){

        Customer customer=userService.getUserByUsername(tokenService.getUsernameFromToken(token)).getCustomer();

        return service.getPlantsByCustomer(customer);

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

        service.getById(id).setCustomer(null);


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