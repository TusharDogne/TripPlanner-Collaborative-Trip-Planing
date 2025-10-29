package com.planners.tripplanner.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;


@Data
@NoArgsConstructor
public class LoginResponse {

    private String token;
    private String userName;
    private String email;
    private String role;
    private ObjectId id;
}
