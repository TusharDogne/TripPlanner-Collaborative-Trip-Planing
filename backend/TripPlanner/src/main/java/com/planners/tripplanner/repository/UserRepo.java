package com.planners.tripplanner.repository;

import com.planners.tripplanner.model.MyTrips;
import com.planners.tripplanner.model.Users;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepo extends MongoRepository<Users, ObjectId> {
    Users findByUserName(String userName);

}
