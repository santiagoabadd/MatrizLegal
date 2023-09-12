package com.plancton.services;

import com.plancton.models.Customer;
import com.plancton.models.Requirement;
import com.plancton.repositories.CustomerRepository;
import com.plancton.repositories.RequirementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequirementService {
    RequirementRepository requirementRepo;
    @Autowired
    public  RequirementService(RequirementRepository requirementRepo){
        this.requirementRepo=requirementRepo;
    }

    public Requirement registerRequirement(Requirement object) {
        try{
            return requirementRepo.save(object);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public List<Requirement> getAll(){
        return  requirementRepo.findAll();
    }

    public Requirement getById(Integer id){
        return  requirementRepo.getById(id);
    }

    public Requirement updateCustomer(Requirement requirement){
        try{
            return requirementRepo.save(requirement);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
