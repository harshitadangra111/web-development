package com.yourorg.appname.controller;

import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.OfferResponse;
import com.yourorg.appname.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@RequiredArgsConstructor
public class OfferController {

    private final OfferService offerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<OfferResponse>>> getOffers() {
        return ResponseEntity.ok(ApiResponse.success("Offers retrieved", offerService.getActiveOffers()));
    }

    @GetMapping("/validate/{promoCode}")
    public ResponseEntity<ApiResponse<OfferResponse>> validateOffer(@PathVariable String promoCode) {
        return ResponseEntity.ok(ApiResponse.success("Promo code valid", offerService.getOfferByPromoCode(promoCode)));
    }
}
