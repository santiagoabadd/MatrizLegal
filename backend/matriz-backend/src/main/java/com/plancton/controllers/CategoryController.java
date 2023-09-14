package com.plancton.controllers;


import com.plancton.models.Category;
import com.plancton.models.Plant;
import com.plancton.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class CategoryController {

    @Autowired
    private CategoryRepository repo;

    @GetMapping("/category")
    public List<Category> listCategorys(){


        return repo.findAll();

    }

    @GetMapping("/category/{id}")
    Optional<Category> getCategoryById(@PathVariable Integer id){
        return repo.findById(id);
    }

    @PutMapping ("/category/{id}")
    Optional<Category> updateCategory(@RequestBody Category newCategory,@PathVariable Integer id){
        return repo.findById(id)
                .map(category -> {
                    category.setCategory(newCategory.getCategory());

                    category.getNormativasC().clear();
                    category.getNormativasC().addAll(newCategory.getNormativasC());

                    category.getRequirements().clear();
                    category.getRequirements().addAll(newCategory.getRequirements());



                    return repo.save(category);
                });
    }

    @DeleteMapping("/category/{id}")
    String deleteCategory(@PathVariable Integer id){
        if(!repo.existsById(id)){

        }
        repo.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }


    @PostMapping("/category")
    public Category registerCategory(@RequestBody Category Category){

        return repo.save(Category);
    }



}