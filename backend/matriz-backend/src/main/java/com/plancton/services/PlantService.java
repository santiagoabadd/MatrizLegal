package com.plancton.services;

import com.plancton.models.Plant;
import com.plancton.repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlantService {
    PlantRepository plantRepo;
    @Autowired
    public PlantService(PlantRepository plantRepo){
        this.plantRepo=plantRepo;
    }

    public Plant registerPlant(Plant object) {
        try{
            return plantRepo.save(object);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public List<Plant> getAll(){
        return  plantRepo.findAll();
    }

    public Plant updatePlant(Plant plant){
        try{
            return plantRepo.save(plant);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
