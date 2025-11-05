package com.planners.tripplanner.allTrips.Repository;

import com.planners.tripplanner.allTrips.model.AllTrips;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AllTripsRepo extends MongoRepository<AllTrips, String> {
    AllTrips findAllTripsById(String allTripId);
}
