package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class GiftCardPurchaseRequest {

    @NotNull(message = "Card balance amount is required")
    @Positive(message = "Balance must be greater than zero")
    private BigDecimal amount;

    @NotBlank(message = "Recipient name is required")
    private String recipientName;

    @NotBlank(message = "Recipient email is required")
    @Email(message = "Invalid email format")
    private String recipientEmail;

    @NotBlank(message = "Sender name is required")
    private String senderName;

    @NotBlank(message = "Sender email is required")
    @Email(message = "Invalid email format")
    private String senderEmail;

    private String message;
    private String theme = "CRESCENT_GOLD";
}
