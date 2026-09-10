package com.yourorg.appname.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "newsletter_subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsletterSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "subscribed_at", updatable = false)
    @Builder.Default
    private LocalDateTime subscribedAt = LocalDateTime.now();

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
