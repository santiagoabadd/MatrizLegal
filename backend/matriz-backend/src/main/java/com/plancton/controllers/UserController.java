package com.plancton.controllers;


import com.plancton.models.*;
import com.plancton.repositories.UserRepository;
import com.plancton.services.TokenService;
import com.plancton.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService service;
    @Autowired
    TokenService tokenService;




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
    public List<ApplicationUser> listRubros(@RequestHeader("Authorization") String token){


        Customer customer=service.getUserByUsername(tokenService.getUsernameFromToken(token)).getCustomer();
        return service.getByCystomer(customer);

    }

    @GetMapping("/user/{id}")
    Optional<ApplicationUser> getUserByEmail(@PathVariable String id){

        return service.getUserByEmail(id);
    }

    @GetMapping("/viewUserRole")
    public boolean viewUserRole(@RequestHeader("Authorization") String token){
    boolean response=false;
        ApplicationUser applicationUser=service.getUserByUsername(tokenService.getUsernameFromToken(token));
        Set<Role> roles = applicationUser.getRoles();
        for (Role role : roles) {
            if (role.getAuthority().equals("ADMIN")) {
                response =true;
            }
        }


       return response;

    }


}

