package com.planners.tripplanner.service;

import com.planners.tripplanner.model.Users;
import org.springframework.stereotype.Service;

@Service
public class UserGeneralServices {

    public Users saveUser(Users user) {
        return user;
    }

    public void deleteUser() {

    }
}
