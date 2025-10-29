package com.planners.tripplanner.trip.model;

import lombok.Data;

@Data
public class Contributor {
    private int id;
    private String name;
    private int contributed;
    private String status;
}
