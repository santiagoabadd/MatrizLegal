package com.plancton.services.imp;


import com.plancton.services.GenericService;
import com.plancton.models.Normativa;
import com.plancton.repositories.NormativaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NormaServiceImp implements GenericService<Normativa> {

    @Autowired
    private NormativaRepository repo;



    @Override
    public List<Normativa> getAll() {

        return (List<Normativa>) repo.findAll();
    }

    @Override
    public boolean add(Normativa b) {
        repo.save(b);
        return true;
    }

    @Override
    public Normativa getById(long id) {

        return repo.findById(id).orElse(null);
    }

    @Override
    public boolean delete(long id) {
        repo.deleteById(id);
        return true;
    }

    @Override
    public Normativa modify(Normativa object) {
        return repo.save(object);
    }

}