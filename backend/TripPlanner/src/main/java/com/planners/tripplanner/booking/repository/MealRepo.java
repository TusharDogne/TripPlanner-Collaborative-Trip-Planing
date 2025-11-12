package com.planners.tripplanner.booking.repository;

import com.planners.tripplanner.booking.model.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MealRepo extends MongoRepository<Meal, String> {
    Meal findMealByMealId(String mealId);
}
