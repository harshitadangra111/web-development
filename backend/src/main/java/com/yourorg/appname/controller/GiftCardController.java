package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.GiftCardBalanceCheckRequest;
import com.yourorg.appname.dto.request.GiftCardPurchaseRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.GiftCardResponse;
import com.yourorg.appname.service.GiftCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/giftcards")
@RequiredArgsConstructor
public class GiftCardController {

    private final GiftCardService giftCardService;

    @PostMapping("/purchase")
    public ResponseEntity<ApiResponse<GiftCardResponse>> purchaseGiftCard(@Valid @RequestBody GiftCardPurchaseRequest request) {
        GiftCardResponse res = giftCardService.purchaseGiftCard(request);
        return ResponseEntity.ok(ApiResponse.success("Gift card created successfully", res));
    }

    @PostMapping("/check-balance")
    public ResponseEntity<ApiResponse<GiftCardResponse>> checkBalance(@Valid @RequestBody GiftCardBalanceCheckRequest request) {
        GiftCardResponse res = giftCardService.checkBalance(request);
        return ResponseEntity.ok(ApiResponse.success("Gift card balance verified", res));
    }
}
