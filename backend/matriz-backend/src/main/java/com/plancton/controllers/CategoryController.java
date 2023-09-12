package com.plancton.controllers;


import com.plancton.models.Category;
import com.plancton.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CategoryController {

    @Autowired
    private CategoryRepository repo;

    @GetMapping("/category")
    public List<Category> listCategorys(){


        return repo.findAll();

    }


    @PostMapping("/category")
    public Category registerCategory(@RequestBody Category Category){

        return repo.save(Category);
    }



}