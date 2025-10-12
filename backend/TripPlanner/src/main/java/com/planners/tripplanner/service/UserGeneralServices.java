package com.planners.tripplanner.service;

import com.planners.tripplanner.config.JwtService;
import com.planners.tripplanner.model.MyTrips;
import com.planners.tripplanner.model.Users;
import com.planners.tripplanner.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.List;

@Service
public class UserGeneralServices {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users saveUser(Users user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public void deleteUser() {

    }

    public String verifyUser(Users user) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            Users dbUser = userRepo.findByUserName(user.getUserName());
            user = dbUser;
            return jwtService.generateToken(user.getUserName());
        } else {
            return null;
        }
    }

    public List<MyTrips> getMyTrips() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        Users user = userRepo.findByUserName(userName);
        if (user == null || user.getMyTrips() == null || user.getMyTrips().isEmpty()) {
            return null;
        }
        return user.getMyTrips();
    }
}
