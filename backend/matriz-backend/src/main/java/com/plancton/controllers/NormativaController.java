package com.plancton.controllers;


import com.plancton.models.Normativa;
import com.plancton.repositories.NormativaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class NormativaController {

    @Autowired
    private NormativaRepository repo;

    @GetMapping("/normativa")
    public List<Normativa> listNormativas(){


        return repo.findAll();

    }


    @PostMapping("/normativa")
    public Normativa registerNormativa(@RequestBody Normativa Normativa){

        return repo.save(Normativa);
    }



}