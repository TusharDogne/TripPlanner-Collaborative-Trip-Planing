package com.planners.tripplanner.chat.repository;

import com.planners.tripplanner.chat.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends MongoRepository<Message, String> {
    List<Message> findByTripIdOrderByTimestampAsc(String tripId);
}
