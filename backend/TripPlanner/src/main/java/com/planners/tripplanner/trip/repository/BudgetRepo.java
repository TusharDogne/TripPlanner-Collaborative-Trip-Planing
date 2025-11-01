package com.planners.tripplanner.trip.repository;

import com.planners.tripplanner.trip.model.Budget;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BudgetRepo extends MongoRepository<Budget, String> {

}