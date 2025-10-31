package com.planners.tripplanner.inviteEmail.controller;


import com.planners.tripplanner.config.JwtUtil;
import com.planners.tripplanner.inviteEmail.dto.TripInviteDTO;
import com.planners.tripplanner.inviteEmail.service.TripInviteEmailService;
import com.planners.tripplanner.trip.model.MyTrips;
import com.planners.tripplanner.trip.repository.MyTripsRepo;
import com.planners.tripplanner.user.model.Users;
import com.planners.tripplanner.user.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/myTrip")
public class TripInviteController {

    @Autowired
    private TripInviteEmailService tripInviteEmailService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MyTripsRepo myTripsRepo;


    @PostMapping("/invite")
    public ResponseEntity<?> inviteMember(@RequestBody TripInviteDTO tripInviteDTO) {
        System.out.println("Inside inviteMember");
        MyTrips myTrips = myTripsRepo.findMyTripsById(tripInviteDTO.getTripId());
        if(myTrips == null){
            return new ResponseEntity<>("Trip not found",HttpStatus.BAD_REQUEST);
        }
        try {
            tripInviteEmailService.sendTripInvite(tripInviteDTO.getTripId(), tripInviteDTO.getToEmail());
            return ResponseEntity.ok("Invitation sent to " + tripInviteDTO.getToEmail());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/verify-invite")
    public ResponseEntity<?> verifyInvite(@RequestParam("token") String token) {
        try {
            // Validate token
            if (!jwtUtil.validateEmailVerificationToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid or expired invite link");
            }

            // Extract email and tripId
            String email = jwtUtil.extractEmail(token);
            String tripId = jwtUtil.extractClaim(token, claims -> claims.get("tripId", String.class));

            Users user = userRepo.findByEmail(email);
            if (user != null) {
                tripInviteEmailService.addMemberToTrip(tripId, user);
                return ResponseEntity.ok("✅ Invite verified: " + email + " joined trip " + tripId);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("⚠️ User not registered. Please sign up first.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("❌ Invalid or expired invite link");
        }
    }



}
