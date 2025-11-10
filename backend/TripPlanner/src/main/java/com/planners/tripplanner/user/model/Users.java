package com.planners.tripplanner.user.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.planners.tripplanner.trip.model.MyTrips;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Document
public class Users {

    @Id
    private ObjectId userId;

    @NonNull
    private String userName;

    private String image;

    @NonNull
    private String userImage;

    @NonNull
    private String password;
    private String email;

    private List<String> myTrips = new ArrayList<>();
}
