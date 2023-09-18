package com.plancton.repositories;

import com.plancton.models.Category;
import com.plancton.models.Rubro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RubroRepository extends JpaRepository<Rubro,Integer>{


}
