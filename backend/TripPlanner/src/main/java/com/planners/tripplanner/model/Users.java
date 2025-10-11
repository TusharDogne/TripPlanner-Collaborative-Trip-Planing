package com.planners.tripplanner.model;

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
    @NonNull
    private String password;
    private String email;

    @DBRef
    private List<MyTrips> roles = new ArrayList<>();
}
