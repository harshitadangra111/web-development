package com.yourorg.appname.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private String orderNumber;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String orderType;
    private Long storeId;
    private String storeName;
    private String tableNumber;
    private String deliveryAddress;
    private BigDecimal subtotal;
    private BigDecimal tax;
    private BigDecimal discount;
    private BigDecimal totalAmount;
    private String status;
    private String paymentStatus;
    private String paymentMethod;
    private String notes;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;
}
