package com.planners.tripplanner.trip.dto;


import com.planners.tripplanner.trip.model.Budget;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class MyTripDto {

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
    private Budget budget;            // From Budget
    private List<String> memberNames;      // Only member names
    private List<String> activeMemberNames;
    private List<String> nextActionTitles; // Only action titles or description
}


