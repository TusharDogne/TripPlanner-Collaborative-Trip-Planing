package com.planners.tripplanner.trip.repository;

import com.planners.tripplanner.trip.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActivityRepo extends MongoRepository<Activity, String> {

}