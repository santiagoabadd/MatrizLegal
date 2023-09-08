package com.plancton.repositories;

import com.plancton.models.Action;
import com.plancton.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActionRepository extends JpaRepository<Action,Integer> {

}
