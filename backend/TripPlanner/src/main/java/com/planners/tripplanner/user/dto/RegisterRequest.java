package com.planners.tripplanner.user.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterRequest {
    private String userName;
    private String password;
    private String email;
}
