package com.yourorg.appname.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "table_reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TableReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "store_id", nullable = false)
    private StoreLocation store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "guest_name", nullable = false, length = 100)
    private String guestName;

    @Column(name = "guest_email", nullable = false, length = 150)
    private String guestEmail;

    @Column(name = "guest_phone", nullable = false, length = 30)
    private String guestPhone;

    @Column(name = "party_size", nullable = false)
    private Integer partySize;

    @Column(name = "reservation_time", nullable = false)
    private LocalDateTime reservationTime;

    @Column(name = "seating_preference", length = 50)
    @Builder.Default
    private String seatingPreference = "Standard";

    @Column(name = "special_requests", columnDefinition = "NVARCHAR(MAX)")
    private String specialRequests;

    @Column(length = 30)
    @Builder.Default
    private String status = "CONFIRMED";

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
