package com.yourorg.appname.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Customer email is required")
    @Email(message = "Invalid email format")
    private String customerEmail;

    @NotBlank(message = "Customer phone is required")
    private String customerPhone;

    private String orderType = "DINE_IN"; // DINE_IN, TAKEAWAY, DELIVERY
    private Long storeId;
    private String tableNumber;
    private String deliveryAddress;
    private String promoCode;
    private String paymentMethod = "CREDIT_CARD";
    private String notes;

    @NotEmpty(message = "Order must have at least one item")
    @Valid
    private List<OrderItemRequest> items;
}
