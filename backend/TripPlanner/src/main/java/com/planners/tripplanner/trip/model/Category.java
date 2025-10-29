package com.planners.tripplanner.trip.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document
public class Category {

    private String name;
    private int budget;
    private int spent;
}
