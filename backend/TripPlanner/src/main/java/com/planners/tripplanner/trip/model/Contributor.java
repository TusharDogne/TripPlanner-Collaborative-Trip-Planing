package com.planners.tripplanner.trip.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document
public class Contributor {

    private ObjectId contributorId;
    private String name;
    private int contributed;
    private String status;

}
