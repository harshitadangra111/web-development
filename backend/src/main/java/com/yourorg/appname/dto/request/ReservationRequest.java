package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationRequest {

    @NotNull(message = "Store location ID is required")
    private Long storeId;

    @NotBlank(message = "Guest name is required")
    private String guestName;

    @NotBlank(message = "Guest email is required")
    @Email(message = "Invalid email format")
    private String guestEmail;

    @NotBlank(message = "Guest phone is required")
    private String guestPhone;

    @NotNull(message = "Party size is required")
    @Positive(message = "Party size must be at least 1")
    private Integer partySize;

    @NotNull(message = "Reservation date and time is required")
    private LocalDateTime reservationTime;

    private String seatingPreference = "Standard";
    private String specialRequests;
}
