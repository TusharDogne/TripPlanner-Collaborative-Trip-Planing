package com.planners.tripplanner.user.controller;

import com.planners.tripplanner.user.dto.RegisterRequest;
import com.planners.tripplanner.user.model.MyTrips;
import com.planners.tripplanner.user.model.Users;
import com.planners.tripplanner.user.service.UserGeneralServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    UserGeneralServices userGeneralServices;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Received: " + registerRequest.getUserName() + ", " + registerRequest.getEmail());
        Users createdUser = userGeneralServices.saveUser(registerRequest);
        if(createdUser != null) {
            return new ResponseEntity<>("User created successfully",HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users user) {
        String token = userGeneralServices.verifyUser(user);
        if(token != null) {
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/myTrips")
    public ResponseEntity<?> getMyTrips(){
        List<MyTrips> myTrips= userGeneralServices.getMyTrips();
        if(myTrips == null || myTrips.isEmpty()) {
            return new ResponseEntity<>("No Trips found", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(myTrips, HttpStatus.OK);
    }

    @DeleteMapping("deleteAccount")
    public ResponseEntity<?> deleteUser() {
        userGeneralServices.deleteUser();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
