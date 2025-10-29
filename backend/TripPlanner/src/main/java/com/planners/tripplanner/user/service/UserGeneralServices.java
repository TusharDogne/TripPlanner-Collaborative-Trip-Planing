package com.planners.tripplanner.user.service;

import com.planners.tripplanner.config.JwtUtil;
import com.planners.tripplanner.user.dto.LoginRequestDto;
import com.planners.tripplanner.user.dto.RegisterRequest;
import com.planners.tripplanner.trip.model.MyTrips;
import com.planners.tripplanner.user.model.Users;
import com.planners.tripplanner.user.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserGeneralServices {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users saveUser(RegisterRequest registerRequest) {
        Users user = new Users();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(encoder.encode(registerRequest.getPassword()));
        user.setUserName(registerRequest.getUserName());
        boolean emailExist = userRepo.existsByEmail(registerRequest.getEmail());
        boolean userNameExist = userRepo.existsByUserName(registerRequest.getUserName());
        if (emailExist || userNameExist) {
            return null;
        }
        return userRepo.save(user);
    }

    public void deleteUser() {

    }

    public String verifyUser(LoginRequestDto loginRequest) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword())
            );

            if (authentication.isAuthenticated()) {
                Users dbUser = userRepo.findByUserName(loginRequest.getUserName());
                Users user = dbUser;
                return jwtUtil.generateToken(user.getUserName());
            } else {
                return null;
            }
        } catch (Exception e) {
            // This will show the real exception behind InvocationTargetException
            e.printStackTrace();
            return null;
        }
    }

    public Users getUserByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return userRepo.findByUserName(userName);
    }

}
