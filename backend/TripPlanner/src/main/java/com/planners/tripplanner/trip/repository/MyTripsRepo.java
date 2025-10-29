package com.planners.tripplanner.trip.repository;

import com.planners.tripplanner.trip.model.MyTrips;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface MyTripsRepo extends MongoRepository<MyTrips, String> {

    MyTrips findMyTripsById(String tripId);

    List<MyTrips> getMyTripsByIdIn(List<String> tripIds);
}
