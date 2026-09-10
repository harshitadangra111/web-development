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
public class MenuItemResponse {
    private Long id;
    private Long categoryId;
    private String categoryName;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private Boolean isVeg;
    private Boolean isEggless;
    private Boolean isFeatured;
    private Boolean isAvailable;
    private BigDecimal rating;
    private Integer ratingCount;
}
