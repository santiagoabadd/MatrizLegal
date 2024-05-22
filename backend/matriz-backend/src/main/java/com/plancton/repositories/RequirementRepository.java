package com.plancton.repositories;

import com.plancton.models.Category;
import com.plancton.models.Customer;
import com.plancton.models.Plant;
import com.plancton.models.Requirement;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequirementRepository extends JpaRepository<Requirement,Integer>{

    @Query("SELECT DISTINCT r FROM Requirement r " +
            "LEFT JOIN FETCH r.category " +
            "LEFT JOIN FETCH r.plant " +
            "WHERE r.customer = :customer")
    List<Requirement> getByCustomer(@Param("customer") Customer customer);

    @Query("SELECT DISTINCT c FROM Requirement c JOIN c.customer cust JOIN c.category cat WHERE cust = :customer AND cat = :category")
    List<Requirement> getByCustomerAndCategory(@Param("customer") Customer customer, @Param("category") Category category);

    @Query("SELECT c.category.tipo, COUNT(c) FROM Requirement c GROUP BY c.category.tipo")
    List<Object[]> countRequirementsByCategory();

    @Query("SELECT r FROM Requirement r JOIN FETCH r.plant JOIN FETCH r.category")
    List<Requirement> findAllWithPlantAndCategory();

    @Query("SELECT c.actualState, COUNT(c) FROM Requirement c GROUP BY c.actualState")
    List<Object[]> countRequirementsByState();

    @Query("SELECT r FROM Requirement r " +
            "LEFT JOIN FETCH r.category " +
            "LEFT JOIN FETCH r.plant")
    List<Requirement> findAllWithCategoryAndPlant();
    @Query("SELECT c.compliance, COUNT(c) FROM Requirement c GROUP BY c.compliance")
    List<Object[]> countRequirementsByCompliance();

    @Query("SELECT c.type, COUNT(c) FROM Requirement c GROUP BY c.type")
    List<Object[]> countRequirementsByType();

}
