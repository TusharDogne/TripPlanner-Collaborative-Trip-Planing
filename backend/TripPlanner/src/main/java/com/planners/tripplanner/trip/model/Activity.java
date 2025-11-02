package com.planners.tripplanner.trip.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document
public class Activity {

    private String id;
    private String name;
    private String description;
    private String image;
    private double rating;
    private double estimatedCost;
    private String budgetImpact;
    private List<String> tags;
}
