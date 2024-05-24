package com.plancton.services;

import com.plancton.models.*;
import com.plancton.repositories.CustomerRepository;
import com.plancton.repositories.PlantRepository;
import com.plancton.repositories.RequirementRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RequirementService {
    RequirementRepository requirementRepo;
    @Autowired
    PlantRepository plantRepository;
    @Autowired
    CustomerRepository customerRepo;
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
        Requirement newRequirement=requirementRepo.getById(id);
        Set<Action> actions = newRequirement.getActions();
        if (actions != null && !actions.isEmpty()) {

            Action lastAction = actions.stream().reduce((first, second) -> second).orElse(null);
            if (lastAction != null) {
                newRequirement.setLastActionReviewer(lastAction.getResponsable());
                newRequirement.setLastReview(lastAction.getFechaLimite().toString());
            }
            this.updateRequirement(newRequirement.getRequirementId(),newRequirement);
        }
        return  newRequirement;
    }

    public void copyRequirementsToNewClient(int clientId,int plantId) {
        List<Requirement> originalRequirements = requirementRepo.findAllWithPlantAndCategoryDefault();
        List<Requirement> copiedRequirements = new ArrayList<>();
        for (Requirement originalRequirement : originalRequirements) {
            Requirement copiedRequirement = new Requirement();
            copiedRequirement.setLastReview("No evaluado");
            copiedRequirement.setLastActionReviewer("No evaluado");
            copiedRequirement.setCompliance(originalRequirement.getCompliance());
            copiedRequirement.setRequirement(originalRequirement.getRequirement());
            copiedRequirement.setActualState(originalRequirement.getActualState());
            copiedRequirement.setRelevance(originalRequirement.getRelevance());
            copiedRequirement.setTitle(originalRequirement.getTitle());
            copiedRequirement.setType(originalRequirement.getType());
            copiedRequirement.setPlant(plantRepository.getById(plantId));
            copiedRequirement.setCategory(originalRequirement.getCategory());
            copiedRequirements.add(copiedRequirement);
        }

        Optional<Customer> optionalNewClient = customerRepo.findById(clientId);
        if (optionalNewClient.isPresent()) {
            Customer newClient = optionalNewClient.get();
            for (Requirement copiedRequirement : copiedRequirements) {
                copiedRequirement.setCustomer(newClient);
                registerRequirement(copiedRequirement);
            }
        } else {
            throw new IllegalArgumentException("Cliente no encontrado con ID: " + clientId);
        }
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

    public boolean hasExpiredActionByCategory(Category category,Customer customer){
        return requirementRepo.hasExpiredActionByCategoryAndCustomer(category,customer);
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
                    requirement.setLastActionReviewer(newRequirement.getLastActionReviewer());


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
