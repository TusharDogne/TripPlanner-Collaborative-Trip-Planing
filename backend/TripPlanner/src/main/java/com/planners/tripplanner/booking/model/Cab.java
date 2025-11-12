package com.planners.tripplanner.booking.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
public class Cab {

    @Id
    private String cabId;
    private String cabName;
    private String cabType;
    private String cabStatus;
    private String cabLocation;
    private String driverName;
    private String driverPhone;
    private String driverEmail;
    private int price;

}
