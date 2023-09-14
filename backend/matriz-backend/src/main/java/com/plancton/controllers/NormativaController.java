package com.plancton.controllers;


import com.plancton.models.Category;
import com.plancton.models.Normativa;
import com.plancton.models.NormativaRequest;
import com.plancton.services.CategoryService;
import com.plancton.services.NormativaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class NormativaController {

    @Autowired
    private NormativaService service;

    @Autowired
    private CategoryService serviceCategory;

    @GetMapping("/normativa")
    public List<Normativa> listNormativas(){


        return service.getAll();

    }

    @GetMapping("/normativa/{id}")
    Normativa getNormativaById(@PathVariable Long id){
        return service.getById(id);
    }

    @PutMapping ("/normativa/{id}")
    Optional<Normativa> updateNormativa(@RequestBody Normativa newNormativa,@PathVariable Long id) {
        return service.updateNormativa(id, newNormativa);
    }

    @DeleteMapping("/normativa/{id}")
    String deleteNormativa(@PathVariable Long id){

        service.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }


    @PostMapping("/normativa")
    public Normativa registerNormativa(@RequestBody NormativaRequest normativaRequest){

        String norma=normativaRequest.getNorma();
        String title=normativaRequest.getTitle();
        String authority=normativaRequest.getAuthority();
        String organism=normativaRequest.getOrganism();
        String jurisdiction=normativaRequest.getJurisdiction();
        Boolean current=normativaRequest.isCurrent();

        Category category=serviceCategory.getById(normativaRequest.getCategoryId());

        System.out.println(category);


        Normativa newNormativa=new Normativa(norma,title,authority,organism,jurisdiction,current,category);

        System.out.println(newNormativa);

        return service.registerNormativa(newNormativa);
    }



}