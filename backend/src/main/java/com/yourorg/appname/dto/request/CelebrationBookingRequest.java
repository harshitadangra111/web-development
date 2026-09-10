package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CelebrationBookingRequest {

    @NotBlank(message = "Celebration type is required")
    private String celebrationType;

    @NotBlank(message = "Contact name is required")
    private String contactName;

    @NotBlank(message = "Contact email is required")
    @Email(message = "Invalid email format")
    private String contactEmail;

    @NotBlank(message = "Contact phone is required")
    private String contactPhone;

    @NotNull(message = "Event date is required")
    private LocalDateTime eventDate;

    @NotBlank(message = "Time slot is required")
    private String timeSlot;

    @NotNull(message = "Guest count is required")
    @Positive(message = "Guest count must be at least 1")
    private Integer guestCount;

    private String cakePreference;
    private String packageTier = "CELESTIAL";
    private String specialRequests;
}
