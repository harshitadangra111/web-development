package com.yourorg.appname.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {
    private Long id;
    private Long storeId;
    private String storeName;
    private String guestName;
    private String guestEmail;
    private String guestPhone;
    private Integer partySize;
    private LocalDateTime reservationTime;
    private String seatingPreference;
    private String specialRequests;
    private String status;
    private LocalDateTime createdAt;
}
