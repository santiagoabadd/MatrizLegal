package com.plancton.services;

import com.plancton.models.Customer;
import com.plancton.models.Plant;
import com.plancton.models.Requirement;
import com.plancton.repositories.CustomerRepository;
import com.plancton.repositories.RequirementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Requirement> updateRequirement(Integer id, Requirement newRequirement) {
        return requirementRepo.findById(id)
                .map(requirement -> {
                    requirement.setRequirement(newRequirement.getRequirement());
                    requirement.setPlant(newRequirement.getPlant());
                    requirement.setCategory(newRequirement.getCategory());
                    requirement.setActualState(newRequirement.getActualState());
                    requirement.setCompliance(newRequirement.getCompliance());
                    requirement.setCustomer(newRequirement.getCustomer());
                    requirement.setRelevance(newRequirement.getRelevance());
                    requirement.setTitle(newRequirement.getTitle());
                    requirement.setType(newRequirement.getType());

                    requirement.getActions().clear();
                    requirement.getActions().addAll(newRequirement.getActions());

                    return requirementRepo.save(requirement);
                });
    }

    public void deleteById(Integer id){
        requirementRepo.deleteById(id);
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
