package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.response.*;
import com.yourorg.appname.entity.*;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class DtoMapper {

    public UserResponse toUserResponse(User user) {
        if (user == null) return null;
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .patronTier(user.getPatronTier())
                .rewardPoints(user.getRewardPoints())
                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()))
                .build();
    }

    public CategoryResponse toCategoryResponse(Category category) {
        if (category == null) return null;
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .displayName(category.getDisplayName())
                .icon(category.getIcon())
                .displayOrder(category.getDisplayOrder())
                .build();
    }

    public MenuItemResponse toMenuItemResponse(MenuItem item) {
        if (item == null) return null;
        return MenuItemResponse.builder()
                .id(item.getId())
                .categoryId(item.getCategory() != null ? item.getCategory().getId() : null)
                .categoryName(item.getCategory() != null ? item.getCategory().getName() : null)
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .isVeg(item.getIsVeg())
                .isEggless(item.getIsEggless())
                .isFeatured(item.getIsFeatured())
                .isAvailable(item.getIsAvailable())
                .rating(item.getRating())
                .ratingCount(item.getRatingCount())
                .build();
    }

    public StoreLocationResponse toStoreLocationResponse(StoreLocation store) {
        if (store == null) return null;
        return StoreLocationResponse.builder()
                .id(store.getId())
                .name(store.getName())
                .neighborhood(store.getNeighborhood())
                .address(store.getAddress())
                .city(store.getCity())
                .state(store.getState())
                .postalCode(store.getPostalCode())
                .phone(store.getPhone())
                .email(store.getEmail())
                .openingHours(store.getOpeningHours())
                .amenities(store.getAmenities())
                .imageUrl(store.getImageUrl())
                .build();
    }

    public ReservationResponse toReservationResponse(TableReservation res) {
        if (res == null) return null;
        return ReservationResponse.builder()
                .id(res.getId())
                .storeId(res.getStore() != null ? res.getStore().getId() : null)
                .storeName(res.getStore() != null ? res.getStore().getName() : null)
                .guestName(res.getGuestName())
                .guestEmail(res.getGuestEmail())
                .guestPhone(res.getGuestPhone())
                .partySize(res.getPartySize())
                .reservationTime(res.getReservationTime())
                .seatingPreference(res.getSeatingPreference())
                .specialRequests(res.getSpecialRequests())
                .status(res.getStatus())
                .createdAt(res.getCreatedAt())
                .build();
    }

    public OrderItemResponse toOrderItemResponse(OrderItem item) {
        if (item == null) return null;
        return OrderItemResponse.builder()
                .id(item.getId())
                .menuItemId(item.getMenuItem() != null ? item.getMenuItem().getId() : null)
                .itemName(item.getItemName())
                .unitPrice(item.getUnitPrice())
                .quantity(item.getQuantity())
                .subtotal(item.getSubtotal())
                .notes(item.getNotes())
                .build();
    }

    public OrderResponse toOrderResponse(Order order) {
        if (order == null) return null;
        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .customerName(order.getCustomerName())
                .customerEmail(order.getCustomerEmail())
                .customerPhone(order.getCustomerPhone())
                .orderType(order.getOrderType())
                .storeId(order.getStore() != null ? order.getStore().getId() : null)
                .storeName(order.getStore() != null ? order.getStore().getName() : null)
                .tableNumber(order.getTableNumber())
                .deliveryAddress(order.getDeliveryAddress())
                .subtotal(order.getSubtotal())
                .tax(order.getTax())
                .discount(order.getDiscount())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .paymentStatus(order.getPaymentStatus())
                .paymentMethod(order.getPaymentMethod())
                .notes(order.getNotes())
                .createdAt(order.getCreatedAt())
                .items(order.getItems().stream().map(this::toOrderItemResponse).collect(Collectors.toList()))
                .build();
    }

    public OfferResponse toOfferResponse(Offer offer) {
        if (offer == null) return null;
        return OfferResponse.builder()
                .id(offer.getId())
                .title(offer.getTitle())
                .promoCode(offer.getPromoCode())
                .description(offer.getDescription())
                .discountPercentage(offer.getDiscountPercentage())
                .discountAmount(offer.getDiscountAmount())
                .minOrderAmount(offer.getMinOrderAmount())
                .validUntil(offer.getValidUntil())
                .terms(offer.getTerms())
                .tierRequired(offer.getTierRequired())
                .isActive(offer.getIsActive())
                .build();
    }

    public GiftCardResponse toGiftCardResponse(GiftCard card) {
        if (card == null) return null;
        return GiftCardResponse.builder()
                .id(card.getId())
                .cardNumber(card.getCardNumber())
                .currentBalance(card.getCurrentBalance())
                .recipientName(card.getRecipientName())
                .recipientEmail(card.getRecipientEmail())
                .senderName(card.getSenderName())
                .message(card.getMessage())
                .theme(card.getTheme())
                .status(card.getStatus())
                .expiresAt(card.getExpiresAt())
                .build();
    }

    public CelebrationBookingResponse toCelebrationBookingResponse(CelebrationBooking booking) {
        if (booking == null) return null;
        return CelebrationBookingResponse.builder()
                .id(booking.getId())
                .celebrationType(booking.getCelebrationType())
                .contactName(booking.getContactName())
                .contactEmail(booking.getContactEmail())
                .contactPhone(booking.getContactPhone())
                .eventDate(booking.getEventDate())
                .timeSlot(booking.getTimeSlot())
                .guestCount(booking.getGuestCount())
                .cakePreference(booking.getCakePreference())
                .packageTier(booking.getPackageTier())
                .specialRequests(booking.getSpecialRequests())
                .status(booking.getStatus())
                .createdAt(booking.getCreatedAt())
                .build();
    }

    public BlogPostResponse toBlogPostResponse(BlogPost post) {
        if (post == null) return null;
        return BlogPostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .slug(post.getSlug())
                .excerpt(post.getExcerpt())
                .content(post.getContent())
                .author(post.getAuthor())
                .category(post.getCategory())
                .readTimeMinutes(post.getReadTimeMinutes())
                .publishedDate(post.getPublishedDate())
                .coverImageUrl(post.getCoverImageUrl())
                .isFeatured(post.getIsFeatured())
                .build();
    }
}
