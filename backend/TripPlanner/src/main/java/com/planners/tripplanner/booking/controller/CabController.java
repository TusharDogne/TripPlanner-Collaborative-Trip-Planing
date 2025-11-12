package com.planners.tripplanner.booking.controller;


import com.planners.tripplanner.booking.repository.CabRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cab")
public class CabController {

    @Autowired
    private CabRepo cabRepo;


}
