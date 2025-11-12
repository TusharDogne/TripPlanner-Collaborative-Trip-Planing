package com.planners.tripplanner.booking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoomBookDto {

    private String roomId;
    private int requiredRoom;
}
