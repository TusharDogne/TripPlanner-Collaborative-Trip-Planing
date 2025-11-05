package com.planners.tripplanner.trip.repository;

import com.planners.tripplanner.trip.model.MyTripActivity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MyTripActivityRepo extends MongoRepository<MyTripActivity, String> {
}
