package com.plancton.services;

import com.plancton.models.Requirement;
import com.plancton.models.Rubro;
import com.plancton.repositories.RequirementRepository;
import com.plancton.repositories.RubroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RubroService {
    RubroRepository rubroRepo;
    @Autowired
    public RubroService(RubroRepository rubroRepo){
        this.rubroRepo=rubroRepo;
    }

    public Rubro registerRubro(Rubro object) {
        try{
            return rubroRepo.save(object);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public List<Rubro> getAll(){
        return  rubroRepo.findAll();
    }

    public Rubro getById(Integer id){
        return  rubroRepo.getById(id);
    }

    public Optional<Rubro> updateRubro(Integer id, Rubro newRubro) {
        return rubroRepo.findById(id)
                .map(rubro -> {
                    rubro.setRubro(newRubro.getRubro());



                    return rubroRepo.save(rubro);
                });
    }

    public void deleteById(Integer id){
        rubroRepo.deleteById(id);
    }

    public Rubro updateCustomer(Rubro rubro){
        try{
            return rubroRepo.save(rubro);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }


}
