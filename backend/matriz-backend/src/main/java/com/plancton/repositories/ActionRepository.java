package com.plancton.repositories;

import com.plancton.models.Action;
import com.plancton.models.ApplicationUser;
import com.plancton.models.Customer;
import com.plancton.models.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActionRepository extends JpaRepository<Action,Integer> {
    @Query("SELECT DISTINCT c FROM Action c")
    List<Action> getByRequisito(@Param("requisito") Requirement requirement);

    List<Action> findByFechaLimiteBetween(LocalDate currentDate, LocalDate futureDate);
    List<Action> findByFechaLimiteBefore(LocalDate currentDate);

    @Query("SELECT COUNT(c) FROM Action c WHERE c.fechaLimite < :currentDate")
    int countExpiredActions(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT COUNT(c) FROM Action c WHERE c.fechaLimite BETWEEN :currentDate AND :futureDate")
    int findActionsDueInNextTwoMonths(@Param("currentDate") LocalDate currentDate, @Param("futureDate") LocalDate futureDate);

    @Query("SELECT COUNT(c) FROM Action c WHERE c.fechaLimite > :futureDate")
    int findActionsDueAfterTwoMonths(@Param("futureDate") LocalDate futureDate);
}
