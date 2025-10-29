package com.planners.tripplanner.user.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequestDto {
    private String userName;
    private String password;

}
