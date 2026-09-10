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
public class CelebrationBookingResponse {
    private Long id;
    private String celebrationType;
    private String contactName;
    private String contactEmail;
    private String contactPhone;
    private LocalDateTime eventDate;
    private String timeSlot;
    private Integer guestCount;
    private String cakePreference;
    private String packageTier;
    private String specialRequests;
    private String status;
    private LocalDateTime createdAt;
}
