package com.planners.tripplanner.trip.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document
public class Activity {

    @NonNull
    private String activityName;
    private String description;
    private String priority;
    private boolean hasVoting;
    private int votes;
}
