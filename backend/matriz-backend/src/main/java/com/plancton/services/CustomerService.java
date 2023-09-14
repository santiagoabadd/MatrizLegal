package com.plancton.services;

import com.plancton.models.Category;
import com.plancton.models.Customer;
import com.plancton.models.Requirement;
import com.plancton.repositories.CategoryRepository;
import com.plancton.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    CustomerRepository customerRepo;
    @Autowired
    public CustomerService(CustomerRepository customerRepo){
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
    public void deleteById(Integer id){
        customerRepo.deleteById(id);
    }
    public Customer getById(Integer id){
        return  customerRepo.getById(id);
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
