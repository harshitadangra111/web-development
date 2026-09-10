package com.yourorg.appname.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponse {
    private Long id;
    private Long menuItemId;
    private String itemName;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal subtotal;
    private String notes;
}
