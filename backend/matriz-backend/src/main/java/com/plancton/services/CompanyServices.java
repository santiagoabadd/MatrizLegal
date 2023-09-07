package com.plancton.services;


import com.plancton.exceptions.EmailAlreadyTakenException;
import com.plancton.models.ApplicationUser;
import com.plancton.models.Customer;
import com.plancton.models.RegistrationObject;
import com.plancton.models.Role;
import com.plancton.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class CompanyServices {

    CustomerRepository customerRepo;
    @Autowired
    public  CompanyServices(CustomerRepository customerRepo){
        this.customerRepo=customerRepo;
    }

    public Customer registerCustomer(Customer object) {
        try{
            return customerRepo.save(object);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

   public List<Customer> getAll(){
      return  customerRepo.findAll();
   }

   public Customer updateCustomer(Customer customer){
        try{
           return customerRepo.save(customer);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
   }



    }

