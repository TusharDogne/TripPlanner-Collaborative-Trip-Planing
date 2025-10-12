package com.planners.tripplanner.controller;

import com.planners.tripplanner.model.MyTrips;
import com.planners.tripplanner.model.Users;
import com.planners.tripplanner.service.UserGeneralServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserGeneralServices userGeneralServices;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody Users user) {
        Users createdUser = userGeneralServices.saveUser(user);
        if(createdUser != null) {
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
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
