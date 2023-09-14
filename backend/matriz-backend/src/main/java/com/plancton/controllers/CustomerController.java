package com.plancton.controllers;


import com.plancton.models.Customer;
import com.plancton.models.Customer;
import com.plancton.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class CustomerController {

    @Autowired
    private CustomerRepository repo;

    @GetMapping("/customer")
    public List<Customer> listCustomers(){


        return repo.findAll();

    }

    @GetMapping("/customer/{id}")
    Optional<Customer> getCustomerById(@PathVariable Integer id){
        return repo.findById(id);
    }

    @PutMapping ("/customer/{id}")
    Optional<Customer> updateCustomer(@RequestBody Customer newCustomer,@PathVariable Integer id){
        return repo.findById(id)
                .map(customer -> {
                    customer.setCompany(newCustomer.getCompany());
                    customer.setEnabled(newCustomer.isEnabled());

                    customer.getUsers().clear();
                    customer.getUsers().addAll(newCustomer.getUsers());

                    customer.getPlant().clear();
                    customer.getPlant().addAll(newCustomer.getPlant());

                    customer.getRequirements().clear();
                    customer.getRequirements().addAll(newCustomer.getRequirements());

                    customer.getNormativasList().clear();
                    customer.getNormativasList().addAll(newCustomer.getNormativasList());

                    customer.getRubroList().clear();
                    customer.getRubroList().addAll(newCustomer.getRubroList());

                    return repo.save(customer);
                });
    }

    @DeleteMapping("/customer/{id}")
    String deleteCustomer(@PathVariable Integer id){
        if(!repo.existsById(id)){

        }
        repo.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }


    @PostMapping("/customer")
    public Customer registerCustomer(@RequestBody Customer Customer){

        return repo.save(Customer);
    }



}