package com.planners.tripplanner.trip.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class MyTripDto {

    private String id;
    private String tripName;
    private String tripAdminName;          // Only admin name, not whole object
    private String destination;
    private String category;
    private String dates;
    private int memberCount;
    private String status;
    private boolean isNew;
    private boolean liveActivity;
    private String image;
    private int budget = 0;            // From Budget
    private List<String> memberNames;      // Only member names
    private List<String> activeMemberNames;
    private List<String> nextActionTitles; // Only action titles or description
}


