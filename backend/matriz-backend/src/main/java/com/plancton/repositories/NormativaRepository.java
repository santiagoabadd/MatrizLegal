package com.plancton.repositories;


import com.plancton.models.ApplicationUser;
import com.plancton.models.Normativa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NormativaRepository extends JpaRepository<Normativa,Long> {

    Normativa findByNorma(String norma);

	
}
