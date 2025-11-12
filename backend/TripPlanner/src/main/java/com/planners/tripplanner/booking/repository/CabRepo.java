package com.planners.tripplanner.booking.repository;

import com.planners.tripplanner.booking.model.Cab;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CabRepo extends MongoRepository<Cab, String> {
}
