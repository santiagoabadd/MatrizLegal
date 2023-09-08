package com.plancton.repositories;

import com.plancton.models.Action;
import com.plancton.models.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantRepository extends JpaRepository<Plant,Integer> {

}
