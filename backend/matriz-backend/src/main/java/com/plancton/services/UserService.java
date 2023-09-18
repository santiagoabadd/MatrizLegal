package com.plancton.services;


import com.plancton.exceptions.EmailAlreadyTakenException;
import com.plancton.exceptions.EmailFailedToSendException;
import com.plancton.exceptions.IncorrectVerificationCodeException;
import com.plancton.exceptions.UserDoesNotExistException;
import com.plancton.models.ApplicationUser;
import com.plancton.models.RegistrationObject;
import com.plancton.models.Role;
import com.plancton.repositories.RoleRepository;
import com.plancton.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;

    private final MailService mailService;

    @Autowired

    public UserService(UserRepository userRepo,RoleRepository roleRepo,MailService mailService){
        this.userRepo=userRepo;
        this.roleRepo=roleRepo;
        this.mailService=mailService;
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
        user.setPhone(ro.getPhone());
        user.setPassword(ro.getPassword());

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

        Set<Role> roles=user.getAuthorities();
        roles.add(roleRepo.findByAuthority("USER").get());
        user.setAuthorities(roles);

        try{
            return userRepo.save(user);
        }catch (Exception e){
            throw new EmailAlreadyTakenException();
        }

    }

    public void generateEmailVerification(String username){
        ApplicationUser user=userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        user.setVerification(generateVerificationNumber());

        try{
            mailService.sendEmail(user.getEmail(),"Your verification code","Here is your verification code: "+ user.getVerification());
        }catch(Exception e){
            throw new EmailFailedToSendException();
        }

        userRepo.save(user);
    }

    private Long generateVerificationNumber(){

        return (long) Math.floor(Math.random()*100_000_000);

    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser u = userRepo.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));

        Set<GrantedAuthority> authorities =u.getAuthorities()
                .stream()
                .map(role->new SimpleGrantedAuthority(role.getAuthority()))
                .collect(Collectors.toSet());
        UserDetails ud=new User(u.getUsername(),u.getPassword(),authorities);

        return ud;
    }
    public ApplicationUser verifyEmail(String username,Long code){
        ApplicationUser user=userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        if(code.equals(user.getVerification())){
            user.setEnabled(true);
            user.setVerification(null);
            return userRepo.save(user);
        }else{
            throw new IncorrectVerificationCodeException();
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
