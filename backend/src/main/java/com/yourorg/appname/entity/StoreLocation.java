package com.yourorg.appname.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "store_locations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 100)
    private String neighborhood;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(name = "postal_code", length = 20)
    private String postalCode;

    @Column(length = 30)
    private String phone;

    @Column(length = 150)
    private String email;

    @Column(name = "opening_hours", length = 255)
    private String openingHours;

    @Column(length = 500)
    private String amenities;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
