package com.plancton.repositories;

import com.plancton.models.Category;
import com.plancton.models.Customer;
import com.plancton.models.Requirement;
import com.plancton.models.Rubro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer>{

    List<Category> findByTipo(String tipo);
}
