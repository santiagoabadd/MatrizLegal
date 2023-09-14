package com.plancton.controllers;


import com.plancton.models.Action;
import com.plancton.models.Category;
import com.plancton.models.Requirement;
import com.plancton.repositories.ActionRepository;
import com.plancton.repositories.RequirementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class ActionController {

    @Autowired
    private ActionRepository repo;

    @Autowired
    private RequirementRepository requirementRepository;

    @GetMapping("/action")
    public List<Action> listActions(){


        return repo.findAll();

    }

    @GetMapping("/action/{id}")
    Optional<Action> getActionById(@PathVariable Integer id){
        return repo.findById(id);
    }

    @PutMapping ("/action/{id}")
    Optional<Action> updateAction(@RequestBody Action newAction,@PathVariable Integer id){
        return repo.findById(id)
                .map(action -> {
                    action.setTitle(newAction.getTitle());
                    action.setDescription(newAction.getDescription());
                    action.setFechaLimite(newAction.getFechaLimite());
                    action.setAvance(newAction.getAvance());
                    action.setResponsable(newAction.getResponsable());
                    action.setEstado(newAction.getEstado());

                    action.setRequirement(newAction.getRequirement());



                    return repo.save(action);
                });
    }

    @DeleteMapping("/action/{id}")
    String deleteAction(@PathVariable Integer id){
        if(!repo.existsById(id)){

        }
        repo.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }



    @PostMapping("/requirement/{id}/addAction")
    public Requirement addActionToRequirement(@RequestBody Action action, @PathVariable Integer id) {
        Optional<Requirement> optionalRequirement = requirementRepository.findById(id);
        if (optionalRequirement.isPresent()) {
            Requirement requirement = optionalRequirement.get();
            action.setRequirement(requirement);
            requirement.getActions().add(action);
            requirementRepository.save(requirement);
            return requirement;
        } else {
            // Manejar el caso en el que no se encuentra el requisito
            return null;
        }
    }


    @PostMapping("/action")
    public Action registerAction(@RequestBody Action Action){

        return repo.save(Action);
    }



}