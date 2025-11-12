package com.planners.tripplanner.booking.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document
@Data
@NoArgsConstructor
public class Hotel {

    @Id
    private String hotelId;
    private String hotelName;
    private String hotelAddress;
    private String hotelCity;
    private String image;

    @DBRef
    private List<Room> rooms;
    @DBRef
    private List<Meal> meals;
}
