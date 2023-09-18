package com.plancton.services;


import com.plancton.exceptions.EmailAlreadyTakenException;
import com.plancton.exceptions.UserDoesNotExistException;
import com.plancton.models.ApplicationUser;
import com.plancton.models.RegistrationObject;
import com.plancton.models.Role;
import com.plancton.repositories.RoleRepository;
import com.plancton.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;

    @Autowired

    public UserService(UserRepository userRepo,RoleRepository roleRepo){
        this.userRepo=userRepo;
        this.roleRepo=roleRepo;
    }

    public ApplicationUser getUserByUsername(String username){
        return userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
    }

    public ApplicationUser updateUser(ApplicationUser user){
        try{
            return userRepo.save(user);
        }catch (Exception e){
            throw new EmailAlreadyTakenException();
        }
    }
    public ApplicationUser registerUser(RegistrationObject ro){

        ApplicationUser user= new ApplicationUser();
        user.setFirstName(ro.getFirstName());
        user.setLastName(ro.getLastName());
        user.setEmail(ro.getEmail());
        user.setPassword(ro.getPassword());
        user.setPhone(ro.getPhone());
        user.setVerification(1L);

        String name= user.getFirstName()+user.getLastName();

        boolean nameTaken=true;
        String tempName="";
        while(nameTaken){
            tempName=generateUsername(name);

            if(userRepo.findByUsername(tempName).isEmpty()){
                nameTaken=false;
            }
        }

        user.setUsername(tempName);
        System.out.println(ro.getAuthoritie().toUpperCase());
        Set<Role> roles=user.getRoles();
        roles.add(roleRepo.findByAuthority(ro.getAuthoritie().toUpperCase()).get());
        user.setAuthorities(roles);

        Set<Role> categories = user.getRoles();
        for (Role category : categories) {
            System.out.println(category.getUserAsString());
        }

        try{
            return userRepo.save(user);
        }catch (Exception e){
            throw new EmailAlreadyTakenException();
        }

    }

    public List<ApplicationUser> getAll(){
        return userRepo.findAll();
    }

    private String generateUsername(String name){
        long generatedNumber=(long) Math.floor(Math.random()*1_000_000_000);
        return name+generatedNumber;
    }
}
