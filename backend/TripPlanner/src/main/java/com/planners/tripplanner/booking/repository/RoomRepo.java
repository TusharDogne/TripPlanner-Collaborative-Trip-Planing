package com.planners.tripplanner.booking.repository;

import com.planners.tripplanner.booking.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepo extends MongoRepository<Room, String> {
    Room findByRoomId(String roomId);
}
