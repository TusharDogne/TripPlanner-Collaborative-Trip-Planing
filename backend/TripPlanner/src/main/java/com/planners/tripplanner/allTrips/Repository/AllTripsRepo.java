package com.planners.tripplanner.allTrips.Repository;

import com.planners.tripplanner.allTrips.model.AllTrips;
import com.planners.tripplanner.trip.model.MyTrips;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;

public interface AllTripsRepo extends MongoRepository<AllTrips, String> {
    AllTrips findAllTripsById(String allTripId);
}
