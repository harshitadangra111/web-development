package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.OrderRequest;
import com.yourorg.appname.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request, String userEmail);
    OrderResponse getOrderByNumber(String orderNumber);
    List<OrderResponse> getUserOrders(String userEmail);
    List<OrderResponse> getAllOrders();
}
