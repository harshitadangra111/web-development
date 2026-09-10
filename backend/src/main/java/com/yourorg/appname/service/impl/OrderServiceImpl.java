package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.OrderItemRequest;
import com.yourorg.appname.dto.request.OrderRequest;
import com.yourorg.appname.dto.response.OrderResponse;
import com.yourorg.appname.entity.*;
import com.yourorg.appname.exception.BadRequestException;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DtoMapper;
import com.yourorg.appname.repository.*;
import com.yourorg.appname.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final MenuItemRepository menuItemRepository;
    private final StoreLocationRepository storeRepository;
    private final OfferRepository offerRepository;
    private final UserRepository userRepository;
    private final DtoMapper mapper;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request, String userEmail) {
        User user = null;
        if (userEmail != null) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        }
        if (user == null && request.getCustomerEmail() != null && !request.getCustomerEmail().trim().isEmpty()) {
            user = userRepository.findByEmail(request.getCustomerEmail().trim().toLowerCase()).orElse(null);
        }

        StoreLocation store = null;
        if (request.getStoreId() != null) {
            store = storeRepository.findById(request.getStoreId()).orElse(null);
        }

        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItem> items = new ArrayList<>();

        for (OrderItemRequest itemReq : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemReq.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found: " + itemReq.getMenuItemId()));

            BigDecimal lineSubtotal = menuItem.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            subtotal = subtotal.add(lineSubtotal);

            OrderItem orderItem = OrderItem.builder()
                    .menuItem(menuItem)
                    .itemName(menuItem.getName())
                    .unitPrice(menuItem.getPrice())
                    .quantity(itemReq.getQuantity())
                    .subtotal(lineSubtotal)
                    .notes(itemReq.getNotes())
                    .build();

            items.add(orderItem);
        }

        // Apply promo code discount if provided
        BigDecimal discount = BigDecimal.ZERO;
        if (request.getPromoCode() != null && !request.getPromoCode().trim().isEmpty()) {
            Offer offer = offerRepository.findByPromoCodeAndIsActiveTrue(request.getPromoCode().trim())
                    .orElse(null);
            if (offer != null) {
                if (offer.getMinOrderAmount() == null || subtotal.compareTo(offer.getMinOrderAmount()) >= 0) {
                    if (offer.getDiscountPercentage() != null && offer.getDiscountPercentage().compareTo(BigDecimal.ZERO) > 0) {
                        discount = subtotal.multiply(offer.getDiscountPercentage())
                                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                    } else if (offer.getDiscountAmount() != null) {
                        discount = offer.getDiscountAmount();
                    }
                }
            }
        }

        // 5% Goods and Services Tax
        BigDecimal taxableAmount = subtotal.subtract(discount).max(BigDecimal.ZERO);
        BigDecimal tax = taxableAmount.multiply(new BigDecimal("0.05")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalAmount = taxableAmount.add(tax).setScale(2, RoundingMode.HALF_UP);

        String orderNumber = "LN-" + System.currentTimeMillis() % 1000000 + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();

        Order order = Order.builder()
                .orderNumber(orderNumber)
                .user(user)
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .customerPhone(request.getCustomerPhone())
                .orderType(request.getOrderType() != null ? request.getOrderType() : "DINE_IN")
                .store(store)
                .tableNumber(request.getTableNumber())
                .deliveryAddress(request.getDeliveryAddress())
                .subtotal(subtotal)
                .tax(tax)
                .discount(discount)
                .totalAmount(totalAmount)
                .status("RECEIVED")
                .paymentStatus("PAID")
                .paymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "CREDIT_CARD")
                .notes(request.getNotes())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        for (OrderItem oi : items) {
            oi.setOrder(order);
        }
        order.setItems(items);

        Order saved = orderRepository.save(order);
        return mapper.toOrderResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderByNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderNumber));
        return mapper.toOrderResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getUserOrders(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        List<Order> orders;
        if (user != null) {
            orders = orderRepository.findByUserIdOrCustomerEmailOrderByCreatedAtDesc(user.getId(), userEmail.toLowerCase());
        } else {
            orders = orderRepository.findByCustomerEmailOrderByCreatedAtDesc(userEmail.toLowerCase());
        }
        return orders.stream()
                .map(mapper::toOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(mapper::toOrderResponse)
                .collect(Collectors.toList());
    }
}
