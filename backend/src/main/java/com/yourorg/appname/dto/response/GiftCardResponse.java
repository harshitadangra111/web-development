package com.yourorg.appname.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GiftCardResponse {
    private Long id;
    private String cardNumber;
    private BigDecimal currentBalance;
    private String recipientName;
    private String recipientEmail;
    private String senderName;
    private String message;
    private String theme;
    private String status;
    private LocalDateTime expiresAt;
}
