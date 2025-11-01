package com.planners.tripplanner.trip.service;

import com.planners.tripplanner.trip.dto.MyTripDto;
import com.planners.tripplanner.trip.model.Budget;
import com.planners.tripplanner.trip.model.Milestone;
import com.planners.tripplanner.trip.model.MyTrips;
import com.planners.tripplanner.trip.repository.BudgetRepo;
import com.planners.tripplanner.trip.repository.MilestoneRepo;
import com.planners.tripplanner.trip.repository.MyTripsRepo;
import com.planners.tripplanner.user.model.Users;
import com.planners.tripplanner.user.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MyTripService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    MyTripsRepo myTripsRepo;

    @Autowired
    MilestoneRepo milestoneRepo;

    @Autowired
    BudgetRepo budgetRepo;

    public MyTrips addMyTrip(MyTripDto myTripDto) {
        MyTrips myTrips = new MyTrips();

        myTrips.setTripName(myTripDto.getTripName());
        myTrips.setDestination(myTripDto.getDestination());
        myTrips.setCategory(myTripDto.getCategory());
        myTrips.setImage(myTripDto.getImage());
        myTrips.setMemberCount(0);  // initially 0
        myTrips.setStatus("PLANNED"); // example default status
        myTrips.setNew(true);
        myTrips.setLiveActivity(false);
        myTrips.setDates(myTripDto.getDates());

// Admin (assuming current logged-in user)
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = auth.getName();
        Users admin = userRepo.findByUserName(currentUserName); // get logged-in user
        myTrips.setTripAdmin(admin);

// Budget (if DTO has budget info)
        Budget userBudget = myTripDto.getBudget();
        Budget budget = new Budget();
        budget.setTotal(userBudget.getTotal());
        budget.setPercentage(0);
        budget.setRemaining(userBudget.getTotal());
        budget.setSpent(0);
        Budget savedBudget = budgetRepo.save(budget);

        myTrips.setBudget(savedBudget);

        // Adding initial mileStone
        Milestone milestone = new Milestone();
        milestone.setType("created");
        milestone.setTitle(myTripDto.getTripName() + " trip created");
        milestone.setDescription(myTripDto.getTripName() + "planning started");
        milestone.setCompleted(true);
        milestone.setCompletedAt(new Date());
        milestone.setCurrent(true);
        milestone.setActionable(false);
        milestone.setDueDate(new Date());


        // Admin added to member list initially
        List<Users> members = new ArrayList<>();
        members.add(admin);
        myTrips.setMembers(members);

        myTrips.setActiveMembers(new ArrayList<>());


        MyTrips mt = myTripsRepo.save(myTrips);

        admin.getMyTrips().add(mt.getId());
        userRepo.save(admin);

        return mt;
    }

    public List<MyTrips> getMyTrips() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        Users user = userRepo.findByUserName(userName);
        if (user == null || user.getMyTrips() == null || user.getMyTrips().isEmpty()) {
            return null;
        }
        List<String> tripIds = user.getMyTrips();
        return myTripsRepo.getMyTripsByIdIn(tripIds);
    }

}
