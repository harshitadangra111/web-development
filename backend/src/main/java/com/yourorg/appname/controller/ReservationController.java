package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.ReservationRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.ReservationResponse;
import com.yourorg.appname.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ApiResponse<ReservationResponse>> createReservation(
            @Valid @RequestBody ReservationRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String userEmail = userDetails != null ? userDetails.getUsername() : null;
        ReservationResponse res = reservationService.createReservation(request, userEmail);
        return ResponseEntity.ok(ApiResponse.success("Table reservation confirmed", res));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ReservationResponse>>> getMyReservations(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Authentication required"));
        }
        List<ReservationResponse> list = reservationService.getUserReservations(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("User reservations retrieved", list));
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<ApiResponse<List<ReservationResponse>>> getStoreReservations(@PathVariable Long storeId) {
        List<ReservationResponse> list = reservationService.getStoreReservations(storeId);
        return ResponseEntity.ok(ApiResponse.success("Store reservations retrieved", list));
    }
}
