package com.plancton.repositories;


import com.plancton.models.ApplicationUser;
import com.plancton.models.Normativa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NormativaRepository extends JpaRepository<Normativa,Long> {

    Normativa findByNorma(String norma);

    @Query("SELECT DISTINCT n FROM Normativa n " +
            "LEFT JOIN FETCH n.categories c " +
            "WHERE (:partialNorma IS NULL OR n.norma LIKE %:partialNorma%) " +
            "AND (:partialTitle IS NULL OR n.title LIKE %:partialTitle%) " +
            "AND (:partialCategoria IS NULL OR c.category LIKE %:partialCategoria%) " +
            "AND (:partialAuthority IS NULL OR c.category LIKE %:partialAuthority%) " +
            "AND (:partialOrganismo IS NULL OR n.organism LIKE %:partialOrganismo%) " +
            "AND (:partialJurisdiccion IS NULL OR n.jurisdiction LIKE %:partialJurisdiccion%) " +
            "AND (:partialCurrent IS NULL OR n.current = :partialCurrent)")
    List<Normativa> findNormativasByPartialFields(
            @Param("partialNorma") String partialNorma,
            @Param("partialTitle") String partialTitle,
            @Param("partialCategoria") String partialCategoria,
            @Param("partialAuthority") String partialAuthority,
            @Param("partialOrganismo") String partialOrganismo,
            @Param("partialJurisdiccion") String partialJurisdiccion,
            @Param("partialCurrent") Boolean partialCurrent);


	
}
