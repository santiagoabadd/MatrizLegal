package com.plancton.services;

import com.plancton.models.Action;
import com.plancton.repositories.ActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionService {
    ActionRepository actionRepo;
    @Autowired
    public ActionService(ActionRepository actionRepo){
        this.actionRepo=actionRepo;
    }

    public Action registerAction(Action object) {
        try{
            return actionRepo.save(object);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public List<Action> getAll(){
        return  actionRepo.findAll();
    }
    public void deleteById(Integer id){
        actionRepo.deleteById(id);
    }
    public Action updateAction(Action action){
        try{
            return actionRepo.save(action);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
