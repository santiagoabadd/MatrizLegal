package com.plancton.services;

import com.plancton.models.Normativa;
import com.plancton.repositories.NormativaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NormativaService {
    NormativaRepository normativaRepo;
    @Autowired
    public  NormativaService(NormativaRepository normativaRepo){
        this.normativaRepo=normativaRepo;
    }

    public Normativa registerNormativa(Normativa object) {
        try{
            return normativaRepo.save(object);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public List<Normativa> findNormativasByPartialFields(
            String partialNorma, String partialTitle, String partialCategoria,String partialAuthority,
            String partialOrganismo, String partialJurisdiccion, Boolean partialCurrent) {
        return normativaRepo.findNormativasByPartialFields(
                partialNorma, partialTitle, partialCategoria,partialAuthority,
                partialOrganismo, partialJurisdiccion, partialCurrent);
    }

    public List<Normativa> getAll(){
        return  normativaRepo.findAll();
    }

    public Normativa getById(Long id){
        return  normativaRepo.getById(id);
    }

    public Optional<Normativa> updateNormativa(Long id, Normativa newNormativa) {
        return normativaRepo.findById(id)
                .map(normativa -> {
                    normativa.setNorma(newNormativa.getNorma());
                    normativa.setTitle(newNormativa.getTitle());
                    normativa.setAuthority(newNormativa.getAuthority());
                    normativa.setOrganism(newNormativa.getOrganism());
                    normativa.setJurisdiction(newNormativa.getJurisdiction());
                    normativa.setCurrent(newNormativa.isCurrent());




                    return normativaRepo.save(normativa);
                });
    }

    public Normativa getByNorma(String norma){
        return normativaRepo.findByNorma(norma);
    }

    public void deleteById(Long id){
        normativaRepo.deleteById(id);
    }

    public Normativa updateNormativa(Normativa normativa){
        try{
            return normativaRepo.save(normativa);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }


}