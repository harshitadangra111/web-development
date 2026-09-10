package com.yourorg.appname.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number", nullable = false, unique = true, length = 50)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "customer_name", nullable = false, length = 100)
    private String customerName;

    @Column(name = "customer_email", nullable = false, length = 150)
    private String customerEmail;

    @Column(name = "customer_phone", nullable = false, length = 30)
    private String customerPhone;

    @Column(name = "order_type", length = 30)
    @Builder.Default
    private String orderType = "DINE_IN";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private StoreLocation store;

    @Column(name = "table_number", length = 20)
    private String tableNumber;

    @Column(name = "delivery_address", columnDefinition = "NVARCHAR(MAX)")
    private String deliveryAddress;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal tax;

    @Column(precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal discount = BigDecimal.ZERO;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(length = 30)
    @Builder.Default
    private String status = "RECEIVED";

    @Column(name = "payment_status", length = 30)
    @Builder.Default
    private String paymentStatus = "PAID";

    @Column(name = "payment_method", length = 50)
    @Builder.Default
    private String paymentMethod = "CREDIT_CARD";

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String notes;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();
}
