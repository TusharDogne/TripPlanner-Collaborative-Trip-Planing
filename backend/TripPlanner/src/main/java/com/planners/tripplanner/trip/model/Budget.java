package com.planners.tripplanner.trip.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document
public class Budget {

    private int total;
    private int spent;
    private float percentage;
    private int contributors;
    private int remaining;
    @DBRef
    private List<Category> categories;

    @DBRef
    private List<Contributor> contributor;
}
