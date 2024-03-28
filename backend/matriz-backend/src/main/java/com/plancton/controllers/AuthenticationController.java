package com.plancton.controllers;

import com.plancton.dto.FindUsernameDTO;
import com.plancton.exceptions.EmailAlreadyTakenException;
import com.plancton.exceptions.EmailFailedToSendException;
import com.plancton.exceptions.IncorrectVerificationCodeException;
import com.plancton.exceptions.UserDoesNotExistException;
import com.plancton.models.ApplicationUser;
import com.plancton.models.LoginResponse;
import com.plancton.models.RegistrationObject;
import com.plancton.services.MailService;
import com.plancton.services.TokenService;
import com.plancton.services.UserService;
import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {
    private final UserService userService;


    private final TokenService tokenService;

    private final AuthenticationManager authenticationManager;

    private final MailService emailService;

    @Autowired
    public AuthenticationController(UserService userService, TokenService tokenService, AuthenticationManager authenticationManager, MailService emailService){
        this.userService=userService;
        this.tokenService = tokenService;
        this.authenticationManager=authenticationManager;
        this.emailService=emailService;
    }

    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailTaken(){
        return new ResponseEntity<String>("The email you provided is already in use", HttpStatus.CONFLICT);
    }

    // go to http://localhost:8080/auth/register
    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationObject ro){
        return userService.registerUser(ro);
    }

    @GetMapping("/checkToken")
    public boolean checkToken(@RequestHeader("Authorization") String token){
        return true;
    }

    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleUserDoesntExist(){
        return new ResponseEntity<String>("The user you are looking for does not exist",HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/phone")
    public ApplicationUser updatePhoneNumber(@RequestBody LinkedHashMap<String,String> body){
        String username=body.get("username");
        String phone=body.get("phone");

        ApplicationUser user=userService.getUserByUsername(username);

        user.setPhone(phone);

        return userService.updateUser(user);

    }
    @ExceptionHandler({EmailFailedToSendException.class})
    public ResponseEntity<String> handleFailedEmail(){
        return new ResponseEntity<String>("Email failed to send",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/email/code")
    public ResponseEntity<String> createEmailVerificationCode(@RequestBody LinkedHashMap<String,String> body){
        userService.generateEmailVerification(body.get("username"));

        return new ResponseEntity<String>("Verification code generated,email sent",HttpStatus.OK);
    }

    @ExceptionHandler({IncorrectVerificationCodeException.class})
    public ResponseEntity<String> handleIncorrectVerificationCode(){
        return new ResponseEntity<String>("The code you provided did not match the verification code",HttpStatus.CONFLICT);
    }
    @PostMapping("/email/verify")
    public ApplicationUser verifyEmail(@RequestBody LinkedHashMap<String,String> body){
        Long code=Long.parseLong(body.get("code"));
        String username=body.get("username");

        return userService.verifyEmail(username,code);
    }

    @PostMapping("/find")
    public ResponseEntity<String> verifyUsername(@RequestBody FindUsernameDTO credential){
        HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.setContentType(MediaType.TEXT_PLAIN);
        String username=userService.verifyUsername(credential);
        return new ResponseEntity<String>(username,HttpStatus.OK);
    }
/*
    @PutMapping("/update/password")
    public ApplicationUser updatePassword(@RequestBody LinkedHashMap<String,String> body){
        String username=body.get("username");
        String password=body.get("password");

        return userService.setPassword(username,password);
    }

    @ExceptionHandler({InvalidCredentialsException.class})
    public ResponseEntity<String> handleInvalidCredentials(){
        return new ResponseEntity<String>("Invalid credentials",HttpStatus.FORBIDDEN);
    }
*/
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LinkedHashMap<String,String> body) throws InvalidCredentialsException {
        String username=body.get("username");
        String password=body.get("password");


        try{
            Authentication auth=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
            String token=tokenService.generateToken(auth);
            System.out.println(token);
            return new LoginResponse(userService.getUserByUsername(username),token);
        }catch(AuthenticationException e){
            throw new InvalidCredentialsException();
        }
    }
}
