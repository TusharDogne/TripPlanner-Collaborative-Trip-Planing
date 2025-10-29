package com.planners.tripplanner.inviteEmail.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TripInviteDTO {
    private String tripId;
    private String toEmail;
}
