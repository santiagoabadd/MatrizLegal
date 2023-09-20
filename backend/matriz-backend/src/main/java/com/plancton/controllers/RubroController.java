package com.plancton.controllers;


import com.plancton.models.Customer;
import com.plancton.models.Rubro;
import com.plancton.services.CustomerService;
import com.plancton.services.RubroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class RubroController {

    @Autowired
    private RubroService service;

    @Autowired
    private CustomerService customerService;

    @GetMapping("/rubro")
    public List<Rubro> listRubros(){


        return service.getAll();

    }

    @GetMapping("/rubro/{id}")
    Rubro getRubroById(@PathVariable Integer id){
        return service.getById(id);
    }

    @PutMapping ("/rubro/{id}")
    Optional<Rubro> updateRubro(@RequestBody Rubro newRubro,@PathVariable Integer id){
        return service.updateRubro(id,newRubro);
    }

    @DeleteMapping("/rubro/{id}")
    String deleteRubro(@PathVariable Integer id){

        service.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }

    @PostMapping("/rubro")
    public Rubro registerRubro(@RequestBody Rubro rubro){





        return service.registerRubro(rubro);
    }



}