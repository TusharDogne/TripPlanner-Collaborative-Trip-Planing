package com.planners.tripplanner.trip.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddExpensesDto {

    private String tripId;
    private int amount;
}
