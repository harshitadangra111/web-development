package com.yourorg.appname.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreLocationResponse {
    private Long id;
    private String name;
    private String neighborhood;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private String phone;
    private String email;
    private String openingHours;
    private String amenities;
    private String imageUrl;
}
