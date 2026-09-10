package com.yourorg.appname.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "menu_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "is_veg")
    @Builder.Default
    private Boolean isVeg = true;

    @Column(name = "is_eggless")
    @Builder.Default
    private Boolean isEggless = true;

    @Column(name = "is_featured")
    @Builder.Default
    private Boolean isFeatured = false;

    @Column(name = "is_available")
    @Builder.Default
    private Boolean isAvailable = true;

    @Column(precision = 3, scale = 2)
    @Builder.Default
    private BigDecimal rating = new BigDecimal("4.90");

    @Column(name = "rating_count")
    @Builder.Default
    private Integer ratingCount = 120;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
