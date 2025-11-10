package com.planners.tripplanner.chat.service;

import com.planners.tripplanner.chat.model.Message;
import com.planners.tripplanner.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    public List<Message> getMessagesByTripId(String tripId) {
        return chatMessageRepository.findByTripIdOrderByTimestampAsc(tripId);
    }

    public Message saveMessage(String tripId, Message message) {
        message.setTripId(tripId);
        return chatMessageRepository.save(message);
    }
}
