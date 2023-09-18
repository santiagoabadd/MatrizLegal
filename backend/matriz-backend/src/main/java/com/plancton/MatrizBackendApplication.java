package com.plancton;

import com.plancton.config.RSAKeyProperties;
import com.plancton.models.ApplicationUser;
import com.plancton.models.Role;
import com.plancton.repositories.RoleRepository;
import com.plancton.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@EnableConfigurationProperties(RSAKeyProperties.class)
@SpringBootApplication
public class MatrizBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MatrizBackendApplication.class, args);
	}
	@Bean
	CommandLineRunner run(RoleRepository roleRepo, UserRepository userRepo, PasswordEncoder passwordEncoder){
		return args ->{







		};
	}
}
