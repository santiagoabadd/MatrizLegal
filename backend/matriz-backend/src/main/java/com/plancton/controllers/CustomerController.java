package com.plancton.controllers;


import com.plancton.models.*;
import com.plancton.models.Customer;
import com.plancton.repositories.CustomerRepository;
import com.plancton.services.CustomerService;
import com.plancton.services.RubroService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @Autowired
    private RubroService serviceRubro;

    @GetMapping("/customer")
    public List<Customer> listCustomers(){


        return service.getAll();

    }

    @GetMapping("/customer/{id}")
    @Transactional
    Customer getCustomerById(@PathVariable Integer id){
        return service.getById(id);
    }

    @PutMapping ("/customer/{id}")
    Optional<Customer> updateCustomer(@RequestBody Customer newCustomer,@PathVariable Integer id){
        return service.updateCustomer(newCustomer,id);
    }

    @DeleteMapping("/customer/{id}")
    String deleteCustomer(@PathVariable Integer id){

        service.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }




    @PostMapping("/customer")
    public Customer registerCustomer(@RequestBody CustomerRequest customerRequest){

        String company=customerRequest.getCompany();
        Boolean enabled=customerRequest.isEnabled();

        Customer newCustomer=new Customer(company,enabled);

        Integer []rubroIds=customerRequest.getRubroIds();
        Set<Rubro> rubros=newCustomer.getRubroList();

        for (int id: rubroIds) {

            rubros.add(serviceRubro.getById(id));
        }


        newCustomer.setRubroList(rubros);

        return service.registerCustomer(newCustomer);
    }



}