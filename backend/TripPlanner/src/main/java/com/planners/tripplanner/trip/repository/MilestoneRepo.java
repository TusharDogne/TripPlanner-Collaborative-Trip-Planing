package com.planners.tripplanner.trip.repository;

import com.planners.tripplanner.trip.model.Milestone;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MilestoneRepo extends MongoRepository<Milestone, String> {

}
