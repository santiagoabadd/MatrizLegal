package com.plancton.controllers;


import com.plancton.models.Action;
import com.plancton.models.Category;
import com.plancton.models.Requirement;
import com.plancton.repositories.ActionRepository;
import com.plancton.repositories.RequirementRepository;
import com.plancton.services.ActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class ActionController {

    @Autowired
    private ActionRepository repo;

    @Autowired
    private RequirementRepository requirementRepository;

    @Autowired
    private ActionService service;

    @GetMapping("/action")
    public List<Action> listActions(){


        return repo.findAll();

    }

    @GetMapping("/action/requirement/{id}")
    public List<Action> listActions(@PathVariable Integer id){

        Requirement requirement=requirementRepository.getById(id);



        return new ArrayList<>(requirement.getActions());

    }

    @GetMapping("/action/expired")
    public List<Action> listActionsBeforeNow(){


        return service.getActionsBeforeToday();

    }

    @GetMapping("/action/actionInfoCount")
    public List<Object[]> actionInfoCount(@RequestHeader("Authorization") String token){
        return service.getActionsCount();
    }

    @GetMapping("/action/close")
    public List<Action> listActionsCloseToExpire(){


        return service.getActionsWithinNextThreeMonths();

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
            return null;
        }
    }


    @PostMapping("/action")
    public Action registerAction(@RequestBody Action Action){

        return repo.save(Action);
    }



}