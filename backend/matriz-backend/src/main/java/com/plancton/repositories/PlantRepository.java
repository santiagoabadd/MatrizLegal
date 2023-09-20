package com.plancton.repositories;

import com.plancton.models.Action;
import com.plancton.models.Customer;
import com.plancton.models.Plant;
import com.plancton.models.Rubro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantRepository extends JpaRepository<Plant,Integer> {
    @Query("SELECT DISTINCT c FROM Plant c JOIN c.customer r WHERE r = :customer")
    List<Plant> getByCustomer(@Param("customer") Customer customer);
}
