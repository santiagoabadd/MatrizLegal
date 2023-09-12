package com.plancton.controllers;


import com.plancton.models.Action;
import com.plancton.repositories.ActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ActionController {

    @Autowired
    private ActionRepository repo;

    @GetMapping("/action")
    public List<Action> listActions(){


        return repo.findAll();

    }


    @PostMapping("/action")
    public Action registerAction(@RequestBody Action Action){

        return repo.save(Action);
    }



}