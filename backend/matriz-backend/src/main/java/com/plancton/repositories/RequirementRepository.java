package com.plancton.repositories;

import com.plancton.models.Customer;
import com.plancton.models.Plant;
import com.plancton.models.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequirementRepository extends JpaRepository<Requirement,Integer>{

    @Query("SELECT DISTINCT c FROM Requirement c JOIN c.customer r WHERE r = :customer")
    List<Requirement> getByCustomer(@Param("customer") Customer customer);

}
