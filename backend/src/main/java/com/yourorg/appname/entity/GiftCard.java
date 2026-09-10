package com.yourorg.appname.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "gift_cards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GiftCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_number", nullable = false, unique = true, length = 20)
    private String cardNumber;

    @Column(nullable = false, length = 10)
    private String pin;

    @Column(name = "initial_balance", nullable = false, precision = 10, scale = 2)
    private BigDecimal initialBalance;

    @Column(name = "current_balance", nullable = false, precision = 10, scale = 2)
    private BigDecimal currentBalance;

    @Column(name = "recipient_name", nullable = false, length = 100)
    private String recipientName;

    @Column(name = "recipient_email", nullable = false, length = 150)
    private String recipientEmail;

    @Column(name = "sender_name", nullable = false, length = 100)
    private String senderName;

    @Column(name = "sender_email", nullable = false, length = 150)
    private String senderEmail;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String message;

    @Column(length = 50)
    @Builder.Default
    private String theme = "CRESCENT_GOLD";

    @Column(length = 30)
    @Builder.Default
    private String status = "ACTIVE";

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
