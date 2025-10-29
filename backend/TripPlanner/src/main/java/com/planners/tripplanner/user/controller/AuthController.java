package com.planners.tripplanner.user.controller;

import com.planners.tripplanner.user.dto.LoginRequestDto;
import com.planners.tripplanner.user.dto.LoginResponse;
import com.planners.tripplanner.user.dto.RegisterRequest;
import com.planners.tripplanner.trip.model.MyTrips;
import com.planners.tripplanner.user.model.Users;
import com.planners.tripplanner.user.repository.UserRepo;
import com.planners.tripplanner.user.service.UserGeneralServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    UserGeneralServices userGeneralServices;
    @Autowired
    private UserRepo userRepo;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Received: " + registerRequest.getUserName() + ", " + registerRequest.getEmail());
        Users createdUser = userGeneralServices.saveUser(registerRequest);
        if(createdUser != null) {
            return new ResponseEntity<>("User created successfully",HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Username or Email already exist",HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDto loginRequest) {


        String token = userGeneralServices.verifyUser(loginRequest);
        if(token != null) {
            System.out.println("Token: " + token);
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        Users user = userGeneralServices.getUserByUsername();
        if(user != null) {
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setUserName(user.getUserName());
            loginResponse.setEmail(user.getEmail());
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }


    @DeleteMapping("deleteAccount")
    public ResponseEntity<?> deleteUser() {
        userGeneralServices.deleteUser();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
