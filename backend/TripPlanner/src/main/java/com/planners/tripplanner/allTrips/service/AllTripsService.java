package com.planners.tripplanner.allTrips.service;

import com.planners.tripplanner.allTrips.Repository.AllTripsRepo;
import com.planners.tripplanner.allTrips.model.AllTrips;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllTripsService {


    @Autowired
    AllTripsRepo allTripsRepo;

    public List<AllTrips> getAllTrips() {
        return allTripsRepo.findAll();
    }

    public AllTrips addTripToAllTrips(AllTrips allTrips) {
        return allTripsRepo.save(allTrips);
    }
}
