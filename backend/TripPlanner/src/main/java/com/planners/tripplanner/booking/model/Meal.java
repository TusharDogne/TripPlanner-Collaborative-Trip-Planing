package com.planners.tripplanner.booking.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Data
@NoArgsConstructor
public class Meal {

    @Id
    private String mealId;
    private String mealType;
    private String mealName;
    private String mealDescription;
    private String image;
    private String mealPrice;
    private List<String> orderBy;

}
