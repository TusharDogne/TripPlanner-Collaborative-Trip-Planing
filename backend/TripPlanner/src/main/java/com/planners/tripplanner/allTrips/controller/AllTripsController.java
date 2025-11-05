package com.planners.tripplanner.allTrips.controller;


import com.planners.tripplanner.allTrips.Repository.AllTripsRepo;
import com.planners.tripplanner.allTrips.dto.IdRequest;
import com.planners.tripplanner.allTrips.model.AllTrips;
import com.planners.tripplanner.allTrips.service.AllTripsService;
import com.planners.tripplanner.trip.model.MyTrips;
import com.planners.tripplanner.trip.service.MyTripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/allTrips")
public class AllTripsController {

    @Autowired
    AllTripsService allTripsService;

    @Autowired
    MyTripService myTripsService;
    @Autowired
    private AllTripsRepo allTripsRepo;

    @GetMapping("/getAllTrips")
    public ResponseEntity<?> getAllTrips() {
        List<AllTrips> allTrips = allTripsService.getAllTrips();
        return ResponseEntity.ok(allTrips);
    }

    @PostMapping("/addTripToMyTrips")
    public ResponseEntity<?> addTripToMyTrips(@RequestBody IdRequest request) {
        AllTrips trip = allTripsRepo.findById(request.getId()).orElse(null);
        MyTrips myTrip = allTripsService.addTripToMyTrip(trip);

        if(myTrip != null) {
            return ResponseEntity.ok(myTrip);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/addTripToAllTrips")
    public ResponseEntity<?> addTripToAllTrips(@RequestBody AllTrips allTrips) {
        AllTrips addedTrip = allTripsService.addTripToAllTrips(allTrips);
        if (addedTrip != null) {
            return ResponseEntity.ok(addedTrip);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
