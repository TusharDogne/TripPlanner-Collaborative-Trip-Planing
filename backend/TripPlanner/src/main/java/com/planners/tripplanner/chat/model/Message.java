package com.planners.tripplanner.chat.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Document
public class Message {

    @Id
    private String id;
    private String tripId;
    private String content;
    private String sender;
    private LocalDateTime timestamp;
}
