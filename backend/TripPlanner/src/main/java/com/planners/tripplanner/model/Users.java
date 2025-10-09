package com.planners.tripplanner.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Users {

    private int userId;
    private String userName;
    private String password;
    private String email;
}
