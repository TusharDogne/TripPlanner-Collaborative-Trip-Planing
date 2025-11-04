package com.planners.tripplanner.trip.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.planners.tripplanner.chat.model.Message;
import com.planners.tripplanner.user.model.Users;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Document
public class MyTrips {

    @Id
    private String id;

    private String tripName;

    @DBRef(lazy = false)
    @JsonManagedReference
    private Users tripAdmin;

    @NonNull
    private String destination;
    private String category;
    private String dates;
    private int memberCount;
    private String status;
    private boolean isNew;
    private boolean liveActivity;
    private String image;
    private Budget budget;

    List<Message> messages = new ArrayList<>();

    @DBRef(lazy = false)
    @JsonManagedReference
    private List<Users> members =  new ArrayList<>();

    @DBRef(lazy = false)
    @JsonManagedReference
    private List<Users> activeMembers;

    @DBRef
    private List<MyTripActivity> activity = new ArrayList<>();

    @DBRef
    List<Milestone> milestones = new ArrayList<>();
}
