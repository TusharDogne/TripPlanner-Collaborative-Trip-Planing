package com.planners.tripplanner.booking.controller;

import com.planners.tripplanner.booking.dto.RoomBookDto;
import com.planners.tripplanner.booking.model.Room;
import com.planners.tripplanner.booking.repository.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/room")
public class RoomController {

    @Autowired
    private RoomRepo roomRepo;

    @PostMapping("/book-room")
    public ResponseEntity<?> bookRoom(@RequestBody RoomBookDto roomBookDto) {
        Room room = roomRepo.findByRoomId(roomBookDto.getRoomId());
        if(room != null){
            if(room.getAvailableRooms() >= roomBookDto.getRequiredRoom()){
                room.setAvailableRooms(room.getAvailableRooms() - roomBookDto.getRequiredRoom());
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                String username = auth.getName();
                room.getUsers().add(username);
                roomRepo.save(room);
                return ResponseEntity.ok().build();
            }
            else{
                return new ResponseEntity<>("rooms not available", HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
