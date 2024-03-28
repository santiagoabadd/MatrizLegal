package com.plancton.services;

import com.plancton.models.Category;
import com.plancton.models.Normativa;
import com.plancton.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    CategoryRepository categoryRepo;
    @Autowired
    public CategoryService(CategoryRepository categoryRepo){
        this.categoryRepo=categoryRepo;
    }

    public Category registerCategory(Category object) {
        try{
            return categoryRepo.save(object);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    public void deleteById(Integer id){
        categoryRepo.deleteById(id);
    }
    public Category getById(Integer id){
        return  categoryRepo.getById(id);
    }

    public List<Category> getByTipo(String tipo) {
        return categoryRepo.findByTipo(tipo);
    }

    public List<Category> getAll(){
        return  categoryRepo.findAll();
    }


}
