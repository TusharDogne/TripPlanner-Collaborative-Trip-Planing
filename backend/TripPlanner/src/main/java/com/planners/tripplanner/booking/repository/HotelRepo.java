package com.planners.tripplanner.booking.repository;

import com.planners.tripplanner.booking.model.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface HotelRepo extends MongoRepository<Hotel, String> {
    @Query("{ 'hotelCity': { $regex: ?0, $options: 'i' } }")
    List<Hotel> findHotelByHotelCity(String city);

}
