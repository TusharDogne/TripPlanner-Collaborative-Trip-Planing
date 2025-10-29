package com.planners.tripplanner.trip.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Document
public class Milestone {


    @Id
    private String id;
    private String type;
    private String title;
    private String description;
    private boolean completed;
    private Date completedAt;   // optional
    private boolean current;    // optional
    private boolean actionable; // optional
    private String actionLabel; // optional
    private Date dueDate;       // optional

}
