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
public class OfferResponse {
    private Long id;
    private String title;
    private String promoCode;
    private String description;
    private BigDecimal discountPercentage;
    private BigDecimal discountAmount;
    private BigDecimal minOrderAmount;
    private LocalDateTime validUntil;
    private String terms;
    private String tierRequired;
    private Boolean isActive;
}
