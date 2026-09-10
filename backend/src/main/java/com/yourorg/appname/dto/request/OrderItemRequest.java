package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class OrderItemRequest {

    @NotNull(message = "Menu item ID is required")
    private Long menuItemId;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be at least 1")
    private Integer quantity;

    private String notes;
}
