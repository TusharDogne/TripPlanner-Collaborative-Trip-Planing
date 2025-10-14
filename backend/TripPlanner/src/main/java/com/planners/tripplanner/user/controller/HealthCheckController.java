package com.planners.tripplanner.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;


@RestController
public class HealthCheckController {

    @GetMapping("/health-check")
    public String healthCheck() {
        return "Backend is running! Time: " + LocalDateTime.now();
    }
}

