package com.planners.tripplanner.allTrips.service;

import com.planners.tripplanner.allTrips.Repository.AllTripsRepo;
import com.planners.tripplanner.allTrips.model.AllTrips;
import com.planners.tripplanner.trip.model.*;
import com.planners.tripplanner.trip.repository.*;
import com.planners.tripplanner.user.model.Users;
import com.planners.tripplanner.user.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AllTripsService {


    @Autowired
    AllTripsRepo allTripsRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    BudgetRepo budgetRepo;

    @Autowired
    MilestoneRepo milestoneRepo;

    @Autowired
    MyTripsRepo myTripsRepo;

    @Autowired
    ActivityRepo activityRepo;

    @Autowired
    MyTripActivityRepo myTripActivityRepo;

    public List<AllTrips> getAllTrips() {
        return allTripsRepo.findAll();
    }

    public AllTrips addTripToAllTrips(AllTrips allTrips) {
        List<Activity> activities = allTrips.getActivity();
        for (Activity activity : activities) {
            activityRepo.save(activity);
        }
        return allTripsRepo.save(allTrips);
    }

    public MyTrips addTripToMyTrip(AllTrips trip) {
        MyTrips myTrip = new MyTrips();
        myTrip.setTripName(trip.getTitle());


        //Assigning current login user as trip admin
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userName = auth.getName();

        Users currUser = userRepo.findByUserName(userName);
        myTrip.setTripAdmin(currUser);

        myTrip.setDestination(trip.getDestination());

        myTrip.setMemberCount(1);

        myTrip.setStatus("ACTIVE");

        myTrip.setImage(trip.getImage());

        Budget budget = new Budget();
        budget.setTotal(trip.getPriceRange());
        budget.setPercentage(0);
        budget.setRemaining(trip.getPriceRange());
        budget.setSpent(0);

        myTrip.setBudget(budgetRepo.save(budget));

        myTrip.getMembers().add(currUser);

        // Adding initial mileStone
        Milestone milestone = new Milestone();
        milestone.setType("created");
        milestone.setTitle(trip.getTitle() + " trip created");
        milestone.setDescription(trip.getTitle() + "planning started");
        milestone.setCompleted(true);
        milestone.setCompletedAt(new Date());
        milestone.setCurrent(true);
        milestone.setActionable(false);
        milestone.setDueDate(new Date());

        myTrip.getMilestones().add(milestoneRepo.save(milestone));

        List<MyTripActivity> myTripActivities = new ArrayList<>();
        List<Activity> activities = trip.getActivity();
        for (Activity activity : activities) {
            MyTripActivity myTripActivity = new MyTripActivity();
            myTripActivity.setName(activity.getName());
            myTripActivity.setDescription(activity.getDescription());
            myTripActivity.setTags(activity.getTags());
            myTripActivity.setImage(activity.getImage());
            myTripActivity.setRating(activity.getRating());
            myTripActivity.setEstimatedCost(activity.getEstimatedCost());
            myTripActivities.add(myTripActivityRepo.save(myTripActivity));
        }

        myTrip.setActivity(myTripActivities);

        String duration = trip.getDuration();

        // Extract the number (handles any number of digits)
        int days = 0;
        if (duration != null && !duration.isEmpty()) {
            java.util.regex.Matcher matcher = java.util.regex.Pattern.compile("\\d+").matcher(duration);
            if (matcher.find()) {
                days = Integer.parseInt(matcher.group());
            }
        }

        System.out.println("Trip duration in days = " + days);


        LocalDate startDate = LocalDate.now(); // or trip.getStartDate()
        LocalDate endDate = startDate.plusDays(days);
        myTrip.setEndDate(endDate);


        MyTrips savedMyTrip = myTripsRepo.save(myTrip);

        currUser.getMyTrips().add(savedMyTrip.getId());
        userRepo.save(currUser);

        return myTrip;
    }
}
