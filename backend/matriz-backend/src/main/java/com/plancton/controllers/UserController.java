package com.plancton.controllers;


import com.plancton.models.*;
import com.plancton.repositories.UserRepository;
import com.plancton.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserService service;






    @Autowired
    private UserRepository Rservice;
    @PostMapping("/user")
    public ApplicationUser registerCategory(@RequestBody RegistrationObject registrationObject){
        System.out.println(registrationObject.toString());
        return service.registerUser(registrationObject);
    }

    @PostMapping("/users")
    public ApplicationUser registerCategory(ApplicationUser user){

        return Rservice.save(user);
    }

    @GetMapping("/user")
    public List<ApplicationUser> listRubros(){


        return service.getAll();

    }


}

