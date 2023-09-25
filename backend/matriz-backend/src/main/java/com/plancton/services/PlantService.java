package com.plancton.services;

import com.plancton.models.Customer;
import com.plancton.models.Plant;
import com.plancton.models.Requirement;
import com.plancton.repositories.PlantRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

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

    public Plant getById(Integer id){
        return  plantRepo.getById(id);
    }


    public void deleteById(Integer id){

            plantRepo.deleteById(id);

    }

    public List<Plant> getPlantsByCustomer(Customer customer){
        return plantRepo.getByCustomer(customer);
    }
    public Optional<Plant> updatePlant(Integer id, Plant newPlant) {
        return plantRepo.findById(id)
                .map(plant -> {
                            plant.setActive(newPlant.isActive());
                            plant.setDescription(newPlant.getDescription());
                            plant.setEstado(newPlant.getEstado());
                            plant.setName(newPlant.getName());
                            plant.setFechaAlta(newPlant.getFechaAlta());
                            plant.setJurisdiction(newPlant.getJurisdiction());

                            plant.setCustomer(newPlant.getCustomer());





                            return plantRepo.save(plant);
                });
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
