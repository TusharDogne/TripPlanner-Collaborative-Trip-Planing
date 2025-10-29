package com.planners.tripplanner.trip.service;


import com.planners.tripplanner.trip.model.Milestone;
import com.planners.tripplanner.trip.model.MyTrips;
import com.planners.tripplanner.trip.repository.MilestoneRepo;
import com.planners.tripplanner.trip.repository.MyTripsRepo;
import com.planners.tripplanner.user.model.Users;
import com.planners.tripplanner.user.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MilestoneService {

    @Autowired
    MilestoneRepo mileStoneRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    MyTripsRepo myTripsRepo;

    public Milestone addMileStone(Milestone mileStone) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = auth.getName();

        Users user = userRepo.findByUserName(currentUserName);
        List<String> mytrips = user.getMyTrips();

        MyTrips mytrip = myTripsRepo.findMyTripsById(mytrips.get(mytrips.size()-1));

        Milestone savedMilestone = mileStoneRepo.save(mileStone);
        mytrip.getMilestones().add(savedMilestone);

        return  savedMilestone;
    }
}
