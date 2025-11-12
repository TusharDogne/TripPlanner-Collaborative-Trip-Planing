package com.planners.tripplanner.booking.controller;

import com.planners.tripplanner.booking.model.Hotel;
import com.planners.tripplanner.booking.model.Meal;
import com.planners.tripplanner.booking.model.Room;
import com.planners.tripplanner.booking.repository.HotelRepo;
import com.planners.tripplanner.booking.repository.MealRepo;
import com.planners.tripplanner.booking.repository.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotel")
public class HotelController {

    @Autowired
    private HotelRepo hotelRepo;

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private MealRepo mealRepo;

    @PostMapping("/add-hotel")
    public ResponseEntity<?> addHotel(@RequestBody Hotel hotel){
        Hotel newHotel = hotelRepo.save(hotel);
        List<Room> newRooms = newHotel.getRooms();
        for (Room room : newRooms) {
            roomRepo.save(room);
        }
        List<Meal> newMeals = newHotel.getMeals();
        for (Meal meal : newMeals) {
            mealRepo.save(meal);
        }
        if(newHotel != null){
            return ResponseEntity.ok(newHotel);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-all-hotel")
    public ResponseEntity<?> getAllHotels(){
        List<Hotel> hotels = hotelRepo.findAll();
        if(hotels != null){
            return ResponseEntity.ok(hotels);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-by-city/{city}")
    public ResponseEntity<?> getHotelByCity(@PathVariable String city){
        List<Hotel> hotels = hotelRepo.findHotelByHotelCity(city);
        if(hotels != null){
            return ResponseEntity.ok(hotels);
        }
        return ResponseEntity.notFound().build();
    }
}
