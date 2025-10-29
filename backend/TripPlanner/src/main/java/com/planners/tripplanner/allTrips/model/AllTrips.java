package com.planners.tripplanner.allTrips.model;

import com.planners.tripplanner.trip.model.Activity;
import com.planners.tripplanner.trip.model.Budget;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Document
public class AllTrips {

        @Id
        private String id;
        @NonNull
        private String title;
        @NonNull
        private String location;
        private String category;
        private String image;
        private double rating;
        private String duration;
        private String priceRange;
        private String groupSize;
        private String distance;
        private String aiReasoning;
        private String description;
        private List<String> tags;
        private String socialProof;
        private boolean isSaved;
}
