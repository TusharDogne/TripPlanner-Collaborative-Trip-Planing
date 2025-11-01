package com.planners.tripplanner.inviteEmail.service;

import com.planners.tripplanner.config.JwtUtil;
import com.planners.tripplanner.trip.model.MyTrips;
import com.planners.tripplanner.trip.repository.MyTripsRepo;

import com.planners.tripplanner.user.model.Users;
import com.planners.tripplanner.user.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TripInviteEmailService {

    @Autowired
    MyTripsRepo myTripsRepo;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private UserRepo userRepo;

    public void sendTripInvite(String tripId, String toEmail) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String inviterName = auth.getName();

        MyTrips mytrip = myTripsRepo.findMyTripsById(tripId);
        String tripName = mytrip.getTripName();

        // Generate token & invite link
        String token = jwtUtil.generateInvitationToken(toEmail, tripId);
        String inviteLink = "http://localhost:8080/myTrip/verify-invite?token=" + token;

        // Prepare email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tripplanner.colaborate@gmail.com"); // must match spring.mail.username
        message.setTo(toEmail);
        message.setSubject("You’re invited to join trip: " + tripName);
        message.setText(
                "Hello!\n\n"
                        + inviterName + " invited you to join the trip " + tripName + ".\n\n"
                        + "Click the link below to join:\n"
                        + inviteLink + "\n\n"
                        + "This link will expire in 24 hours."
        );

        // Send email
        mailSender.send(message);
        System.out.println("✅ Invite sent to " + toEmail);
    }

    public boolean addMemberToTrip(String tripId, Users user) {
        MyTrips myTrip = myTripsRepo.findMyTripsById(tripId);
        if (myTrip == null) {
            return false; // Trip not found
        }

        List<Users> members = myTrip.getMembers();
        if (members == null) {
            members = new ArrayList<>();
        }

        // Check if user is already a member
        for (Users member : members) {
            if (member.getUserName().equals(user.getUserName())) {
                return false; // User already a member
            }
        }

        List<String> userTrips = user.getMyTrips();
        userTrips.add(tripId);
        user.setMyTrips(userTrips);
        userRepo.save(user);

        members.add(user);
        myTrip.setMembers(members);
        myTrip.setMemberCount(members.size()); // Update member count

        myTripsRepo.save(myTrip);
        return true;
    }

}
