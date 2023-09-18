package com.plancton.repositories;

import com.plancton.models.Customer;
import com.plancton.models.Rubro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {
    Optional<Customer> findByCompany(String company);

    @Query("SELECT DISTINCT c FROM Customer c JOIN c.rubroList r WHERE r = :rubro")
    List<Customer> getByRubro(@Param("rubro") Rubro rubro);
}
