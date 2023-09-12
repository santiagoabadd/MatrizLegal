package com.plancton.controllers;


import com.plancton.models.Customer;
import com.plancton.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CustomerController {

    @Autowired
    private CustomerRepository repo;

    @GetMapping("/customer")
    public List<Customer> listCustomers(){


        return repo.findAll();

    }


    @PostMapping("/customer")
    public Customer registerCustomer(@RequestBody Customer Customer){

        return repo.save(Customer);
    }



}