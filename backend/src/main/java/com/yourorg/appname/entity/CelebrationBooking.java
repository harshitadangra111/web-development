package com.yourorg.appname.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "celebration_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CelebrationBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "celebration_type", nullable = false, length = 50)
    private String celebrationType;

    @Column(name = "contact_name", nullable = false, length = 100)
    private String contactName;

    @Column(name = "contact_email", nullable = false, length = 150)
    private String contactEmail;

    @Column(name = "contact_phone", nullable = false, length = 30)
    private String contactPhone;

    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;

    @Column(name = "time_slot", nullable = false, length = 50)
    private String timeSlot;

    @Column(name = "guest_count", nullable = false)
    private Integer guestCount;

    @Column(name = "cake_preference", length = 100)
    private String cakePreference;

    @Column(name = "package_tier", length = 50)
    @Builder.Default
    private String packageTier = "CELESTIAL";

    @Column(name = "special_requests", columnDefinition = "NVARCHAR(MAX)")
    private String specialRequests;

    @Column(length = 30)
    @Builder.Default
    private String status = "IN_REVIEW";

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
