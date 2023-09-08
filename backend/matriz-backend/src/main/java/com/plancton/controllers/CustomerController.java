package com.plancton.controllers;


import com.plancton.models.Customer;
import com.plancton.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
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