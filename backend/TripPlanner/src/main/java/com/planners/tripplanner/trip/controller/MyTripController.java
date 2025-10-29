package com.planners.tripplanner.trip.controller;

import com.planners.tripplanner.trip.dto.MyTripDto;
import com.planners.tripplanner.trip.model.MyTrips;
import com.planners.tripplanner.trip.service.MyTripService;
import com.planners.tripplanner.user.service.UserGeneralServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/mytrip")
public class MyTripController {

    @Autowired
    MyTripService myTripService;

    @Autowired
    UserGeneralServices userGeneralServices;

//    EmailService emailService;

    @PostMapping("/addTrip")
    public ResponseEntity<?> addTrip(@RequestBody MyTripDto myTripDto) {
        MyTrips myTrip = myTripService.addMyTrip(myTripDto);
        if (myTrip != null) {
            return new ResponseEntity<>(myTrip, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/getMyTrips")
    public ResponseEntity<?> getMyTrips(){
        List<MyTrips> myTrips= myTripService.getMyTrips();
        if(myTrips == null || myTrips.isEmpty()) {
            return new ResponseEntity<>("No Trips found", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(myTrips, HttpStatus.OK);
    }


}
