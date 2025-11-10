package com.planners.tripplanner.chat.controller;

import com.planners.tripplanner.chat.model.Message;
import com.planners.tripplanner.chat.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{tripId}")
    @SendTo("/topic/trip/{tripId}")
    public Message sendMessage(@Payload Message message,
                               @DestinationVariable String tripId) {

        message.setTimestamp(LocalDateTime.now());
        message.setTripId(tripId);
        chatMessageService.saveMessage(tripId, message);
        return message;
    }

    // Fetch old messages
    @org.springframework.web.bind.annotation.GetMapping("/chat/{tripId}/history")
    @org.springframework.web.bind.annotation.ResponseBody
    public List<Message> getChatHistory(@org.springframework.web.bind.annotation.PathVariable String tripId) {
        return chatMessageService.getMessagesByTripId(tripId);
    }

    // Send system messages
    public void sendSystemMessage(String tripId, String content) {
        Message systemMessage = new Message();
        systemMessage.setTripId(tripId);
        systemMessage.setSender("System");
        systemMessage.setContent(content);
        systemMessage.setTimestamp(LocalDateTime.now());

        chatMessageService.saveMessage(tripId, systemMessage);
        messagingTemplate.convertAndSend("/topic/trip/" + tripId, systemMessage);
    }
}
