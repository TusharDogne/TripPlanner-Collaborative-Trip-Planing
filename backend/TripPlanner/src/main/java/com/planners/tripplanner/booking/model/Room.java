package com.planners.tripplanner.booking.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;

@Data
@NoArgsConstructor
@Document
public class Room {
    @Id
    private String roomId;
    private String roomName;
    private String roomDescription;
    private String roomType;
    private String image;
    private int availableRooms;
    private int price;
    private List<String> users;
}
