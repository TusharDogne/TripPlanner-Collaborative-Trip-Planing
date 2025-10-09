package com.planners.tripplanner.controller;

import com.planners.tripplanner.model.Users;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    public Users user;
}
