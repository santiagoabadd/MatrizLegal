package com.plancton.services;

import com.plancton.models.Category;
import com.plancton.models.Customer;
import com.plancton.models.Plant;
import com.plancton.models.Requirement;
import com.plancton.repositories.CustomerRepository;
import com.plancton.repositories.RequirementRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RequirementService {
    RequirementRepository requirementRepo;
    @Autowired
    public  RequirementService(RequirementRepository requirementRepo){
        this.requirementRepo=requirementRepo;
    }

    @PersistenceContext
    private EntityManager entityManager;
    public Requirement registerRequirement(Requirement object) {
        try{
            return requirementRepo.save(object);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }



    public List<Requirement> getAll() {

            List<Requirement> lista = requirementRepo.findAll();

        for (Requirement requirement : lista) {
            Hibernate.initialize(requirement.getPlant());
            Hibernate.initialize(requirement.getCategory());
        }

        return lista;

    }



    public Requirement getById(Integer id){
        return  requirementRepo.getById(id);
    }

    public List<Requirement> getRequirementsByCustomer(Customer customer){


        List<Requirement> lista = requirementRepo.getByCustomer(customer);

        for (Requirement requirement : lista) {
            Hibernate.initialize(requirement.getPlant());
            Hibernate.initialize(requirement.getCategory());
        }

        return lista;

    }

    public List<Requirement> getRequirementsByCategory(Category category,Customer customer){
        return requirementRepo.getByCustomerAndCategory(customer,category);
    }

    public List<Object[]> getNumberOfRequirementPerCategory(){
        return requirementRepo.countRequirementsByCategory();
    }

    public List<Object[]> getNumberOfCompliance(){
        return requirementRepo.countRequirementsByCompliance();
    }

    public List<Object[]> getNumberOfState(){
        return requirementRepo.countRequirementsByState();
    }

    public List<Object[]> getNumberOfRequirementPerType(){
        return requirementRepo.countRequirementsByType();
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
