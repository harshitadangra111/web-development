package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class MenuItemRequest {

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotBlank(message = "Item name is required")
    private String name;

    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;

    private String imageUrl;
    private Boolean isVeg = true;
    private Boolean isEggless = true;
    private Boolean isFeatured = false;
    private Boolean isAvailable = true;
}
