package com.planners.tripplanner.trip.controller;

import com.planners.tripplanner.trip.dto.AddExpensesDto;
import com.planners.tripplanner.trip.model.Budget;
import com.planners.tripplanner.trip.model.MyTrips;
import com.planners.tripplanner.trip.repository.BudgetRepo;
import com.planners.tripplanner.trip.repository.MyTripsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    @Autowired
    private BudgetRepo budgetRepo;

    @Autowired
    private MyTripsRepo myTripsRepo;


    @PostMapping("/add-expense")
    public ResponseEntity<?> addBudget(@RequestBody AddExpensesDto addExpensesDto) {
        MyTrips myTrip = myTripsRepo.findMyTripsById(addExpensesDto.getTripId());
        Budget budget = myTrip.getBudget();
        budget.setSpent(budget.getSpent()+addExpensesDto.getAmount());
        budget.setTotal(budget.getRemaining()-addExpensesDto.getAmount());
        budget.setPercentage((budget.getRemaining()/budget.getTotal())*100);
        Budget budgetSaved = budgetRepo.save(budget);
        myTrip.setBudget(budgetSaved);
        myTripsRepo.save(myTrip);
        return new ResponseEntity<>(budgetSaved, HttpStatus.OK);
    }

}
