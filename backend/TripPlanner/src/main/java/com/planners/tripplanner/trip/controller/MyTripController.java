package com.planners.tripplanner.trip.controller;

import com.planners.tripplanner.trip.dto.MyTripDto;
import com.planners.tripplanner.trip.model.Milestone;
import com.planners.tripplanner.trip.model.MyTrips;
import com.planners.tripplanner.trip.repository.MilestoneRepo;
import com.planners.tripplanner.trip.repository.MyTripsRepo;
import com.planners.tripplanner.trip.service.MilestoneService;
import com.planners.tripplanner.trip.service.MyTripService;
import com.planners.tripplanner.user.service.UserGeneralServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MyTripController {

    @Autowired
    MyTripService myTripService;

    @Autowired
    MyTripsRepo myTripsRepo;


    @Autowired
    UserGeneralServices userGeneralServices;

    @Autowired
    private MilestoneService milestoneService;

//    EmailService emailService;

    @PostMapping("/addTrip")
    public ResponseEntity<?> addTrip(@RequestBody MyTripDto myTripDto) {
        MyTrips myTrip = myTripService.addMyTrip(myTripDto);
        if (myTrip != null) {
            return new ResponseEntity<>(myTrip, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }



    @GetMapping("/trips")
    public ResponseEntity<?> getMyTrips(){

        List<MyTrips> myTrips= myTripService.getMyTrips();
        if(myTrips == null || myTrips.isEmpty()) {
            return new ResponseEntity<>("No Trips found", HttpStatus.NO_CONTENT);
        }
        System.out.println("myTrips size: "+myTrips.size());
        return new ResponseEntity<>(myTrips, HttpStatus.OK);
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<?> getMyTripById(@PathVariable String tripId) {

        MyTrips myTrip = myTripsRepo.findMyTripsById(tripId);
        if(myTrip == null ) {
            return new ResponseEntity<>("No Trips found", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(myTrip, HttpStatus.OK);
    }

    @PostMapping("/add-milestone")
    public ResponseEntity<?> addMilestone(@RequestBody Milestone milestone) {
        Milestone milestone1 = milestoneService.addMileStone(milestone);
        if(milestone1 != null) {
            return new ResponseEntity<>(milestone1, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
