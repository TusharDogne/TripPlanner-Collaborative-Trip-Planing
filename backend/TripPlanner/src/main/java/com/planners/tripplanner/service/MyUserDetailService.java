package com.planners.tripplanner.service;

import com.planners.tripplanner.model.UserPrinciple;
import com.planners.tripplanner.model.Users;
import com.planners.tripplanner.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    public UserRepo userRepo;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Users user = userRepo.findByUserName(username);

        if(user == null){
            throw new UsernameNotFoundException(username);
        }
        return new UserPrinciple(user);
    }
}
