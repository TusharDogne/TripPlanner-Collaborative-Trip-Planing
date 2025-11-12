package com.planners.tripplanner.booking.controller;

import com.planners.tripplanner.booking.model.Meal;
import com.planners.tripplanner.booking.repository.MealRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/meals")
public class MealsController {

    @Autowired
    private MealRepo mealRepo;


    @PostMapping("/order-meal/{mealId}")
    public ResponseEntity<?> orderMeal(@PathVariable String mealId) {
        Meal meal = mealRepo.findMealByMealId(mealId);
        if (meal == null) {
            return ResponseEntity.notFound().build();
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        meal.getOrderBy().add(username);
        Meal newMeal = mealRepo.save(meal);
        return ResponseEntity.ok(newMeal);
    }
}
