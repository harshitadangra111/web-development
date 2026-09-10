package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.OrderRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.OrderResponse;
import com.yourorg.appname.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
            @Valid @RequestBody OrderRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String userEmail = userDetails != null ? userDetails.getUsername() : null;
        OrderResponse response = orderService.createOrder(request, userEmail);
        return ResponseEntity.ok(ApiResponse.success("Order placed successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getAllOrders() {
        return ResponseEntity.ok(ApiResponse.success("All orders retrieved", orderService.getAllOrders()));
    }

    @GetMapping("/{orderNumber}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(@PathVariable String orderNumber) {
        return ResponseEntity.ok(ApiResponse.success("Order details retrieved", orderService.getOrderByNumber(orderNumber)));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Authentication required"));
        }
        List<OrderResponse> orders = orderService.getUserOrders(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Order history retrieved", orders));
    }
}
