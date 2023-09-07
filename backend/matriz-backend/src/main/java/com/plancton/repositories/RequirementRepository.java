package com.plancton.repositories;

import com.plancton.models.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RequirementRepository extends JpaRepository<Requirement,Integer>{
    Optional<Requirement> findByTitle(String title);

}
