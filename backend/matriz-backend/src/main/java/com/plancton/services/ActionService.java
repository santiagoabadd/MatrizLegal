package com.plancton.services;

import com.plancton.models.Action;
import com.plancton.models.Requirement;
import com.plancton.repositories.ActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
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

    public List<Action> getActionsWithinNextThreeMonths() {
        LocalDate currentDate = LocalDate.now();
        LocalDate futureDate = currentDate.plusMonths(2);

        return actionRepo.findByFechaLimiteBetween(currentDate, futureDate);
    }

    public List<Object[]> getActionsCount(){
        List<Object[]> actionInfoList = new ArrayList<>();

        // Obtener la cantidad de acciones vencidas
        LocalDate currentDate = LocalDate.now();
        int expiredCount = actionRepo.countExpiredActions(currentDate);
        actionInfoList.add(new Object[]{"Expired", expiredCount});

        int nextTwoMonths = actionRepo.findActionsDueInNextTwoMonths(currentDate,currentDate.plusMonths(2));
        actionInfoList.add(new Object[]{"NextTwoMonths", nextTwoMonths});

        int afterNextTwoMonths= actionRepo.findActionsDueAfterTwoMonths(currentDate.plusMonths(2));
        actionInfoList.add(new Object[]{"AfterTwoMonths", afterNextTwoMonths});

        return actionInfoList;

    }
    public List<Action> getActionsBeforeToday() {
        LocalDate currentDate = LocalDate.now();
        return actionRepo.findByFechaLimiteBefore(currentDate);
    }

    public List<Action> getByRequirement(Requirement requirement){
        return actionRepo.getByRequisito(requirement);}

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
