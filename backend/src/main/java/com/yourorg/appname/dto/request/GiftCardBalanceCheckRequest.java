package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GiftCardBalanceCheckRequest {

    @NotBlank(message = "Card number is required")
    private String cardNumber;

    @NotBlank(message = "4-digit PIN is required")
    private String pin;
}
