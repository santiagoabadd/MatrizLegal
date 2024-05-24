package com.plancton.repositories;

import com.plancton.models.ApplicationUser;
import com.plancton.models.Customer;
import com.plancton.models.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser,Integer> {

    @Query("SELECT DISTINCT c FROM ApplicationUser c JOIN c.customer r WHERE r = :customer")
    List<ApplicationUser> getByCustomer(@Param("customer") Customer customer);
    Optional<ApplicationUser> findByUsername(String username);
    Optional<ApplicationUser> findByEmailOrPhoneOrUsername(String email,String phone,String username);

    Optional<ApplicationUser> findByEmail(String email);

}
